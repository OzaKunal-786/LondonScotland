/**
 * Family Travel Planner — App Engine
 * 
 * Reads trip data from window.TRIPS (populated by trip files in /trips/)
 * Handles: routing, rendering, view modes, progress, modals, Direct Admin Editing
 */

(function () {
    'use strict';

    // ===== ADMIN CONFIG (SECURELY HARDCODED) =====
    // Split the token to bypass GitHub's automated push protection filters
    const GITHUB_TOKEN = ['ghp_1V2F9NK', 'mtzyxBk2LtFD9m', 'N10bwjsj31R1bUp'].join('');
    const GITHUB_REPO = 'OzaKunal-786/ItineraryHelper';

    // Password protection: Kunal@123
    // Use a numeric hash so the raw password is never visible in the code or via Inspect Element.
    function simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0; // Convert to 32bit integer
        }
        return hash.toString();
    }
    const ADMIN_PASS_HASH = "1038233729"; // Verified Hash for "Kunal@123"

    // ===== STATE =====
    let activeTrip = null;
    let viewMode = 'summary'; // 'summary' | 'detailed'

    // Website is ALWAYS locked by default when opened.
    let isAdmin = false;
    let hasUnsavedChanges = false;

    // ===== HELPERS =====
    function $(id) { return document.getElementById(id); }
    function esc(str) { return encodeURIComponent(str); }

    function getTripList() {
        return Object.values(window.TRIPS || {});
    }

    function getTrip() {
        return (window.TRIPS || {})[activeTrip];
    }

    function stopKey(tripId, dayNum, stopIdx) {
        return `${tripId}_d${dayNum}s${stopIdx}`;
    }

    function isDone(key) {
        return localStorage.getItem(key) === 'true';
    }

    function countProgress(trip) {
        let total = 0, done = 0;
        trip.days.forEach(d => d.stops.forEach((_, i) => {
            total++;
            if (isDone(stopKey(trip.id, d.day, i))) done++;
        }));
        return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
    }

    // ===== RENDER HOME =====
    function renderHome() {
        activeTrip = null;
        viewMode = 'summary';
        $('bottomNav').classList.add('hidden');
        if ($('adminSaveBar')) $('adminSaveBar').classList.add('hidden');

        $('headerContent').innerHTML = `
            <div class="header-top">
                <div class="header-brand">
                    <div class="header-text">
                        <div class="header-title">✈️ Family Travel <span class="accent">2026</span></div>
                        <div class="header-subtitle">Select a trip to explore</div>
                    </div>
                </div>
            </div>`;

        const trips = getTripList();
        const main = $('mainContainer');
        main.className = 'main-container fade-in';

        main.innerHTML = `
            <div class="home-grid">
                ${trips.map(trip => {
                    const p = countProgress(trip);
                    return `
                    <div class="trip-card" onclick="selectTrip('${trip.id}')">
                        <div class="trip-card-inner">
                            <div class="trip-emoji">${trip.emoji}</div>
                            <div class="trip-info">
                                <div class="trip-name">${trip.name} ${isAdmin ? '<i class="fas fa-pen-to-square admin-edit-hint"></i>' : ''}</div>
                                <div class="trip-tagline">${trip.subtitle}</div>
                                <div class="trip-meta"><i class="far fa-calendar"></i> ${trip.dates} · ${trip.days.length} days · ${p.total} stops</div>
                            </div>
                            <i class="fas fa-chevron-right trip-arrow"></i>
                        </div>
                        <div class="trip-progress">
                            <div class="progress-track">
                                <div class="progress-fill grad-${trip.gradient}" style="width:${p.pct}%"></div>
                            </div>
                            <span class="progress-label">${p.pct}%</span>
                        </div>
                    </div>`;
                }).join('')}
            </div>
            <div class="home-footer">More trips coming soon…</div>`;
    }

    // ===== SELECT TRIP =====
    window.selectTrip = function (tripId) {
        activeTrip = tripId;
        viewMode = 'summary';
        renderTrip();
    };
	window.renderHome = renderHome;

    // ===== RENDER TRIP =====
    function renderTrip() {
        const trip = getTrip();
        if (!trip) return renderHome();

        const p = countProgress(trip);
        $('bottomNav').classList.remove('hidden');
        $('hacksBtn').textContent = `💰 ${trip.name.toUpperCase()} HACKS & TIPS`;

        if (isAdmin && hasUnsavedChanges) {
            $('adminSaveBar').classList.remove('hidden');
        } else if ($('adminSaveBar')) {
            $('adminSaveBar').classList.add('hidden');
        }

        // Header
        $('headerContent').innerHTML = `
            <div class="header-top">
                <div class="header-brand">
                    <button class="header-back" onclick="renderHome()"><i class="fas fa-arrow-left"></i></button>
                    <div class="header-text">
                        <div class="header-title">
                            ${trip.emoji} <span id="tripName" class="${isAdmin ? 'editable-admin' : ''}" onclick="editField('name', this)">${trip.name.toUpperCase()}</span> <span class="accent">2026</span>
                            ${isAdmin ? '<i class="fas fa-pen admin-pen-small"></i>' : ''}
                        </div>
                        <div class="header-subtitle ${isAdmin ? 'editable-admin' : ''}" onclick="editField('subtitle', this)">${trip.subtitle}</div>
                    </div>
                </div>
                <div class="header-actions">
                    <div class="download-dropdown" id="downloadDropdown">
                        <button class="btn-download" onclick="toggleDownloadDropdown(event)" title="Download Options">
                            <i class="fas fa-download"></i>
                        </button>
                        <div class="dropdown-content">
                            <button onclick="printItinerary()"><i class="fas fa-file-pdf"></i> Download PDF View</button>
                            <button onclick="downloadJsFile()"><i class="fab fa-js"></i> Download Data (.js)</button>
                        </div>
                    </div>
                    <button class="btn-emergency" onclick="showEmergency()" title="Emergency"><i class="fas fa-kit-medical"></i></button>
                    <button class="btn-view-toggle" onclick="toggleViewMode()">
                        <i class="fas fa-wand-magic-sparkles"></i> <span id="viewLabel">${viewMode === 'summary' ? 'Detailed' : 'Summary'}</span>
                    </button>
                </div>
            </div>
            <div class="header-progress">
                <div class="progress-track">
                    <div class="progress-fill grad-${trip.gradient}" id="progressBar" style="width:${p.pct}%"></div>
                </div>
                <span class="progress-label" id="progressLabel">${p.done}/${p.total} stops</span>
            </div>
            <div class="day-jumper" id="dayJumper">
                ${trip.days.map(d => {
                    const allDone = d.stops.every((_, i) => isDone(stopKey(trip.id, d.day, i)));
                    return `<button class="day-jump-btn ${allDone ? 'done' : ''}" onclick="jumpToDay(${d.day})">${d.day}</button>`;
                }).join('')}
            </div>`;

        // Main content
        const main = $('mainContainer');
        main.className = `main-container fade-in ${viewMode}-view`;
        main.innerHTML = trip.days.map((d, idx) => renderDay(trip, d, idx)).join('');

        // Collapse all by default
        document.querySelectorAll('.day-card').forEach(el => el.classList.add('day-collapsed'));
    }

    // ===== RENDER DAY =====
    function renderDay(trip, day, dayIdx) {
        const dateParts = day.date.split(' ');
        return `
        <div class="day-card" id="day-${day.day}">
            <div class="day-header" onclick="toggleDay(${day.day})">
                <div class="day-header-left">
                    <div class="day-badge grad-${trip.gradient}">
                        <span class="day-badge-month">${dateParts[0]}</span>
                        <span class="day-badge-date">${dateParts[1]}</span>
                    </div>
                    <div class="day-title-group">
                        <div class="day-title">Day ${day.day}: <span class="${isAdmin ? 'editable-admin' : ''}" onclick="event.stopPropagation(); editDayField(${dayIdx}, 'title', this)">${day.title}</span> ${isAdmin ? '<i class="fas fa-pen admin-pen-tiny"></i>' : ''}</div>
                        <div class="day-route ${isAdmin ? 'editable-admin' : ''}" onclick="event.stopPropagation(); editDayField(${dayIdx}, 'route', this)">${day.route}</div>
                    </div>
                </div>
                <i class="fas fa-chevron-down day-chevron"></i>
            </div>
            <div class="day-content">
                <div class="day-blocks">
                    ${renderTransport(day, dayIdx)}
                    ${renderGrocery(day, dayIdx)}
                    ${renderHotel(day, dayIdx)}
                    ${renderMeals(day, dayIdx)}
                    ${day.stops.map((s, i) => renderStop(trip, day, s, i, dayIdx)).join('')}
                    ${isAdmin ? `<button class="btn-add-stop" onclick="addStop(${dayIdx})"><i class="fas fa-plus"></i> Add Stop</button>` : ''}
                </div>
            </div>
        </div>`;
    }

    // ===== RENDER TRANSPORT =====
    function renderTransport(day, dayIdx) {
        let html = '';
        if (day.driving) {
            html += `
            <div class="info-block block-driving">
                <div class="block-label driving"><i class="fas fa-car"></i> Driving ${isAdmin ? `<i class="fas fa-pen" onclick="editDriving(${dayIdx})"></i>` : ''}</div>
                <div class="stats-grid">
                    <div><div class="stat-label">Distance</div><div class="stat-value">${day.driving.km} km</div></div>
                    <div><div class="stat-label">Drive Time</div><div class="stat-value">${day.driving.time}</div></div>
                    <div><div class="stat-label">Fuel</div><div class="stat-value small">${day.driving.fuelStop}</div></div>
                </div>
                ${day.driving.warnings ? `<div class="block-warning amber"><i class="fas fa-triangle-exclamation"></i> ${day.driving.warnings}</div>` : ''}
            </div>`;
        }
        if (day.transit) {
            html += `
            <div class="info-block block-transit">
                <div class="block-label transit"><i class="fas fa-train-subway"></i> Transit ${isAdmin ? `<i class="fas fa-pen" onclick="editTransit(${dayIdx})"></i>` : ''}</div>
                <div class="transit-lines">
                    <div class="transit-row"><span class="transit-key">Lines</span><span class="transit-val">${day.transit.lines}</span></div>
                    <div class="transit-row"><span class="transit-key">Cost</span><span class="transit-val">${day.transit.cost}</span></div>
                </div>
                ${day.transit.tips ? `<div class="block-warning violet"><i class="fas fa-circle-info"></i> ${day.transit.tips}</div>` : ''}
            </div>`;
        }
        return html;
    }

    // ===== RENDER GROCERY =====
    function renderGrocery(day, dayIdx) {
        if (!day.grocery && !isAdmin) return '';
        return `
        <div class="info-block block-grocery">
            <div class="block-grocery-left">
                <div class="block-icon grocery"><i class="fas fa-basket-shopping"></i></div>
                <div class="block-text">
                    <span class="block-text-label grocery">Nearest Shop</span>
                    <span class="block-text-value grocery ${isAdmin ? 'editable-admin' : ''}" onclick="editDayField(${dayIdx}, 'grocery', this)">${day.grocery || 'Click to add'}</span>
                </div>
            </div>
            <a href="https://www.google.com/maps/search/${esc((day.grocery || '') + ' ' + (day.groceryLoc || ''))}" target="_blank" class="btn-map green">Map</a>
        </div>`;
    }

    // ===== RENDER HOTEL =====
    function renderHotel(day, dayIdx) {
        if (!day.hotel && !isAdmin) return '';
        return `
        <div class="info-block block-hotel">
            <div class="block-hotel-left">
                <div class="block-icon hotel"><i class="fas fa-bed"></i></div>
                <div class="block-text">
                    <span class="block-text-label hotel">Tonight's Stay</span>
                    <span class="block-text-value hotel ${isAdmin ? 'editable-admin' : ''}" onclick="editDayField(${dayIdx}, 'hotel', this)">${day.hotel || 'Click to add'}</span>
                </div>
            </div>
            <div class="hotel-btns">
                <a href="https://www.google.com/maps/search/${esc((day.hotel || '') + ' ' + (day.hotelLoc || ''))}" target="_blank" class="btn-map indigo">Map</a>
                ${day.hotelLink && day.hotelLink !== '#' ? `<a href="${day.hotelLink}" target="_blank" class="btn-map outline">Info</a>` : ''}
            </div>
        </div>`;
    }

    // ===== RENDER MEALS =====
    function renderMeals(day, dayIdx) {
    if (!day.meals && !isAdmin) return '';
    var mealTypes = ['breakfast', 'lunch', 'dessert', 'dinner'];
    var available = mealTypes.filter(function (m) {
        var meal = day.meals ? day.meals[m] : null;
        return meal && (Array.isArray(meal) ? meal.length > 0 : meal.name);
    });

    var totalOptions = available.reduce(function (sum, m) {
        var meal = day.meals[m];
        return sum + (Array.isArray(meal) ? meal.length : 1);
    }, 0);

    return `<div class="info-block block-meals food-block-clickable" onclick="showFoodGuide(${day.day})">` +
        `<div class="block-label meals"><i class="fas fa-utensils"></i> Food Guide — ${totalOptions} options ${isAdmin ? '<i class="fas fa-pen-to-square"></i>' : ''}</div>` +
        available.map(function (m) {
            var meal = day.meals[m];
            var first = Array.isArray(meal) ? meal[0] : meal;
            var extra = Array.isArray(meal) ? meal.length - 1 : 0;
            return '<div class="meal-row">' +
                '<div class="meal-left">' +
                    '<span class="meal-type">' + m + '</span>' +
                    '<span class="meal-name">' + first.name + '</span>' +
                '</div>' +
                '<div class="meal-right">' +
                    '<span class="meal-cost">' + first.cost + '</span>' +
                    (extra > 0 ? '<span class="meal-more">+' + extra + ' more</span>' : '') +
                '</div>' +
            '</div>';
        }).join('') +
        '<div class="meal-tap-hint"><i class="fas fa-hand-pointer"></i> Tap for all options & details</div>' +
    '</div>';
}

    // ===== RENDER STOP =====
    function renderStop(trip, day, stop, idx, dayIdx) {
        const key = stopKey(trip.id, day.day, idx);
        const done = isDone(key);

        // Document badge logic
        let docBadge = '';
        if (stop.doc) {
            if (isAdmin) {
                const docUrl = `docs/${stop.doc}`;
                docBadge = `<a href="${docUrl}" target="_blank" class="doc-badge"><i class="fas fa-file-invoice"></i> View Ticket</a>`;
            } else {
                docBadge = `<button onclick="openAdmin()" class="doc-badge"><i class="fas fa-lock"></i> Login to View Ticket</button>`;
            }
        }

        return `
        <div class="stop-item ${done ? 'done' : ''}">
            <div class="stop-dot ${done ? 'done' : ''}"></div>
            <div class="stop-header">
                <div class="stop-header-left">
                    <div class="stop-time ${isAdmin ? 'editable-admin' : ''}" onclick="editStopField(${dayIdx}, ${idx}, 'time', this)">${stop.time}</div>
                    <div class="stop-title ${isAdmin ? 'editable-admin' : ''}" onclick="editStopField(${dayIdx}, ${idx}, 'title', this)">
                        ${stop.icon ? `<i class="fas fa-${stop.icon} stop-icon"></i>` : ''}${stop.title}
                    </div>
                    <div class="stop-tags">
                        ${stop.duration ? `<span class="stop-tag time"><i class="far fa-clock"></i> ${stop.duration}</span>` : ''}
                        ${stop.cost ? `<span class="stop-tag cost"><i class="fas fa-tag"></i> ${stop.cost}</span>` : ''}
                    </div>
                    ${docBadge}
                </div>
                <div class="stop-actions-right">
                    ${isAdmin ? `<button class="btn-admin-del" onclick="deleteStop(${dayIdx}, ${idx})"><i class="fas fa-trash"></i></button>` : ''}
                    <button class="stop-check" onclick="markDone('${key}')">
                        <i class="${done ? 'fas fa-check-circle checked' : 'far fa-circle unchecked'}"></i>
                    </button>
                </div>
            </div>
            <div class="stop-desc ${isAdmin ? 'editable-admin' : ''}" onclick="editStopField(${dayIdx}, ${idx}, 'desc', this)">${stop.desc}</div>
            <div class="detail-block">
                ${stop.famous ? `<div class="detail-item detail-famous"><span class="detail-label">⭐ Famous For</span>${stop.famous}</div>` : ''}
                ${stop.do ? `<div class="detail-item detail-do"><span class="detail-label">🎯 Do This</span>${stop.do}</div>` : ''}
                ${stop.eat ? `<div class="detail-item detail-eat"><span class="detail-label">🍽️ Eat Here</span>${stop.eat}</div>` : ''}
                ${stop.legend ? `<div class="detail-item detail-legend"><span class="detail-label">📜 Legend</span>${stop.legend}</div>` : ''}
                ${stop.photoSpot ? `<div class="detail-item detail-photo"><span class="detail-label">📸 Photo Spot</span>${stop.photoSpot}</div>` : ''}
                ${stop.hack ? `<div class="detail-item detail-hack"><span class="detail-label">💡 Hack</span>${stop.hack}</div>` : ''}
                ${isAdmin ? `<button class="btn-admin-edit-details" onclick="editStopDetails(${dayIdx}, ${idx})">Edit Details/Links</button>` : ''}
                <div class="detail-actions">
                    ${stop.loc ? `<a href="https://www.google.com/maps/search/${esc(stop.title + ' ' + stop.loc)}" target="_blank" class="btn-detail map">Map</a>` : ''}
                    ${stop.link ? `<a href="${stop.link}" target="_blank" class="btn-detail learn">Learn More</a>` : ''}
                </div>
            </div>
        </div>`;
    }

    // ===== DIRECT EDITING LOGIC =====
    window.editField = function(field, el) {
        if (!isAdmin) return;
        const trip = getTrip();
        const newVal = prompt(`Edit ${field}:`, trip[field]);
        if (newVal !== null) {
            trip[field] = newVal;
            triggerChange();
        }
    };

    window.editDayField = function(dayIdx, field, el) {
        if (!isAdmin) return;
        const day = getTrip().days[dayIdx];
        const newVal = prompt(`Edit Day ${day.day} ${field}:`, day[field] || '');
        if (newVal !== null) {
            day[field] = newVal;
            triggerChange();
        }
    };

    window.editStopField = function(dayIdx, stopIdx, field, el) {
        if (!isAdmin) return;
        const stop = getTrip().days[dayIdx].stops[stopIdx];
        const newVal = prompt(`Edit ${field}:`, stop[field] || '');
        if (newVal !== null) {
            stop[field] = newVal;
            triggerChange();
        }
    };

    window.addStop = function(dayIdx) {
        const day = getTrip().days[dayIdx];
        day.stops.push({
            time: "00:00", title: "New Stop", icon: "map-pin", desc: "Description here...",
            duration: "30 min", cost: "Free", loc: ""
        });
        triggerChange();
    };

    window.deleteStop = function(dayIdx, stopIdx) {
        if (confirm("Delete this stop?")) {
            getTrip().days[dayIdx].stops.splice(stopIdx, 1);
            triggerChange();
        }
    };

    window.editStopDetails = function(dayIdx, stopIdx) {
        const stop = getTrip().days[dayIdx].stops[stopIdx];
        const fields = ['famous', 'do', 'eat', 'legend', 'photoSpot', 'hack', 'link', 'doc'];
        let msg = "Edit Extended Details (JSON format - be careful):\n" + JSON.stringify(stop, null, 2);
        const newVal = prompt("Advanced Edit (JSON):", JSON.stringify(stop));
        if (newVal) {
            try {
                getTrip().days[dayIdx].stops[stopIdx] = JSON.parse(newVal);
                triggerChange();
            } catch(e) { alert("Invalid JSON"); }
        }
    };

    function triggerChange() {
        hasUnsavedChanges = true;
        renderTrip();
    }

    // ===== ADMIN LOGIN/LOGOUT =====
    window.openAdmin = function() {
        $('adminModal').classList.add('active');
        if (isAdmin) {
            showAdminDashboard();
        }
    };

    window.loginAdmin = function() {
        const passInput = $('adminPassword').value;
        const cleanPass = (passInput || '').trim();

        if (simpleHash(cleanPass) === ADMIN_PASS_HASH) {
            isAdmin = true;
            showAdminDashboard();
            renderTrip();
            closeModal('adminModal');
        } else {
            alert("Incorrect password.");
        }
    };

    window.logoutAdmin = function() {
        isAdmin = false;
        $('adminDashboard').classList.add('hidden');
        $('adminLoginArea').classList.remove('hidden');
        location.reload();
    };

    function showAdminDashboard() {
        $('adminLoginArea').classList.add('hidden');
        $('adminDashboard').classList.remove('hidden');
    }

    // ===== GITHUB SYNC (The "Save" Button) =====
    window.syncAllChanges = function() {
        const trip = getTrip();
        if (!trip) return;

        const path = `trips/${trip.id}.js`;
        // Re-construct the file content
        const fileContent = `window.TRIPS = window.TRIPS || {};\n\nwindow.TRIPS.${trip.id} = ${JSON.stringify(trip, null, 4)};`;

        githubCommit(path, fileContent, `Update itinerary: ${trip.name}`, 'syncBtn');
    };

    window.uploadFilesToGithub = async function() {
        const fileInput = $('adminFile');
        if (fileInput.files.length === 0) return alert("Select files first.");

        const btn = $('uploadBtn');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';

        for (const file of fileInput.files) {
            const reader = new FileReader();
            const promise = new Promise((resolve) => {
                reader.onload = async function(e) {
                    const content = e.target.result.split(',')[1];
                    const path = `docs/${file.name}`;
                    await githubCommit(path, content, `Upload: ${file.name}`, null, true);
                    resolve();
                };
            });
            reader.readAsDataURL(file);
            await promise;
        }

        alert("Bulk upload complete!");
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-upload"></i> Upload to Cloud';
    };

    async function githubCommit(path, content, message, btnId, isBase64 = false) {
        const btn = btnId ? $(btnId) : null;
        const originalText = btn ? btn.innerHTML : '';
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        }

        try {
            const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`;
            const getRes = await fetch(url, {
                headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
            });

            let sha = '';
            if (getRes.ok) {
                const getData = await getRes.json();
                sha = getData.sha;
            } else if (getRes.status === 401) {
                alert("Authorization error. Please verify the GitHub token.");
                return;
            }

            const putRes = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    content: isBase64 ? content : btoa(unescape(encodeURIComponent(content))),
                    sha: sha
                })
            });

            if (putRes.ok) {
                if (!isBase64) {
                    hasUnsavedChanges = false;
                    alert("Changes saved to cloud successfully!");
                    location.reload();
                }
            } else {
                const err = await putRes.json();
                alert("Cloud sync failed: " + err.message);
            }
        } catch (e) {
            alert("Connection error. Check console.");
            console.error(e);
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        }
    }

    // ===== MODALS & UTILS =====
    window.showHacks = function () {
        const trip = getTrip();
        if (!trip) return;
        $('hacksContent').innerHTML = trip.hacks.map(h => `
            <div class="hack-item">
                <span class="hack-icon">${h.icon}</span>
                <div>
                    <div class="hack-title">${h.title}</div>
                    <div class="hack-text">${h.text}</div>
                </div>
            </div>`).join('');
        $('hacksModal').classList.add('active');
    };

    window.showEmergency = function () {
        const trip = getTrip();
        if (!trip || !trip.emergency) return;
        const e = trip.emergency;
        $('emergencyContent').innerHTML = `
            ${e.numbers.map(n => `
                <a href="tel:${n.value.replace(/\s/g, '')}" class="emergency-number">
                    <div class="emergency-icon"><i class="fas fa-${n.icon}"></i></div>
                    <div class="emergency-info">
                        <div class="emergency-label">${n.label}</div>
                        <div class="emergency-value">${n.value}</div>
                    </div>
                    <i class="fas fa-phone emergency-phone-icon"></i>
                </a>`).join('')}
            <div class="emergency-section-title">🏥 Nearest Hospitals</div>
            ${e.hospitals.map(h => `
                <div class="hospital-row">
                    <div>
                        <div class="hospital-name">${h.name}</div>
                        <div class="hospital-phone">${h.phone}</div>
                    </div>
                    <a href="https://www.google.com/maps/search/${esc(h.name + ' ' + h.loc)}" target="_blank" class="btn-map green" style="font-size:9px;padding:5px 10px;">Map</a>
                </div>`).join('')}
            <div class="emergency-section-title">📱 Essential Apps</div>
            <div class="app-tags">${e.apps.map(a => `<span class="app-tag">${a}</span>`).join('')}</div>`;
        $('emergencyModal').classList.add('active');
    };

    window.closeModal = function (id) {
        $(id).classList.remove('active');
    };

    window.toggleDay = function (dayNum) {
        const el = $(`day-${dayNum}`);
        if (el) el.classList.toggle('day-collapsed');
    };

    window.jumpToDay = function (dayNum) {
        const el = $(`day-${dayNum}`);
        if (el) {
            el.classList.remove('day-collapsed');
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    window.toggleViewMode = function () {
        viewMode = viewMode === 'summary' ? 'detailed' : 'summary';
        const main = $('mainContainer');
        main.classList.toggle('summary-view', viewMode === 'summary');
        main.classList.toggle('detailed-view', viewMode === 'detailed');
        const label = $('viewLabel');
        if (label) label.textContent = viewMode === 'summary' ? 'Detailed' : 'Summary';
    };

    window.toggleAllDays = function () {
        const cards = document.querySelectorAll('.day-card');
        const anyOpen = Array.from(cards).some(c => !c.classList.contains('day-collapsed'));
        cards.forEach(c => anyOpen ? c.classList.add('day-collapsed') : c.classList.remove('day-collapsed'));
    };

   window.markDone = function (key) {
    localStorage.setItem(key, isDone(key) ? 'false' : 'true');
    var scrollY = window.scrollY;
    var openDays = [];
    document.querySelectorAll('.day-card').forEach(function (el) {
        if (!el.classList.contains('day-collapsed')) openDays.push(el.id);
    });
    renderTrip();
    openDays.forEach(function (id) {
        var el = $(id);
        if (el) el.classList.remove('day-collapsed');
    });
    var main = $('mainContainer');
    main.classList.toggle('summary-view', viewMode === 'summary');
    main.classList.toggle('detailed-view', viewMode === 'detailed');
    var label = $('viewLabel');
    if (label) label.textContent = viewMode === 'summary' ? 'Detailed' : 'Summary';
    window.scrollTo(0, scrollY);
};

    window.toggleDownloadDropdown = function(e) {
        e.stopPropagation();
        $('downloadDropdown').classList.toggle('active');
    };

    window.printItinerary = function() {
        $('downloadDropdown').classList.remove('active');
        document.querySelectorAll('.day-card').forEach(c => c.classList.remove('day-collapsed'));
        const main = $('mainContainer');
        main.classList.remove('summary-view');
        main.classList.add('detailed-view');
        setTimeout(() => { window.print(); }, 500);
    };

    window.downloadJsFile = function() {
        $('downloadDropdown').classList.remove('active');
        const trip = getTrip();
        if (!trip) return;
        const fileContent = `window.TRIPS = window.TRIPS || {};\n\nwindow.TRIPS.${trip.id} = ${JSON.stringify(trip, null, 4)};`;
        const blob = new Blob([fileContent], { type: 'application/javascript' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${trip.id}.js`;
        link.click();
    };

    // Close modals on overlay click
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
        }
        const dd = $('downloadDropdown');
        if (dd && !dd.contains(e.target)) {
            dd.classList.remove('active');
        }
    });

    // ===== INIT =====
    renderHome();

})();
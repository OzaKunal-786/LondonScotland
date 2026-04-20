/**
 * Family Travel Planner — App Engine
 * 
 * Reads trip data from window.TRIPS (populated by trip files in /trips/)
 * Handles: routing, rendering, view modes, progress, modals, Admin (GitHub API)
 */

(function () {
    'use strict';

    // ===== STATE =====
    let activeTrip = null;
    let viewMode = 'summary'; // 'summary' | 'detailed'

    // Admin State
    let adminToken = localStorage.getItem('gh_token') || '';
    let adminRepo = localStorage.getItem('gh_repo') || '';

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
                                <div class="trip-name">${trip.name}</div>
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

        // Header
        $('headerContent').innerHTML = `
            <div class="header-top">
                <div class="header-brand">
                    <button class="header-back" onclick="renderHome()"><i class="fas fa-arrow-left"></i></button>
                    <div class="header-text">
                        <div class="header-title">${trip.emoji} ${trip.name.toUpperCase()} <span class="accent">2026</span></div>
                        <div class="header-subtitle">${trip.subtitle}</div>
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
        main.innerHTML = trip.days.map(d => renderDay(trip, d)).join('');

        // Collapse all by default
        document.querySelectorAll('.day-card').forEach(el => el.classList.add('day-collapsed'));
    }

    // ===== RENDER DAY =====
    function renderDay(trip, day) {
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
                        <div class="day-title">Day ${day.day}: ${day.title}</div>
                        <div class="day-route">${day.route}</div>
                    </div>
                </div>
                <i class="fas fa-chevron-down day-chevron"></i>
            </div>
            <div class="day-content">
                <div class="day-blocks">
                    ${renderTransport(day)}
                    ${renderGrocery(day)}
                    ${renderHotel(day)}
                    ${renderMeals(day)}
                    ${day.stops.map((s, i) => renderStop(trip, day, s, i)).join('')}
                </div>
            </div>
        </div>`;
    }

    // ===== RENDER TRANSPORT =====
    function renderTransport(day) {
        let html = '';
        if (day.driving) {
            html += `
            <div class="info-block block-driving">
                <div class="block-label driving"><i class="fas fa-car"></i> Driving</div>
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
                <div class="block-label transit"><i class="fas fa-train-subway"></i> Transit</div>
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
    function renderGrocery(day) {
        if (!day.grocery) return '';
        return `
        <div class="info-block block-grocery">
            <div class="block-grocery-left">
                <div class="block-icon grocery"><i class="fas fa-basket-shopping"></i></div>
                <div class="block-text">
                    <span class="block-text-label grocery">Nearest Shop</span>
                    <span class="block-text-value grocery">${day.grocery}</span>
                </div>
            </div>
            <a href="https://www.google.com/maps/search/${esc(day.grocery + ' ' + (day.groceryLoc || ''))}" target="_blank" class="btn-map green">Map</a>
        </div>`;
    }

    // ===== RENDER HOTEL =====
    function renderHotel(day) {
        if (!day.hotel) return '';
        return `
        <div class="info-block block-hotel">
            <div class="block-hotel-left">
                <div class="block-icon hotel"><i class="fas fa-bed"></i></div>
                <div class="block-text">
                    <span class="block-text-label hotel">Tonight's Stay</span>
                    <span class="block-text-value hotel">${day.hotel}</span>
                </div>
            </div>
            <div class="hotel-btns">
                <a href="https://www.google.com/maps/search/${esc(day.hotel + ' ' + (day.hotelLoc || ''))}" target="_blank" class="btn-map indigo">Map</a>
                ${day.hotelLink && day.hotelLink !== '#' ? `<a href="${day.hotelLink}" target="_blank" class="btn-map outline">Info</a>` : ''}
            </div>
        </div>`;
    }

    // ===== RENDER MEALS =====
    function renderMeals(day) {
    if (!day.meals) return '';
    var mealTypes = ['breakfast', 'lunch', 'dessert', 'dinner'];
    var available = mealTypes.filter(function (m) {
        var meal = day.meals[m];
        return meal && (Array.isArray(meal) ? meal.length > 0 : meal.name);
    });
    if (available.length === 0) return '';

    var totalOptions = available.reduce(function (sum, m) {
        var meal = day.meals[m];
        return sum + (Array.isArray(meal) ? meal.length : 1);
    }, 0);

    return '<div class="info-block block-meals food-block-clickable" onclick="showFoodGuide(' + day.day + ')">' +
        '<div class="block-label meals"><i class="fas fa-utensils"></i> Food Guide — ' + totalOptions + ' options</div>' +
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
window.showFoodGuide = function (dayNum) {
    var trip = getTrip();
    if (!trip) return;
    var day = null;
    for (var i = 0; i < trip.days.length; i++) {
        if (trip.days[i].day === dayNum) { day = trip.days[i]; break; }
    }
    if (!day || !day.meals) return;

    var mealTypes = ['breakfast', 'lunch', 'dessert', 'dinner'];
    var mealEmojis = { breakfast: '🌅', lunch: '☀️', dessert: '🍰', dinner: '🌙' };
    var html = '<div class="food-day-title">Day ' + day.day + ': ' + day.title + '</div>';

    mealTypes.forEach(function (m) {
        var items = day.meals[m];
        if (!items) return;
        if (!Array.isArray(items)) items = [items];
        if (items.length === 0) return;

        html += '<div class="food-section">';
        html += '<div class="food-section-title">' + mealEmojis[m] + ' ' + m.charAt(0).toUpperCase() + m.slice(1) + '</div>';

        items.forEach(function (item) {
            html += '<div class="food-card">';
            html += '<div class="food-card-header">';
            html += '<div class="food-card-info">';
            if (item.tag) html += '<span class="food-tag">' + item.tag + '</span>';
            html += '<div class="food-name">' + item.name + '</div>';
            html += '<div class="food-cost">' + item.cost + '</div>';
            html += '</div>';
            if (item.link) {
                html += '<a href="' + item.link + '" target="_blank" class="food-link"><i class="fas fa-arrow-up-right-from-square"></i></a>';
            }
            html += '</div>';
            if (item.desc) html += '<div class="food-desc">' + item.desc + '</div>';
            html += '</div>';
        });

        html += '</div>';
    });

    $('foodContent').innerHTML = html;
    $('foodModal').classList.add('active');
};

    // ===== RENDER STOP =====
    function renderStop(trip, day, stop, idx) {
        const key = stopKey(trip.id, day.day, idx);
        const done = isDone(key);

        // Document badge logic (admin documents)
        let docBadge = '';
        if (stop.doc) {
            const docUrl = `docs/${stop.doc}`;
            docBadge = `<a href="${docUrl}" target="_blank" class="doc-badge"><i class="fas fa-file-invoice"></i> View Ticket</a>`;
        }

        return `
        <div class="stop-item ${done ? 'done' : ''}">
            <div class="stop-dot ${done ? 'done' : ''}"></div>
            <div class="stop-header">
                <div class="stop-header-left">
                    <div class="stop-time">${stop.time}</div>
                    <div class="stop-title">
                        ${stop.icon ? `<i class="fas fa-${stop.icon} stop-icon"></i>` : ''}${stop.title}
                    </div>
                    <div class="stop-tags">
                        ${stop.duration ? `<span class="stop-tag time"><i class="far fa-clock"></i> ${stop.duration}</span>` : ''}
                        ${stop.cost ? `<span class="stop-tag cost"><i class="fas fa-tag"></i> ${stop.cost}</span>` : ''}
                    </div>
                    ${docBadge}
                </div>
                <button class="stop-check" onclick="markDone('${key}')">
                    <i class="${done ? 'fas fa-check-circle checked' : 'far fa-circle unchecked'}"></i>
                </button>
            </div>
            <div class="stop-desc">${stop.desc}</div>
            <div class="detail-block">
                ${stop.famous ? `<div class="detail-item detail-famous"><span class="detail-label">⭐ Famous For</span>${stop.famous}</div>` : ''}
                ${stop.do ? `<div class="detail-item detail-do"><span class="detail-label">🎯 Do This</span>${stop.do}</div>` : ''}
                ${stop.eat ? `<div class="detail-item detail-eat"><span class="detail-label">🍽️ Eat Here</span>${stop.eat}</div>` : ''}
                ${stop.legend ? `<div class="detail-item detail-legend"><span class="detail-label">📜 Legend</span>${stop.legend}</div>` : ''}
                ${stop.photoSpot ? `<div class="detail-item detail-photo"><span class="detail-label">📸 Photo Spot</span>${stop.photoSpot}</div>` : ''}
                ${stop.hack ? `<div class="detail-item detail-hack"><span class="detail-label">💡 Hack</span>${stop.hack}</div>` : ''}
                <div class="detail-actions">
                    ${stop.loc ? `<a href="https://www.google.com/maps/search/${esc(stop.title + ' ' + stop.loc)}" target="_blank" class="btn-detail map">Map</a>` : ''}
                    ${stop.link ? `<a href="${stop.link}" target="_blank" class="btn-detail learn">Learn More</a>` : ''}
                </div>
            </div>
        </div>`;
    }

    // ===== MODALS =====
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

    // Close modals on overlay click
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
        }

        // Close dropdown if clicking outside
        const dd = $('downloadDropdown');
        if (dd && !dd.contains(e.target)) {
            dd.classList.remove('active');
        }
    });

    // ===== INTERACTIONS =====
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

    // Save state before re-render
    var scrollY = window.scrollY;
    var openDays = [];
    document.querySelectorAll('.day-card').forEach(function (el) {
        if (!el.classList.contains('day-collapsed')) openDays.push(el.id);
    });

    renderTrip();

    // Restore open days
    openDays.forEach(function (id) {
        var el = $(id);
        if (el) el.classList.remove('day-collapsed');
    });

    // Restore view mode & scroll
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

    // ===== DOWNLOAD/PRINT =====
    window.printItinerary = function() {
        $('downloadDropdown').classList.remove('active');
        // Expand all days
        document.querySelectorAll('.day-card').forEach(c => c.classList.remove('day-collapsed'));

        // Force detailed view
        const main = $('mainContainer');
        main.classList.remove('summary-view');
        main.classList.add('detailed-view');

        // Trigger print
        setTimeout(() => {
            window.print();
        }, 500); // Small delay to ensure rendering
    };

    window.downloadJsFile = function() {
        $('downloadDropdown').classList.remove('active');
        const trip = getTrip();
        if (!trip) return;
        const fileName = `${trip.id}.js`;
        const url = `trips/${fileName}`;

        fetch(url)
            .then(response => response.text())
            .then(text => {
                const blob = new Blob([text], { type: 'application/javascript' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
                URL.revokeObjectURL(link.href);
            })
            .catch(err => {
                console.error('Failed to download JS file:', err);
                alert('Could not download the JS file directly. You can find it in the repository under trips/' + fileName);
            });
    };

    // ===== ADMIN SYSTEM (GitHub API) =====
    window.openAdmin = function() {
        $('adminModal').classList.add('active');
        if (adminToken && adminRepo) {
            showAdminDashboard();
        }
    };

    window.loginAdmin = function() {
        const token = $('adminToken').value.trim();
        const repo = $('adminRepo').value.trim();
        if (!token || !repo) return alert("Please enter both Token and Repo path (user/repo).");

        adminToken = token;
        adminRepo = repo;
        localStorage.setItem('gh_token', token);
        localStorage.setItem('gh_repo', repo);
        showAdminDashboard();
    };

    window.logoutAdmin = function() {
        adminToken = '';
        adminRepo = '';
        localStorage.removeItem('gh_token');
        localStorage.removeItem('gh_repo');
        $('adminDashboard').classList.add('hidden');
        $('adminLoginArea').classList.remove('hidden');
    };

    function showAdminDashboard() {
        $('adminLoginArea').classList.add('hidden');
        $('adminDashboard').classList.remove('hidden');

        // Populate trip selector
        const trips = getTripList();
        $('adminTripSelect').innerHTML = trips.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
        loadTripForEdit();
    }

    window.loadTripForEdit = function() {
        const tripId = $('adminTripSelect').value;
        const url = `trips/${tripId}.js`;
        fetch(url).then(r => r.text()).then(text => {
            $('tripEditor').value = text;
        });
    };

    window.saveTripToGithub = function() {
        const tripId = $('adminTripSelect').value;
        const content = $('tripEditor').value;
        const path = `trips/${tripId}.js`;
        githubCommit(path, content, `Update itinerary: ${tripId}`, 'saveBtn');
    };

    window.uploadFileToGithub = function() {
        const fileInput = $('adminFile');
        if (fileInput.files.length === 0) return alert("Select a file first.");

        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result.split(',')[1]; // Get base64
            const path = `docs/${file.name}`;
            githubCommit(path, content, `Upload document: ${file.name}`, 'uploadBtn', true);
        };
        reader.readAsDataURL(file);
    };

    async function githubCommit(path, content, message, btnId, isBase64 = false) {
        const btn = $(btnId);
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Committing...';

        try {
            // 1. Get current file SHA (if exists)
            const getUrl = `https://api.github.com/repos/${adminRepo}/contents/${path}`;
            const getRes = await fetch(getUrl, {
                headers: { 'Authorization': `token ${adminToken}` }
            });

            let sha = '';
            if (getRes.ok) {
                const getData = await getRes.json();
                sha = getData.sha;
            }

            // 2. Put file
            const putRes = await fetch(getUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${adminToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    content: isBase64 ? content : btoa(unescape(encodeURIComponent(content))),
                    sha: sha
                })
            });

            if (putRes.ok) {
                alert("Successfully saved to GitHub! It may take a minute for the live site to refresh.");
                if (btnId === 'saveBtn') location.reload(); // Reload to see changes
            } else {
                const err = await putRes.json();
                alert("Error: " + err.message);
            }
        } catch (e) {
            alert("Connection error. Check your token and repo path.");
        } finally {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    }

    // ===== INIT =====
    renderHome();

})();
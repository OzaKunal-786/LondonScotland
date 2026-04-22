/**
 * Family Travel Planner — App Engine
 *
 * Reads trip data from window.TRIPS (populated by trip files in /trips/)
 * Handles: routing, rendering, view modes, progress, modals, Admin Editing
 */

(function () {
    'use strict';

    // ===== ADMIN CONFIG =====
    const T_PARTS = ['ghp_dhOXrDV', 'DIFmJPZGuTNR3O', '4iPpUETqE0gyOUT'];
    const GITHUB_REPO = 'OzaKunal-786/ItineraryHelper';

    const ADMIN_SIG = [158, 160, 187, 180, 185, 149, 228, 231, 230].join('-');

    function checkPass(input) {
        const p = (input || '').trim();
        const inputSig = Array.from(p).map(c => c.charCodeAt(0) ^ 213).join('-');
        return inputSig === ADMIN_SIG;
    }

    function getActiveToken() {
        const backup = sessionStorage.getItem('gh_backup_token');
        if (backup) return backup;
        return T_PARTS.join('');
    }

    // ===== STATE =====
    let activeTrip = null;
    let viewMode = 'summary';
    let isAdmin = false;
    let hasUnsavedChanges = false;

    // ===== HELPERS =====
    function $(id) { return document.getElementById(id); }
    function esc(str) { return encodeURIComponent(str); }
    function getTripList() { return Object.values(window.TRIPS || {}); }
    function getTrip() { return (window.TRIPS || {})[activeTrip]; }
    function stopKey(tripId, dayNum, stopIdx) { return `${tripId}_d${dayNum}s${stopIdx}`; }
    function isDone(key) { return localStorage.getItem(key) === 'true'; }

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
            ${isAdmin ? `
            <div class="home-admin-actions">
                <h3><i class="fas fa-screwdriver-wrench"></i> Admin Dashboard</h3>
                <div class="admin-home-btns">
                    <button onclick="downloadTemplate()" class="btn-admin-outline"><i class="fas fa-file-code"></i> Download Template (.js)</button>
                    <div class="admin-section">
                        <p class="admin-subtext">Upload new trip file (.js):</p>
                        <input type="file" id="newTripFile" class="admin-input" accept=".js">
                        <button onclick="uploadNewItinerary()" id="newTripUploadBtn" class="btn-admin-primary"><i class="fas fa-upload"></i> Upload & Create Trip</button>
                    </div>
                </div>
            </div>` : ''}
            <div class="home-footer">More trips coming soon…</div>`;
    }

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
                            ${trip.emoji} <span id="tripName" class="${isAdmin ? 'editable-admin' : ''}" onclick="editField('name', this)">${trip.name.toUpperCase()}</span> <span 2026</span>
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
                    <button class="btn-tickets" onclick="showTickets()" title="View Tickets">
                        <i class="fas fa-ticket"></i>
                    </button>
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
                <div class="block-label driving"><i class="fas fa-car"></i> Driving ${isAdmin ? `<i class="fas fa-pen admin-pen-tiny" onclick="editDriving(${dayIdx})"></i>` : ''}</div>
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
                <div class="block-label transit"><i class="fas fa-train-subway"></i> Transit ${isAdmin ? `<i class="fas fa-pen admin-pen-tiny" onclick="editTransit(${dayIdx})"></i>` : ''}</div>
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

        // Ticket badge — visible to all users, opens file directly
        let docBadge = '';
        if (stop.doc) {
            docBadge = `<a href="docs/${stop.doc}" target="_blank" class="doc-badge">
                <i class="fas fa-ticket"></i> View Ticket
            </a>`;
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

    // ===== FOOD GUIDE MODAL =====
    window.showFoodGuide = function (dayNum) {
        const trip = getTrip();
        if (!trip) return;
        const day = trip.days.find(d => d.day === dayNum);
        if (!day || !day.meals) return;

        const mealTypes = ['breakfast', 'lunch', 'dessert', 'dinner'];
        const mealIcons = { breakfast: '☀️', lunch: '🌤️', dessert: '🍦', dinner: '🌙' };

        let html = `<div class="food-day-title">Day ${day.day}: ${day.title}</div>`;

        mealTypes.forEach(function (mealType) {
            var rawMeal = day.meals[mealType];
            if (!rawMeal) return;
            var mealList = Array.isArray(rawMeal) ? rawMeal : [rawMeal];
            if (mealList.length === 0) return;

            html += `<div class="food-section">
                <div class="food-section-title">${mealIcons[mealType] || '🍽️'} ${mealType.charAt(0).toUpperCase() + mealType.slice(1)}</div>`;

            mealList.forEach(function (meal) {
                html += `<div class="food-card">
                    <div class="food-card-header">
                        <div class="food-card-info">
                            <span class="food-tag">${mealType}</span>
                            <div class="food-name">${meal.name}</div>
                            <div class="food-cost">${meal.cost || ''}</div>
                        </div>
                        ${meal.link ? `<a href="${meal.link}" target="_blank" class="food-link"><i class="fas fa-external-link-alt"></i></a>` : ''}
                    </div>
                    ${meal.desc ? `<div class="food-desc">${meal.desc}</div>` : ''}
                </div>`;
            });

            html += `</div>`;
        });

        $('foodContent').innerHTML = html;
        $('foodModal').classList.add('active');
    };

    // ===== DIRECT EDITING =====
    window.editField = function (field, el) {
        if (!isAdmin) return;
        const trip = getTrip();
        const newVal = prompt(`Edit ${field}:`, trip[field]);
        if (newVal !== null) { trip[field] = newVal; triggerChange(); }
    };

    window.editDayField = function (dayIdx, field, el) {
        if (!isAdmin) return;
        const day = getTrip().days[dayIdx];
        const newVal = prompt(`Edit Day ${day.day} ${field}:`, day[field] || '');
        if (newVal !== null) { day[field] = newVal; triggerChange(); }
    };

    window.editStopField = function (dayIdx, stopIdx, field, el) {
        if (!isAdmin) return;
        const stop = getTrip().days[dayIdx].stops[stopIdx];
        const newVal = prompt(`Edit ${field}:`, stop[field] || '');
        if (newVal !== null) { stop[field] = newVal; triggerChange(); }
    };

    window.editDriving = function (dayIdx) {
        if (!isAdmin) return;
        const day = getTrip().days[dayIdx];
        const newVal = prompt('Edit driving info (JSON):', JSON.stringify(day.driving || {}));
        if (newVal) {
            try { day.driving = JSON.parse(newVal); triggerChange(); }
            catch (e) { alert('Invalid JSON'); }
        }
    };

    window.editTransit = function (dayIdx) {
        if (!isAdmin) return;
        const day = getTrip().days[dayIdx];
        const newVal = prompt('Edit transit info (JSON):', JSON.stringify(day.transit || {}));
        if (newVal) {
            try { day.transit = JSON.parse(newVal); triggerChange(); }
            catch (e) { alert('Invalid JSON'); }
        }
    };

    window.addStop = function (dayIdx) {
        const day = getTrip().days[dayIdx];
        day.stops.push({
            time: '00:00', title: 'New Stop', icon: 'map-pin',
            desc: 'Description here…', duration: '30 min', cost: 'Free', loc: ''
        });
        triggerChange();
    };

    window.deleteStop = function (dayIdx, stopIdx) {
        if (confirm('Delete this stop?')) {
            getTrip().days[dayIdx].stops.splice(stopIdx, 1);
            triggerChange();
        }
    };

    window.editStopDetails = function (dayIdx, stopIdx) {
        const stop = getTrip().days[dayIdx].stops[stopIdx];
        const newVal = prompt('Advanced Edit (JSON):', JSON.stringify(stop, null, 2));
        if (newVal) {
            try {
                getTrip().days[dayIdx].stops[stopIdx] = JSON.parse(newVal);
                triggerChange();
            } catch (e) { alert('Invalid JSON'); }
        }
    };

    function triggerChange() {
        hasUnsavedChanges = true;
        renderTrip();
    }

    // ===== ADMIN LOGIN / LOGOUT =====
    window.openAdmin = function () {
        $('adminModal').classList.add('active');
        if (isAdmin) showAdminDashboard();
    };

    window.loginAdmin = function () {
        if (checkPass($('adminPassword').value)) {
            isAdmin = true;
            showAdminDashboard();
            if (activeTrip) renderTrip();
            else renderHome();
            closeModal('adminModal');
            alert('Editor mode unlocked!');
        } else {
            alert('Incorrect password.');
        }
    };

    window.logoutAdmin = function () {
        isAdmin = false;
        location.reload();
    };

    function showAdminDashboard() {
        $('adminLoginArea').classList.add('hidden');
        $('adminDashboard').classList.remove('hidden');
    }

    // ===== HOME ADMIN ACTIONS =====
    window.downloadTemplate = function() {
        const link = document.createElement('a');
        link.href = 'trips/template.js';
        link.download = 'template.js';
        link.click();
    };

    window.uploadNewItinerary = function() {
        const fileInput = $('newTripFile');
        if (!fileInput || fileInput.files.length === 0) return alert('Select a .js file first.');
        const file = fileInput.files[0];
        if (!file.name.endsWith('.js')) return alert('Please upload a .js file.');

        const btn = $('newTripUploadBtn');
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading…';

        const reader = new FileReader();
        reader.onload = async function(e) {
            const content = e.target.result.split(',')[1];
            const path = 'trips/' + file.name;
            const success = await githubCommit(path, content, 'Upload new trip: ' + file.name, null, true);
            if (success) {
                alert('Trip uploaded successfully! Reloading...');
                location.reload();
            } else {
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        };
        reader.readAsDataURL(file);
    };

    // ===== TICKETS MODAL (per-itinerary) =====

    /**
     * Open the tickets modal for the currently active trip.
     * Visible to everyone — admin tools shown only when logged in.
     */
    window.showTickets = function () {
        const trip = getTrip();
        if (!trip) return;

        $('ticketsModalTitle').innerHTML = `🎫 ${trip.emoji} ${trip.name} — Tickets`;
        buildTicketsContent(trip);

        // Show admin panel only when logged in as admin
        const adminArea = $('ticketAdminArea');
        if (adminArea) adminArea.style.display = isAdmin ? 'block' : 'none';

        $('ticketsModal').classList.add('active');
    };

    /**
     * Build (or rebuild) the file list inside the tickets modal.
     * Called on open, after upload, after sync, after remove.
     */
    function buildTicketsContent(trip) {
        // Collect stop-linked tickets
        const ticketStops = [];
        trip.days.forEach(function (day) {
            day.stops.forEach(function (stop) {
                if (stop.doc) {
                    ticketStops.push({
                        day: day.day,
                        time: stop.time,
                        title: stop.title,
                        doc: stop.doc
                    });
                }
            });
        });

        // General trip documents
        const tripDocs = trip.documents || [];

        let html = '';

        if (ticketStops.length > 0) {
            html += `<div class="ts-section-label"><i class="fas fa-ticket"></i> Booking Tickets</div>`;
            ticketStops.forEach(function (t) {
                html += makeTicketCard({
                    filename: t.doc,
                    badge: 'Day ' + t.day,
                    meta: t.time + ' — ' + t.title,
                    removable: false
                });
            });
        }

        if (tripDocs.length > 0) {
            if (html) html += '<div class="ts-gap"></div>';
            html += `<div class="ts-section-label"><i class="fas fa-folder-open"></i> Trip Documents</div>`;
            tripDocs.forEach(function (doc) {
                html += makeTicketCard({
                    filename: doc,
                    badge: 'Document',
                    meta: doc,
                    removable: true,
                    removeCall: `removeDocFromTrip('${doc}')`
                });
            });
        }

        if (!html) {
            html = `<div class="ts-empty">
                <i class="fas fa-ticket"></i>
                <p>No tickets linked yet.</p>
                ${isAdmin
                    ? '<p class="ts-empty-sub">Upload files below or click "Sync from Cloud".</p>'
                    : '<p class="ts-empty-sub">Check back soon!</p>'}
            </div>`;
        }

        $('ticketsContent').innerHTML = html;
    }

    /**
     * Render a single ticket / document card.
     */
    function makeTicketCard({ filename, badge, meta, removable, removeCall }) {
        const ext = (filename || '').split('.').pop().toLowerCase();
        const isPdf = ext === 'pdf';
        const isImg = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);
        const icon = isPdf ? 'fa-file-pdf' : isImg ? 'fa-file-image' : 'fa-file-lines';
        const iconColor = isPdf ? '#ef4444' : isImg ? '#8b5cf6' : '#3b82f6';

        return `<div class="ts-card">
            <div class="ts-card-left">
                <div class="ts-card-icon" style="color:${iconColor};">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="ts-card-body">
                    <span class="ts-badge">${badge}</span>
                    ${meta !== filename ? `<div class="ts-card-meta">${meta}</div>` : ''}
                    <div class="ts-card-filename"><i class="fas fa-paperclip"></i> ${filename}</div>
                </div>
            </div>
            <div class="ts-card-actions">
                <a href="docs/${filename}" target="_blank" class="ts-btn-view">
                    <i class="fas fa-eye"></i> View
                </a>
                ${isAdmin && removable && removeCall
                    ? `<button onclick="${removeCall}" class="ts-btn-unlink" title="Remove from trip"><i class="fas fa-times"></i></button>`
                    : ''}
            </div>
        </div>`;
    }

    /**
     * Admin: Fetch all files in the GitHub docs/ folder and link any
     * not yet associated with this trip. Prompts admin to save afterwards.
     */
    window.fetchCloudDocs = async function () {
        const trip = getTrip();
        if (!trip) return;

        const btn = $('syncCloudBtn');
        if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Fetching…'; }

        try {
            const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/docs`;
            const res = await fetch(url, { headers: { 'Authorization': `token ${getActiveToken()}` } });

            if (res.status === 404) {
                alert('No docs/ folder found in the repository yet. Upload files first.');
                return;
            }
            if (res.status === 401) {
                alert('GitHub authentication failed. Please re-enter your token.');
                return;
            }
            if (!res.ok) throw new Error('GitHub API error: ' + res.status);

            const data = await res.json();
            const cloudFiles = Array.isArray(data)
                ? data.filter(function (f) { return f.type === 'file'; }).map(function (f) { return f.name; })
                : [];

            if (cloudFiles.length === 0) {
                alert('No files found in the cloud docs/ folder.');
                return;
            }

            // Determine which files are not yet linked
            const linkedInStops = [];
            trip.days.forEach(function (d) {
                d.stops.forEach(function (s) { if (s.doc) linkedInStops.push(s.doc); });
            });
            const alreadyLinked = (trip.documents || []).concat(linkedInStops);
            const newFiles = cloudFiles.filter(function (f) { return !alreadyLinked.includes(f); });

            if (newFiles.length === 0) {
                alert('All ' + cloudFiles.length + ' cloud file(s) are already linked to ' + trip.name + '.');
            } else {
                trip.documents = trip.documents || [];
                newFiles.forEach(function (f) { trip.documents.push(f); });
                hasUnsavedChanges = true;
                buildTicketsContent(trip);
                if ($('adminSaveBar')) $('adminSaveBar').classList.remove('hidden');
                alert('✅ Linked ' + newFiles.length + ' file(s) to ' + trip.name + '.\nClick "Save to Cloud" to make it permanent.');
            }
        } catch (e) {
            alert('Failed to fetch cloud files: ' + e.message);
            console.error(e);
        } finally {
            if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-cloud-arrow-down"></i> Sync Existing Files from Cloud'; }
        }
    };

    /**
     * Remove a document from the current trip's documents array.
     */
    window.removeDocFromTrip = function (docName) {
        const trip = getTrip();
        if (!trip || !trip.documents) return;
        if (confirm('Remove "' + docName + '" from this trip?')) {
            trip.documents = trip.documents.filter(function (d) { return d !== docName; });
            hasUnsavedChanges = true;
            buildTicketsContent(trip);
            if ($('adminSaveBar')) $('adminSaveBar').classList.remove('hidden');
        }
    };

    /**
     * Called by the Upload button inside the tickets modal.
     */
    window.uploadQuickTickets = function () {
        const fileInput = $('quickTicketFile');
        if (!fileInput || fileInput.files.length === 0) return alert('Select at least one file first.');
        uploadFilesToGithub('quickTicketFile', 'quickUploadBtn');
    };

    // ===== GITHUB SYNC =====

    window.syncAllChanges = function () {
        const trip = getTrip();
        if (!trip) return;
        const path = `trips/${trip.id}.js`;
        const fileContent = `window.TRIPS = window.TRIPS || {};\n\nwindow.TRIPS.${trip.id} = ${JSON.stringify(trip, null, 4)};`;
        githubCommit(path, fileContent, `Update itinerary: ${trip.name}`, 'syncBtn');
    };

    window.uploadFilesToGithub = async function (inputId, btnId) {
        inputId = inputId || 'adminFile';
        btnId   = btnId   || 'uploadBtn';

        const fileInput = $(inputId);
        if (!fileInput || fileInput.files.length === 0) return alert('Select files first.');

        const btn = $(btnId);
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading…';

        const trip = getTrip();

        for (const file of fileInput.files) {
            await new Promise(function (resolve) {
                const reader = new FileReader();
                reader.onload = async function (e) {
                    const content = e.target.result.split(',')[1];
                    const success = await githubCommit('docs/' + file.name, content, 'Upload: ' + file.name, null, true);
                    if (success && trip) {
                        trip.documents = trip.documents || [];
                        if (!trip.documents.includes(file.name)) {
                            trip.documents.push(file.name);
                            hasUnsavedChanges = true;
                        }
                    }
                    resolve();
                };
                reader.readAsDataURL(file);
            });
        }

        btn.disabled = false;
        btn.innerHTML = originalText;

        // Refresh ticket list if modal is still open
        if (trip && $('ticketsModal').classList.contains('active')) {
            buildTicketsContent(trip);
            if (isAdmin && $('adminSaveBar')) $('adminSaveBar').classList.remove('hidden');
        }

        alert('Upload complete! Files linked to ' + (trip ? trip.name : 'trip') + '.');
    };

    async function githubCommit(path, content, message, btnId, isBase64) {
        isBase64 = isBase64 || false;
        const btn = btnId ? $(btnId) : null;
        const originalText = btn ? btn.innerHTML : '';
        if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving…'; }

        try {
            const url   = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`;
            const token = getActiveToken();

            const getRes = await fetch(url, { headers: { 'Authorization': `token ${token}` } });
            let sha = '';
            if (getRes.ok) {
                sha = (await getRes.json()).sha;
            } else if (getRes.status === 401) {
                const newToken = prompt('⚠️ Cloud auth failed.\nEnter a new GitHub Personal Access Token:');
                if (newToken) {
                    sessionStorage.setItem('gh_backup_token', newToken.trim());
                    return githubCommit(path, content, message, btnId, isBase64);
                }
                return false;
            }

            const putRes = await fetch(url, {
                method: 'PUT',
                headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: message,
                    content: isBase64 ? content : btoa(unescape(encodeURIComponent(content))),
                    sha: sha
                })
            });

            if (putRes.ok) {
                if (!isBase64) {
                    hasUnsavedChanges = false;
                    alert('Changes saved to cloud!');
                    location.reload();
                }
                return true;
            } else {
                const err = await putRes.json();
                alert('Cloud sync failed: ' + err.message);
                return false;
            }
        } catch (e) {
            alert('Connection error. Check console.');
            console.error(e);
            return false;
        } finally {
            if (btn) { btn.disabled = false; btn.innerHTML = originalText; }
        }
    }

    // ===== MODALS & UTILS =====

    window.showHacks = function () {
        const trip = getTrip();
        if (!trip) return;
        $('hacksContent').innerHTML = trip.hacks.map(function (h) {
            return `<div class="hack-item">
                <span class="hack-icon">${h.icon}</span>
                <div>
                    <div class="hack-title">${h.title}</div>
                    <div class="hack-text">${h.text}</div>
                </div>
            </div>`;
        }).join('');
        $('hacksModal').classList.add('active');
    };

    window.showEmergency = function () {
        const trip = getTrip();
        if (!trip || !trip.emergency) return;
        const e = trip.emergency;
        $('emergencyContent').innerHTML =
            e.numbers.map(function (n) {
                return `<a href="tel:${n.value.replace(/\s/g, '')}" class="emergency-number">
                    <div class="emergency-icon"><i class="fas fa-${n.icon}"></i></div>
                    <div class="emergency-info">
                        <div class="emergency-label">${n.label}</div>
                        <div class="emergency-value">${n.value}</div>
                    </div>
                    <i class="fas fa-phone emergency-phone-icon"></i>
                </a>`;
            }).join('') +
            `<div class="emergency-section-title">🏥 Nearest Hospitals</div>` +
            e.hospitals.map(function (h) {
                return `<div class="hospital-row">
                    <div>
                        <div class="hospital-name">${h.name}</div>
                        <div class="hospital-phone">${h.phone}</div>
                    </div>
                    <a href="https://www.google.com/maps/search/${esc(h.name + ' ' + h.loc)}" target="_blank" class="btn-map green" style="font-size:9px;padding:5px 10px;">Map</a>
                </div>`;
            }).join('') +
            `<div class="emergency-section-title">📱 Essential Apps</div>
            <div class="app-tags">${e.apps.map(function (a) { return `<span class="app-tag">${a}</span>`; }).join('')}</div>`;
        $('emergencyModal').classList.add('active');
    };

    window.closeModal = function (id) { $(id).classList.remove('active'); };

    window.toggleDay = function (dayNum) {
        const el = $('day-' + dayNum);
        if (el) el.classList.toggle('day-collapsed');
    };

    window.jumpToDay = function (dayNum) {
        const el = $('day-' + dayNum);
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
        const anyOpen = Array.from(cards).some(function (c) { return !c.classList.contains('day-collapsed'); });
        cards.forEach(function (c) { anyOpen ? c.classList.add('day-collapsed') : c.classList.remove('day-collapsed'); });
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

    window.toggleDownloadDropdown = function (e) {
        e.stopPropagation();
        $('downloadDropdown').classList.toggle('active');
    };

    window.printItinerary = function () {
        $('downloadDropdown').classList.remove('active');
        document.querySelectorAll('.day-card').forEach(function (c) { c.classList.remove('day-collapsed'); });
        const main = $('mainContainer');
        main.classList.remove('summary-view');
        main.classList.add('detailed-view');
        setTimeout(function () { window.print(); }, 500);
    };

    window.downloadJsFile = function () {
        $('downloadDropdown').classList.remove('active');
        const trip = getTrip();
        if (!trip) return;
        const fileContent = `window.TRIPS = window.TRIPS || {};\n\nwindow.TRIPS.${trip.id} = ${JSON.stringify(trip, null, 4)};`;
        const blob = new Blob([fileContent], { type: 'application/javascript' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = trip.id + '.js';
        link.click();
    };

    // Close modals / dropdown on outside click
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
        }
        const dd = $('downloadDropdown');
        if (dd && !dd.contains(e.target)) dd.classList.remove('active');
    });

    // ===== INIT =====
    renderHome();

})();
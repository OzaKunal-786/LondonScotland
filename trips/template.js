/**
 * ============================================================
 * TRIP TEMPLATE — Copy this file and rename for your new trip
 * ============================================================
 * 
 * HOW TO ADD A NEW TRIP:
 * 1. Copy this file → rename (e.g., paris.js)
 * 2. Change TRIP_ID below to a unique lowercase id (e.g., "paris")
 * 3. Fill in the data following the structure below
 * 4. Add <script src="trips/paris.js"></script> to index.html
 *    (before the app.js script tag)
 * 5. Refresh the site — your trip appears automatically!
 * 
 * RULES:
 * - id must be unique lowercase, no spaces (e.g., "paris", "japan2027")
 * - gradient options: "red", "indigo", "emerald", "amber", "violet", "sky"
 *   (add more in styles.css under .grad-xxx)
 * - All fields in a stop are OPTIONAL except: time, title, desc
 * - Each day must have: day, date, title, route, stops[]
 * - Use "driving" for road trips OR "transit" for public transport days
 *   (you can have both on the same day)
 * ============================================================
 */

window.TRIPS = window.TRIPS || {};

window.TRIPS["TRIP_ID"] = {

    // ── Trip Identity ──────────────────────────────────────
    id:       "TRIP_ID",           // unique key (lowercase, no spaces)
    name:     "Trip Name",         // display name
    emoji:    "🌍",                // emoji for the card
    subtitle: "Your Trip Tagline", // short description
    dates:    "Mon DD – Mon DD, YYYY", // date range display
    gradient: "indigo",            // color theme: red | indigo | emerald | amber | violet | sky

    // ── Emergency Info (shown in 🚨 modal) ─────────────────
    emergency: {
        numbers: [
            // { label: "...", value: "...", icon: "font-awesome-icon-name" }
            { label: "Emergency", value: "112", icon: "phone" }
        ],
        hospitals: [
            // { name: "...", loc: "postcode or address", phone: "..." }
            { name: "City Hospital", loc: "XX1 1XX", phone: "000 000 0000" }
        ],
        apps: [
            // list of useful app names
            "Google Maps (offline)", "what3words"
        ]
    },

    // ── Hacks & Tips (shown in 💰 modal) ──────────────────
    hacks: [
        // { icon: "emoji", title: "...", text: "..." }
        { icon: "💡", title: "Hack Title", text: "Description of the hack or tip." }
    ],

    // ── Days ───────────────────────────────────────────────
    days: [
        {
            // ── Day Header ──
            day:   1,                        // day number
            date:  "Mon DD",                 // e.g., "Apr 25"
            title: "Day Theme Title",        // e.g., "Arrival & Old Town"
            route: "From → To",              // route summary

            // ── Accommodation ──
            hotel:     "Hotel Name",
            hotelLink: "https://...",        // booking/info URL (use "#" if none)
            hotelLoc:  "postcode or address",

            // ── Grocery ──
            grocery:    "Nearest Supermarket",
            groceryLoc: "postcode",

            // ── Transport (use ONE or BOTH) ──
            // For driving days:
            driving: {
                km:       100,               // total km
                time:     "1h 30m",          // drive time
                warnings: "Any road warnings",
                fuelStop: "Where to fuel up"
            },
            // For public transport days:
            // transit: {
            //     lines: "Metro Line 1 → Bus 42",
            //     cost:  "Day pass €8",
            //     tips:  "Buy tickets at the machine, not on the bus"
            // },

            // ── Meals ──
            meals: {
                breakfast: { name: "Place or plan",  cost: "£/€ price", link: "" },
                lunch:     { name: "Restaurant",     cost: "£/€ price", link: "https://..." },
                dinner:    { name: "Restaurant",     cost: "£/€ price", link: "https://..." }
            },

            // ── Stops (the itinerary items) ──
            stops: [
                {
                    // REQUIRED fields:
                    time:  "10:00",              // arrival time
                    title: "Place Name",         // stop name
                    desc:  "Brief description.", // 1-2 sentences

                    // OPTIONAL fields (include any you have, skip the rest):
                    icon:      "camera",         // Font Awesome icon name (without "fa-")
                    loc:       "XX1 1XX",         // postcode or address (for Map button)
                    duration:  "1 hr",           // how long to spend
                    cost:      "Free",           // entry cost
                    do:        "What to do here, especially with kids.",
                    eat:       "Recommended food nearby.",
                    famous:    "What this place is famous for.",
                    legend:    "Any legend, myth, or cool story.",
                    photoSpot: "📸 Best angle / time for photos.",
                    hack:      "Money-saving or time-saving tip.",
                    link:      "https://..."     // Learn More URL
                }
                // ... add more stops
            ]
        }
        // ... add more days
    ]
};

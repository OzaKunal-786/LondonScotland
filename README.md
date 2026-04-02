# ✈️ Family Travel Planner

A lightweight, offline-friendly travel itinerary website. No frameworks, no build tools, no database — just HTML, CSS, JS, and your trip data.

![screenshot](https://img.shields.io/badge/status-active-brightgreen) ![license](https://img.shields.io/badge/license-MIT-blue)

---

## 📁 Project Structure


project/
├── index.html          ← skeleton (edit only to add new trip scripts)
├── css/
│   └── styles.css      ← all styling
├── js/
│   └── app.js          ← rendering engine (don't touch unless customising)
├── trips/
│   ├── _template.js    ← copy this to create a new trip
│   ├── london.js       ← example trip
│   └── scotland.js     ← example trip
└── README.md

yaml

Copy code

---

## 🚀 Quick Start

1. Download or clone the project
2. Open `index.html` in any browser
3. That's it — no server, no install, no build step

---

## ➕ Adding a New Trip

### Step 1: Copy the template


Copy:   trips/_template.js
Rename: trips/your-trip-name.js

php
Run Code

Copy code

### Step 2: Edit your trip file

Open your new file and fill in:

```javascript
window.TRIPS = window.TRIPS || {};

window.TRIPS["paris"] = {       // ← unique lowercase id, no spaces

    id:       "paris",
    name:     "Paris",
    emoji:    "🇫🇷",
    subtitle: "City of Lights",
    dates:    "Jun 10 – Jun 14, 2026",
    gradient: "violet",         // colour theme (see options below)

    emergency: { ... },         // emergency numbers & hospitals
    hacks:     [ ... ],         // tips shown in the 💰 modal
    days:      [ ... ]          // your day-by-day itinerary
};


Step 3: Register it in index.html
Add one line before the app.js script tag:

html

Copy code
<!-- existing trips -->
<script src="trips/london.js"></script>
<script src="trips/scotland.js"></script>

<!-- your new trip — add here -->
<script src="trips/paris.js"></script>

<!-- app engine — must be LAST -->
<script src="js/app.js"></script>

Step 4: Refresh browser
Your trip appears on the home page automatically.

📝 Trip File Format
Minimum Required Fields
Every trip needs:

javascript
Run Code

Copy code
{
    id, name, emoji, subtitle, dates, gradient,
    emergency: { numbers: [], hospitals: [], apps: [] },
    hacks: [],
    days: []
}


Every day needs:

javascript
Run Code

Copy code
{
    day: 1,
    date: "Jun 10",
    title: "Day Title",
    route: "From → To",
    stops: []
}


Every stop needs only 3 fields (everything else is optional):

javascript
Run Code

Copy code
{
    time:  "10:00",
    title: "Place Name",
    desc:  "Brief description."
}


All Optional Stop Fields
javascript
Run Code

Copy code
{
    // REQUIRED
    time:      "10:00",
    title:     "Place Name",
    desc:      "Brief description.",

    // OPTIONAL — add any, skip any
    icon:      "camera",          // Font Awesome icon (without "fa-")
    loc:       "SW1A 1AA",        // postcode or address (for Map button)
    duration:  "1.5 hrs",         // how long to spend
    cost:      "Free",            // entry cost
    do:        "What to do here.",
    eat:       "Food recommendations.",
    famous:    "What it's famous for.",
    legend:    "Any myth or cool story.",
    photoSpot: "📸 Best photo angles.",
    hack:      "Money or time saving tip.",
    link:      "https://..."      // Learn More URL
}


Day Optional Fields
javascript
Run Code

Copy code
{
    // REQUIRED
    day, date, title, route, stops,

    // OPTIONAL
    hotel:     "Hotel Name",
    hotelLink: "https://...",
    hotelLoc:  "postcode",

    grocery:    "Nearest Supermarket",
    groceryLoc: "postcode",

    // Use driving OR transit OR both
    driving: {
        km:       150,
        time:     "2h 30m",
        warnings: "Road warnings",
        fuelStop: "Where to fuel"
    },
    transit: {
        lines: "Metro Line 1 → Bus 42",
        cost:  "Day pass €8",
        tips:  "Buy tickets at machine"
    },

    // Meals — each type is an ARRAY of options
    meals: {
        breakfast: [
            { name: "Café", cost: "€5-8pp", tag: "☕ Quick", desc: "Details", link: "" }
        ],
        lunch: [
            { name: "Top Pick", cost: "€12pp", tag: "🌟 Must Visit", desc: "Details", link: "https://..." },
            { name: "Budget", cost: "€5pp", tag: "💰 Cheap", desc: "Details", link: "" }
        ],
        dessert: [
            { name: "Sweet Spot", cost: "€4", tag: "🍰 Treat", desc: "Details", link: "" }
        ],
        dinner: [
            { name: "Restaurant", cost: "€15pp", tag: "🔥 Popular", desc: "Details", link: "" }
        ]
    }
}


🎨 Available Gradient Colours
Use these values for the gradient field:

Value	Colour
red	Red/Rose
indigo	Indigo/Blue
emerald	Green
amber	Orange/Gold
violet	Purple
sky	Light Blue
To add a custom colour, add this to css/styles.css:

css

Copy code
.grad-pink { background: linear-gradient(135deg, #ec4899, #f472b6); }

Then use gradient: "pink" in your trip file.

🔧 Features
Feature	How It Works
Two view modes	Summary (compact) ↔ Detailed (all info). Toggle button in header.
Collapsible days	Click day header to expand/collapse. Layer button collapses all.
Progress tracking	Check off stops as you complete them. Saved in browser localStorage.
Day jumper	Numbered buttons in header — jump to any day. Turns green when all stops done.
Food guide	Tap the meal block on any day for a detailed popup with all options.
Emergency info	Red 🚨 button — phone numbers (tappable), hospitals with maps, useful apps.
Hacks & tips	💰 button — trip-specific money/time saving tips.
Map links	Every stop, hotel, and grocery has a Google Maps link.
💾 Data Storage
All progress (checked stops) is saved in browser localStorage
No server, no account, no cloud
Clearing browser data resets progress
Each trip's progress is independent (prefixed by trip ID)
📱 Offline Use
The site works offline once loaded. For areas with no signal:

Open the site while online
The browser caches the HTML/CSS/JS
Trip data is embedded in the JS files — no API calls
For better offline support, consider adding a service worker (not included).

🤖 Using AI to Generate Trip Data
Give your AI assistant this prompt:

less

Copy code
Write me a trip itinerary file for [DESTINATION] in this exact JavaScript format.
[Paste the contents of trips/_template.js here]

Trip details:
- Dates: [your dates]
- Traveling with: [who]
- Interests: [what you like]
- Budget: [budget level]
- Hotels: [your hotel names]

Save the output as trips/your-trip.js, add the script tag to index.html, done.

📋 Checklist for New Trip
 Copied trips/_template.js to new file
 Set unique id (lowercase, no spaces)
 Filled in trip info (name, emoji, dates, gradient)
 Added emergency numbers & hospitals
 Added hacks/tips
 Added all days with stops
 Added meals as arrays [{...}] not single objects {...}
 Added <script> tag to index.html before app.js
 Tested in browser

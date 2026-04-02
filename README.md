# ✈️ Family Travel Planner

A simple travel itinerary website that works offline.  
No frameworks. No build tools. No database.  
Just HTML, CSS, JS, and your trip data.

---

## 📁 Project Structure

```
travel-planner/
├── index.html              # skeleton — edit only to add new trip scripts
├── README.md
├── css/
│   └── styles.css          # all styling
├── js/
│   └── app.js              # rendering engine (don't edit)
└── trips/
    ├── _template.js        # the master template — never delete this
    ├── london.js           # example trip
    └── scotland.js         # example trip
```

---

## 🚀 Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/travel-planner.git
open index.html
```

No `npm install`. No server. No build step. Just open and go.

---

## ✨ What You Get

| Feature | Description |
|---------|-------------|
| **Multi-trip home page** | Unlimited trips, each as a card with progress |
| **Two view modes** | Summary (compact) ↔ Detailed (legends, hacks, photo spots) |
| **Collapsible days** | Tap to expand/collapse |
| **Progress tracking** | Check off stops. Saved in browser. Survives refresh |
| **Day jumper** | Jump to any day. Pills turn green when complete |
| **Food guide popup** | Multiple restaurant options per meal with tags and details |
| **Emergency modal** | Tappable phone numbers, hospitals with maps |
| **Hacks & tips** | Trip-specific money/time saving tips |
| **Map links** | Every stop, hotel, grocery links to Google Maps |
| **Fully offline** | No API calls. All data in JS files |
| **Mobile first** | Built for phones. Works on desktop too |

---

## ➕ How to Add a New Trip

### 1. Download the template

Download or copy `trips/_template.js` from this repo.

---

### 2. Ask any AI to fill it

Open any AI chatbot (ChatGPT, Claude, Gemini, Copilot — anything).  
Send this prompt, and **attach `_template.js` as a file or paste it below the prompt**:

---

```
I need you to write a travel itinerary as a JavaScript data file.

I have attached a template file. Follow the exact structure and format in that template.
Do not change any field names or the JavaScript structure.
Output ONLY the JavaScript code, nothing else — no explanations before or after.

MY TRIP DETAILS:

Destination: [CITY / COUNTRY]
Dates: [START DATE – END DATE]
Traveling with: [e.g., partner and 5-year-old son]
Flying from: [ORIGIN CITY]
Flight details: [FLIGHT TIMES if known, or say "pick reasonable times"]
Hotels: [LIST YOUR HOTEL NAMES AND DATES, or say "suggest budget hotels"]
Interests: [e.g., history, food, Harry Potter, playgrounds, nature, photography]
Budget level: [budget / mid-range / luxury]
Diet: [e.g., vegetarian, no restrictions, halal]
Travel style: [e.g., no museums, free activities preferred, lots of walking]

RULES FOR THE AI:
1. Follow the attached template format exactly. Do not rename or remove any fields.
2. gradient must be one of: red, indigo, emerald, amber, violet, sky
3. icon must be a valid Font Awesome 6 icon name without the "fa-" prefix
4. Every stop MUST include: time, title, desc. Include as many optional fields as possible.
5. Meals must be arrays: [{ name, cost, tag, desc, link }] — not single objects.
6. Include at least 2 lunch options per day (one must-visit, one budget alternative).
7. Include real emergency numbers and nearest hospitals for the destination.
8. Include at least 6 destination-specific hacks and tips.
9. Add a "dessert" meal type if the destination is known for sweets or pastries.
10. For every stop include at minimum: do, famous, photoSpot, and hack.
11. All links should be real Google search URLs or official website URLs.
12. Output ONLY the JavaScript. Nothing else.
```

---

### 3. Save the AI output

Save the AI's response as a `.js` file inside the `trips/` folder:

```
trips/paris.js
trips/tokyo.js
trips/new-york.js
```

---

### 4. Register in index.html

Open `index.html` and add **one line** before the `app.js` script tag:

```html
<script src="trips/london.js"></script>
<script src="trips/scotland.js"></script>
<script src="trips/paris.js"></script>      <!-- ✅ your new trip -->

<script src="js/app.js"></script>           <!-- must always be LAST -->
```

Refresh your browser. Your trip appears on the home page.

---

## 🎨 Gradient Colours

| Value | Colour |
|-------|--------|
| `red` | Red / Rose |
| `indigo` | Indigo / Blue |
| `emerald` | Green |
| `amber` | Orange / Gold |
| `violet` | Purple |
| `sky` | Light Blue |

**Adding a custom colour** — add to `css/styles.css`:

```css
.grad-pink { background: linear-gradient(135deg, #ec4899, #f472b6); }
```

Then use `gradient: "pink"` in your trip file.

---

## 💾 How Progress Works

- Checked stops are saved in **browser localStorage**
- Each trip is tracked independently
- No server, no account, no cloud sync
- Clearing browser data will reset progress
- Progress persists across refreshes and browser restarts

---

## 🌐 Deployment

| Platform | How |
|----------|-----|
| **GitHub Pages** | Push → Settings → Pages → Deploy from branch |
| **Netlify** | Drag and drop the project folder |
| **Vercel** | `vercel --prod` in the project folder |
| **Local** | Just open `index.html` |
| **USB / offline** | Copy the folder anywhere. Open `index.html`. Works with no internet |

---

## ✅ New Trip Checklist

```
[ ] Downloaded trips/_template.js
[ ] Sent AI prompt with template attached and trip details filled in
[ ] Saved AI output as trips/my-trip.js
[ ] Verified the file starts with: window.TRIPS = window.TRIPS || {};
[ ] Added <script src="trips/my-trip.js"></script> to index.html
[ ] Script tag is BEFORE app.js
[ ] Opened in browser — trip shows on home page
[ ] Tapped into trip — days expand correctly
[ ] Tapped meal block — food popup opens
[ ] Checked a stop — progress saves without jumping back to home
```

---

## 🛠️ Troubleshooting

| Problem | Fix |
|---------|-----|
| Trip doesn't appear | Check script tag is before `app.js` in `index.html` |
| JavaScript error in console | Usually a missing comma or bracket — paste your JS into [jsonlint.com](https://jsonlint.com) to spot it |
| Meals show undefined | Meals must be arrays `[{...}]` not single objects `{...}` |
| Checking a stop jumps to home | See `markDone` function in `app.js` — scroll position fix required |
| Food popup is empty | Check meals arrays each have at least `name` and `cost` |
| Map links don't work | Check the `loc` field has a real postcode or address |

---

## 📄 License

MIT — use it however you want. No attribution required.

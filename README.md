# ✈️ Family Travel Planner

A simple travel itinerary website that works offline with a powerful direct-editing Admin Panel.  
No frameworks. No build tools. No database.  
Just HTML, CSS, JS, and your trip data.

---

## 🔐 Admin Panel (New!)

The app now includes a built-in **Admin Editor** that allows you to manage your trips directly on the page without touching code.

### Features:
- **Direct Editing**: Click any underlined text (names, dates, stops, descriptions) to edit instantly.
- **Add/Delete Stops**: Manage your daily schedule on the fly.
- **GitHub Sync**: Changes are committed directly to your repository with one click.
- **Bulk Document Upload**: Upload tickets, PDFs, and images to the `docs/` folder in bulk.
- **Auto-linking**: Reference uploaded docs in your stops to show "View Ticket" buttons.

### How to access:
1. Click the **Lock icon** at the bottom of the page.
2. Enter your admin password (default is `admin2026`).
3. Start editing! Look for the "Sync to GitHub" bar at the top to save.

---

## 📁 Project Structure

```
travel-planner/
├── index.html              # skeleton
├── README.md
├── css/
│   └── styles.css          # all styling
├── js/
│   └── app.js              # rendering engine & admin logic
├── docs/                   # uploaded tickets and PDFs
└── trips/
    ├── _template.js        # trip data template
    ├── london.js           # example trip
    └── scotland.js         # example trip
```

---

## 🚀 Quick Start

```bash
git clone https://github.com/OzaKunal-786/ItineraryHelper.git
open index.html
```

---

## 🌐 Deployment

| Platform | How |
|----------|-----|
| **GitHub Pages** | Push → Settings → Pages → Deploy from branch |
| **Vercel / Netlify** | Connect your repository for auto-deployments |

---

## 📄 License

MIT — use it however you want. No attribution required.

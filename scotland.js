window.TRIPS = window.TRIPS || {};

window.TRIPS.scotland = {
    id: "scotland",
    name: "Scotland",
    emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    subtitle: "Highland Family Adventure",
    dates: "Apr 28 – May 4, 2026",
    gradient: "indigo",

    emergency: {
        numbers: [
            { label: "Police / Fire / Ambulance", value: "999", icon: "phone" },
            { label: "Non-Emergency Police", value: "101", icon: "shield" },
            { label: "NHS 24 Scotland", value: "111", icon: "heart-pulse" },
            { label: "AA Breakdown", value: "0800 88 77 66", icon: "car-burst" },
            { label: "RAC Breakdown", value: "0330 159 1111", icon: "car-burst" }
        ],
        hospitals: [
            { name: "Belford Hospital, Fort William", loc: "PH33 6BS", phone: "01397 702481" },
            { name: "Broadford Hospital, Skye", loc: "IV49 9AA", phone: "01471 822491" },
            { name: "Raigmore Hospital, Inverness", loc: "IV2 3UJ", phone: "01463 704000" },
            { name: "Royal Infirmary Edinburgh", loc: "EH16 4SA", phone: "0131 536 1000" }
        ],
        apps: ["RingGo", "JustPark", "what3words", "Google Maps (offline)", "Met Office Weather"]
    },

    hacks: [
        { icon: "🎟️", title: "Explorer Pass", text: "Save 20% on castles & historic sites. Buy online before trip." },
        { icon: "⛽", title: "Petrol", text: "Fill up in cities. Prices spike 15-20p/litre in Highlands." },
        { icon: "🥘", title: "Pre-Theatre Menus", text: "Eat before 6 PM for 30% savings at most restaurants." },
        { icon: "🅿️", title: "Parking Apps", text: "RingGo & JustPark required for most lots. Download before trip." },
        { icon: "💧", title: "Water", text: "Scottish tap water is world-class. Don't buy bottles." },
        { icon: "📶", title: "Signal", text: "No mobile signal in much of Highlands/Skye. Download offline maps." },
        { icon: "🛣️", title: "Single Track Roads", text: "Use passing places. Pull LEFT to let faster cars pass." },
        { icon: "🧒", title: "Kids Eat Free", text: "Premier Inn, Beefeater, Harvester — kids eat free with adult meal." }
    ],

    days: [
        {
            day: 1, date: "Apr 28", title: "The Highland Entrance",
            route: "Stansted → EDI → Fort William",
            hotel: "The Base Camp Hotel, Nevis Range",
            hotelLink: "https://www.nevisrange.co.uk/accommodation/hotel/",
            hotelLoc: "PH33 6SQ",
            grocery: "Aldi / Lidl Fort William", groceryLoc: "PH33 6PP",
            driving: { km: 210, time: "3h 15m", warnings: "A82 single carriageway after Tarbet — slow lorries common", fuelStop: "Aldi petrol Fort William" },
            meals: {
                breakfast: { name: "Ramada Stansted / Airport", cost: "Included or packed", link: "" },
                lunch: { name: "The Village Rest, Luss", cost: "£8-12pp", link: "https://www.google.com/search?q=Village+Rest+Luss" },
                dinner: { name: "The Wildcat, Fort William", cost: "£12-18pp", link: "https://www.google.com/search?q=The+Wildcat+Fort+William" }
            },
            stops: [
                {
                    time: "09:30", title: "Land at EDI & Pick Up Car", icon: "plane-arrival", loc: "EH12 9DN",
                    desc: "Arrival from Stansted. Pick up rental car.",
                    duration: "45 min", cost: "Pre-paid",
                    hack: "Join rental loyalty club online to skip queue. Photo car damage BEFORE driving off.",
                    link: "https://www.google.com/search?q=Edinburgh+Airport+rental+car"
                },
                {
                    time: "12:15", title: "Luss Village", icon: "water", loc: "G83 8PA",
                    desc: "Stone cottage village on the banks of Loch Lomond.",
                    duration: "45 min", cost: "Free (parking £3/hr)",
                    do: "Walk to the pier. Tell Kabir to look for Nessie's cousins.",
                    eat: "The Village Rest — soup & sandwich, cheap and warm.",
                    famous: "Most photographed village on Loch Lomond. TV show 'Take the High Road'.",
                    photoSpot: "📸 Pier with Loch backdrop. Afternoon light from south side.",
                    hack: "Parking fills by 11 AM. Arrive early or park on road outside village.",
                    link: "https://www.google.com/search?q=Luss+Village+Loch+Lomond"
                }
            ]
        },
        {
            day: 2, date: "Apr 29", title: "Hogwarts Express",
            route: "Fort William → Skye",
            hotel: "Saucy Mary's Hostel",
            hotelLink: "https://www.saucymarys.com/",
            hotelLoc: "IV41 8PH",
            grocery: "Co-op Broadford", groceryLoc: "IV49 9AB",
            driving: { km: 145, time: "2h 40m", warnings: "A87 to Skye Bridge winding. Single track after Invergarry.", fuelStop: "Fort William Morrisons — last cheap fuel before Skye" },
            meals: {
                breakfast: { name: "Base Camp Hotel / Café Mango", cost: "£6-10pp", link: "https://www.google.com/search?q=Cafe+Mango+Fort+William" },
                lunch: { name: "Glenfinnan Dining Car", cost: "£8-12pp", link: "https://www.google.com/search?q=Glenfinnan+Dining+Car" },
                dinner: { name: "Co-op meal deal at hostel", cost: "£5pp", link: "" }
            },
            stops: [
                {
                    time: "09:40", title: "Glenfinnan Viaduct", icon: "train", loc: "PH37 4LT",
                    desc: "The Harry Potter Bridge — 21 arches over the glen.",
                    duration: "1.5 hrs", cost: "Free (parking £3.50)",
                    do: "Hike to east viewpoint (15 min uphill) for 10:45 AM Jacobite train crossing.",
                    eat: "Glenfinnan Dining Car — converted railway carriage, great soup.",
                    famous: "Chamber of Secrets & Prisoner of Azkaban filming location.",
                    legend: "Built 1901. A horse is rumoured buried inside one of the pillars.",
                    photoSpot: "📸 East viewpoint hill. Position by 10:30. Train crosses at 10:45 — 30 seconds.",
                    hack: "Arrive BY 09:45 or packed. NPC car park fills first — use overflow.",
                    link: "https://www.google.com/search?q=Glenfinnan+Viaduct+train+times"
                },
                {
                    time: "12:00", title: "Glenfinnan Monument", icon: "monument", loc: "PH37 4LT",
                    desc: "Tower commemorating the 1745 Jacobite Rising.",
                    duration: "30 min", cost: "Free (tower climb £4)",
                    do: "Walk to loch shore. Stunning reflections on calm days.",
                    famous: "Where Bonnie Prince Charlie raised his standard.",
                    legend: "The figure on top faces the wrong way — nobody knows why.",
                    photoSpot: "📸 From loch shore looking back at monument with mountains.",
                    link: "https://www.google.com/search?q=Glenfinnan+Monument"
                },
                {
                    time: "15:00", title: "Eilean Donan Castle", icon: "chess-rook", loc: "IV40 8DQ",
                    desc: "Scotland's most iconic castle on a tiny island.",
                    duration: "1 hr", cost: "£10 adult / £6 child (under 5 free)",
                    do: "Cross the stone bridge. Let Kabir be the castle guard.",
                    famous: "Featured in Highlander, James Bond, and Brave.",
                    photoSpot: "📸 From A87 layby 200m before the car park. Golden hour is magical.",
                    hack: "Last entry 1hr before closing. Skip inside if short on time — exterior is the star.",
                    link: "https://www.google.com/search?q=Eilean+Donan+Castle"
                }
            ]
        },
        {
            day: 3, date: "Apr 30", title: "North Skye Giants",
            route: "Trotternish Loop",
            hotel: "Skye Backpackers",
            hotelLink: "https://www.scotlandstophostels.com/our-hostels/skye-backpackers",
            hotelLoc: "IV41 8PL",
            grocery: "Portree Co-op", groceryLoc: "IV51 9BW",
            driving: { km: 95, time: "1h 45m", warnings: "Trotternish road narrow. Tour buses from 10 AM.", fuelStop: "Portree filling station — only one, expect queues" },
            meals: {
                breakfast: { name: "Hostel kitchen / packed", cost: "£3pp", link: "" },
                lunch: { name: "Co-op picnic or Scorrybreac", cost: "£5-15pp", link: "https://www.google.com/search?q=Scorrybreac+Portree" },
                dinner: { name: "The Chippy, Portree", cost: "£8-12pp", link: "https://www.google.com/search?q=The+Chippy+Portree" }
            },
            stops: [
                {
                    time: "07:30", title: "Old Man of Storr", icon: "hand-fist", loc: "IV51 9ST",
                    desc: "Dramatic basalt rock pinnacles rising from the ridge.",
                    duration: "2 hrs (return)", cost: "Free (parking £5)",
                    do: "Hike to pinnacle base. Kabir can spot faces in the rocks.",
                    eat: "Pack breakfast — eat at the viewpoint.",
                    famous: "Featured in Prometheus, The BFG, and countless adverts.",
                    legend: "The pinnacle is the petrified thumb of a buried giant.",
                    photoSpot: "📸 From below looking up through pinnacles. Morning mist is magical.",
                    hack: "Leave by 07:30 to beat tour buses. Car park full by 10 AM. Waterproof boots.",
                    link: "https://www.google.com/search?q=Old+Man+of+Storr"
                },
                {
                    time: "10:30", title: "Kilt Rock & Mealt Falls", icon: "binoculars", loc: "IV51 9JE",
                    desc: "Sea cliff with columnar basalt resembling a kilt pleat.",
                    duration: "20 min", cost: "Free",
                    do: "Watch waterfall drop 60m into the sea. Listen for the boom.",
                    famous: "One of Skye's most visited viewpoints.",
                    photoSpot: "📸 From fenced viewpoint. Waterfall left, kilt columns right.",
                    hack: "Quick stop — max 20 min. No facilities.",
                    link: "https://www.google.com/search?q=Kilt+Rock+Skye"
                },
                {
                    time: "11:30", title: "Quiraing", icon: "mountain", loc: "IV51 9LA",
                    desc: "Otherworldly landscape of landslip pinnacles and hidden plateaus.",
                    duration: "1.5 hrs (short loop)", cost: "Free",
                    do: "Short loop to The Table — hidden flat meadow. Mind Kabir on edges.",
                    famous: "Used as Viking landscapes in films.",
                    legend: "Locals hid cattle from Viking raiders — plateau invisible from below.",
                    photoSpot: "📸 'The Needle' from path above. Best in morning side-light.",
                    hack: "Road parking only — before 10 AM or after 3 PM. VERY windy — hold Kabir's hand.",
                    link: "https://www.google.com/search?q=Quiraing+hike+Skye"
                },
                {
                    time: "14:30", title: "Fairy Glen", icon: "sparkles", loc: "IV51 9XU",
                    desc: "Miniature magical landscape of cone-shaped hills.",
                    duration: "45 min", cost: "Free",
                    do: "Climb Castle Ewen (biggest cone). Let Kabir lead the expedition.",
                    famous: "Looks like a hobbit village. Named by locals who believed fairies shaped hills.",
                    legend: "Move the stone circles = bad luck for 7 years.",
                    photoSpot: "📸 Top of Castle Ewen looking down at spiral patterns. Wide angle.",
                    hack: "Single track road. Don't move/stack stones — locals are protective.",
                    link: "https://www.google.com/search?q=Fairy+Glen+Skye"
                }
            ]
        },
        {
            day: 4, date: "May 1", title: "Beauty & Sand",
            route: "Skye → Beauly",
            hotel: "Gruinard Guest House",
            hotelLink: "https://www.booking.com/hotel/gb/gruinard-guest-house.html",
            hotelLoc: "IV4 7AD",
            grocery: "Tesco/Aldi Inverness", groceryLoc: "IV2 7GD",
            driving: { km: 190, time: "3h 10m", warnings: "A87 scenic but twisty. A82 along Loch Ness is narrow.", fuelStop: "Invergarry or Inverness — skip Skye prices" },
            meals: {
                breakfast: { name: "Hostel / Broadford Bakery", cost: "£4-8pp", link: "https://www.google.com/search?q=Broadford+Bakery+Skye" },
                lunch: { name: "Old Inn, Carbost", cost: "£10-14pp", link: "https://www.google.com/search?q=Old+Inn+Carbost+Skye" },
                dinner: { name: "Corner on the Square, Beauly", cost: "£12-18pp", link: "https://www.google.com/search?q=Corner+on+the+Square+Beauly" }
            },
            stops: [
                {
                    time: "09:30", title: "Fairy Pools", icon: "droplet", loc: "IV47 8SW",
                    desc: "Crystal-clear blue pools fed by waterfalls from the Cuillins.",
                    duration: "1.5 hrs", cost: "Free (parking £5)",
                    do: "Walk along river. Kabir can throw pebbles. Water is 6°C — feet dip only!",
                    famous: "Most Instagrammed location in Scotland. Caribbean blue on sunny days.",
                    photoSpot: "📸 Third pool has best waterfall backdrop. Low angle, include Cuillins.",
                    hack: "Before 10 AM. Rocky, wet path — proper shoes. Buggy impossible.",
                    link: "https://www.google.com/search?q=Fairy+Pools+Skye"
                },
                {
                    time: "12:00", title: "Sligachan Bridge", icon: "bridge", loc: "IV47 8SW",
                    desc: "Old stone bridge with Cuillin backdrop.",
                    duration: "30 min", cost: "Free",
                    do: "Dip face in river for 7 seconds — legend says eternal beauty.",
                    famous: "Gateway to Black Cuillins. Most painted bridge in Scotland.",
                    legend: "Fairy queen promised eternal beauty to anyone brave enough to dip face 7 seconds in the freezing water.",
                    photoSpot: "📸 Low angle from riverbank, bridge centred, Cuillins behind.",
                    hack: "Sligachan Hotel pub serves good food.",
                    link: "https://www.google.com/search?q=Sligachan+Bridge+legend"
                },
                {
                    time: "13:30", title: "Talisker Bay", icon: "magnet", loc: "IV47 8SF",
                    desc: "Remote bay with magnetic black sand and dramatic sea stack.",
                    duration: "1.5 hrs", cost: "Free",
                    do: "Bring a magnet to see sand jump! Walk to waterfall at far end.",
                    eat: "Old Inn pub in Carbost, 5 min drive.",
                    famous: "Black sand contains magnetite. One of Skye's most dramatic beaches.",
                    photoSpot: "📸 Waterfall at north end, sea stack background. Sunset is extraordinary.",
                    hack: "20 min flat walk. Boggy after rain — wellies ideal.",
                    link: "https://www.google.com/search?q=Talisker+Bay+magnetic+sand"
                }
            ]
        },
        {
            day: 5, date: "May 2", title: "Monster Hunt",
            route: "Beauly → South Queensferry",
            hotel: "Premier Inn South Queensferry",
            hotelLink: "https://www.premierinn.com",
            hotelLoc: "EH30 9PP",
            grocery: "Lidl / Tesco S. Queensferry", groceryLoc: "EH30 9QZ",
            driving: { km: 270, time: "3h 40m", warnings: "A9 busy. Speed cameras. M90 smooth.", fuelStop: "Tesco Inverness or Kinross services" },
            meals: {
                breakfast: { name: "Gruinard Guest House (included)", cost: "Included", link: "" },
                lunch: { name: "Loch Ness Inn, Drumnadrochit", cost: "£10-14pp", link: "https://www.google.com/search?q=Loch+Ness+Inn+Drumnadrochit" },
                dinner: { name: "Beefeater S. Queensferry (kids free)", cost: "£12-16pp", link: "https://www.google.com/search?q=Beefeater+South+Queensferry" }
            },
            stops: [
                {
                    time: "09:00", title: "Whin Park", icon: "train-subway", loc: "IV3 5SS",
                    desc: "Inverness family park with miniature railway.",
                    duration: "1 hr", cost: "Free (train £2)",
                    do: "Ride the Ness Islands Railway. Let Kabir drive the mini train.",
                    famous: "Best family park in the Highlands.",
                    photoSpot: "📸 Kabir on the train with river behind.",
                    hack: "Opens 10 AM. Ness Islands walk first if early — 20 min loop.",
                    link: "https://www.google.com/search?q=Whin+Park+Inverness"
                },
                {
                    time: "11:00", title: "Loch Ness Drive", icon: "dragon", loc: "A82",
                    desc: "The legendary monster loch — 37km long, deeper than the North Sea.",
                    duration: "1 hr drive + stops", cost: "Free",
                    do: "Stop at every layby. Binoculars for Kabir. Print Nessie-spotting certificate.",
                    eat: "Loch Ness Inn or Fiddler's, Drumnadrochit.",
                    famous: "Nessie first reported 565 AD by Saint Columba.",
                    legend: "More water than all lakes in England + Wales combined. Something COULD hide in there.",
                    photoSpot: "📸 Urquhart Castle layby — ruins across the dark loch.",
                    hack: "Skip Nessie museum (£9, underwhelming). Binoculars + imagination > museum.",
                    link: "https://www.google.com/search?q=Loch+Ness+facts+kids"
                },
                {
                    time: "13:00", title: "Urquhart Castle", icon: "chess-rook", loc: "IV63 6XJ",
                    desc: "Ruined castle on Loch Ness banks.",
                    duration: "1 hr", cost: "£12 adult / £7 child (under 5 free)",
                    do: "Climb Grant Tower. Watch trebuchet demo. Best Nessie spotting point.",
                    famous: "Most visited castle in the Highlands.",
                    photoSpot: "📸 From Grant Tower looking down at the loch.",
                    hack: "Explorer Pass saves 20%. Pre-book online. Café expensive — eat in Drumnadrochit.",
                    link: "https://www.google.com/search?q=Urquhart+Castle"
                }
            ]
        },
        {
            day: 6, date: "May 3", title: "Edinburgh Capital",
            route: "South Queensferry → Edinburgh",
            hotel: "Premier Inn South Queensferry",
            hotelLink: "https://www.premierinn.com",
            hotelLoc: "EH30 9PP",
            grocery: "Lidl Nicolson St", groceryLoc: "EH8 9EW",
            driving: { km: 25, time: "30 min", warnings: "Edinburgh parking expensive. Park & ride or bus from Queensferry.", fuelStop: "Queensferry — fill for tomorrow" },
            meals: {
                breakfast: { name: "Premier Inn (included)", cost: "Included", link: "" },
                lunch: { name: "Oink, Victoria St", cost: "£5-7pp", link: "https://www.google.com/search?q=Oink+Edinburgh" },
                dinner: { name: "Mother India, Nicolson St", cost: "£10-15pp", link: "https://www.google.com/search?q=Mother+India+Edinburgh" }
            },
            stops: [
                {
                    time: "09:30", title: "Forth Bridges Viewpoint", icon: "bridge", loc: "EH30 9PP",
                    desc: "Three engineering marvels spanning 140 years side by side.",
                    duration: "20 min", cost: "Free",
                    do: "Count three bridges with Kabir — rail (1890), road (1964), new (2017).",
                    famous: "Forth Bridge (1890) is UNESCO World Heritage. Painting takes 4 years.",
                    photoSpot: "📸 From harbour path — all three bridges in one frame. Morning light.",
                    link: "https://www.google.com/search?q=Forth+Bridges+viewpoint"
                },
                {
                    time: "10:30", title: "National Museum of Scotland", icon: "building-columns", loc: "EH1 1JF",
                    desc: "World-class museum — dinosaurs, space, Scottish history, all FREE.",
                    duration: "2-3 hrs", cost: "FREE",
                    do: "See Dolly the Sheep, Millennium Clock, rooftop terrace. Science floor = Kabir-perfect.",
                    eat: "Museum café pricey. Oink on Victoria St (5 min) is better.",
                    famous: "Top-rated family attraction in Scotland. Home to Dolly the cloned sheep.",
                    photoSpot: "📸 Grand Gallery atrium — look up. Rooftop for castle view.",
                    hack: "Start TOP floor, work down — everyone goes up, you beat crowds.",
                    link: "https://www.google.com/search?q=National+Museum+Scotland"
                },
                {
                    time: "14:00", title: "Royal Mile & Castle View", icon: "landmark", loc: "EH1 2PB",
                    desc: "Historic spine of Edinburgh's Old Town.",
                    duration: "1.5 hrs", cost: "Free (Castle £19.50 — skip if tight)",
                    do: "Walk downhill castle to Holyrood. Find Heart of Midlothian mosaic — spit on it for luck.",
                    famous: "Closes (alleyways) hide secret courtyards and ghost stories.",
                    legend: "Mary King's Close sealed with plague victims inside. Now a tour.",
                    photoSpot: "📸 Castle from Grassmarket. Victoria Street curve. Scott Monument from Princes St.",
                    hack: "Skip paying for Castle — views from outside are 90% of the experience.",
                    link: "https://www.google.com/search?q=Royal+Mile+Edinburgh"
                },
                {
                    time: "16:00", title: "Victoria Street — Diagon Alley", icon: "wand-magic", loc: "EH1 2JW",
                    desc: "Curved colourful street — inspiration for Diagon Alley.",
                    duration: "30 min", cost: "Free",
                    do: "Tell Kabir this is where wizards shop. Joke shop + Harry Potter store.",
                    famous: "JK Rowling wrote Harry Potter in Edinburgh. This street inspired Diagon Alley.",
                    photoSpot: "📸 From top looking down the curve. Shopfronts pop in any light.",
                    hack: "Harry Potter shop is a tourist trap. Joke shop next door is more fun and cheaper.",
                    link: "https://www.google.com/search?q=Victoria+Street+Edinburgh"
                },
                {
                    time: "18:00", title: "Farewell Curry", icon: "bowl-food", loc: "Nicolson St",
                    desc: "Edinburgh's curry corridor — best Indian food in Scotland.",
                    duration: "1.5 hrs", cost: "£10-15pp",
                    do: "Mother India (home-style) or Kismot (adventurous). Both have kids menus.",
                    famous: "Edinburgh = best Indian food in UK outside London.",
                    hack: "Pre-Theatre menu before 6 PM saves 30%. Book online.",
                    link: "https://www.google.com/search?q=best+indian+Edinburgh"
                }
            ]
        },
        {
            day: 7, date: "May 4", title: "Departure Day",
            route: "Queensferry → EDI Airport → Home",
            hotel: "End of Trip ✈️", hotelLink: "#", hotelLoc: "EDI",
            grocery: "M&S Airport", groceryLoc: "EH12 9DN",
            driving: { km: 15, time: "20 min", warnings: "Return rental with full tank.", fuelStop: "Queensferry Tesco — fill before airport" },
            meals: {
                breakfast: { name: "Premier Inn (included)", cost: "Included", link: "" },
                lunch: { name: "Airport Wetherspoons", cost: "£8-12pp", link: "https://www.google.com/search?q=Edinburgh+Airport+food" },
                dinner: { name: "Home 🏠", cost: "Free!", link: "" }
            },
            stops: [
                {
                    time: "08:00", title: "Queensferry Morning Walk", icon: "person-walking", loc: "EH30 9PP",
                    desc: "Final morning — harbour walk with bridge views.",
                    duration: "30 min", cost: "Free",
                    do: "Coffee from harbour café. One last bridge photo.",
                    photoSpot: "📸 Forth Rail Bridge from harbour at sunrise. Red paint glows.",
                    link: "https://www.google.com/search?q=South+Queensferry+harbour"
                },
                {
                    time: "10:00", title: "Rental Return & Fly", icon: "car-side", loc: "EDI Airport",
                    desc: "Return car and check in.",
                    duration: "1 hr", cost: "Pre-paid",
                    hack: "Fill fuel in Queensferry BEFORE airport — 20p more at airport. Photo mileage + fuel gauge before handing back.",
                    link: "https://www.google.com/search?q=Edinburgh+Airport+Departures"
                }
            ]
        }
    ]
};
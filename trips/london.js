window.TRIPS = window.TRIPS || {};

window.TRIPS.london = {
    id: "london",
    name: "London",
    emoji: "🇬🇧",
    subtitle: "The No-Pay Family Adventure",
    dates: "Apr 25 – Apr 28, 2026",
    gradient: "red",

    emergency: {
        numbers: [
            { label: "Police / Fire / Ambulance", value: "999", icon: "phone" },
            { label: "Non-Emergency Police", value: "101", icon: "shield" },
            { label: "NHS 111", value: "111", icon: "heart-pulse" },
            { label: "TfL Traveller Info", value: "0343 222 1234", icon: "train" }
        ],
        hospitals: [
            { name: "University College Hospital", loc: "NW1 2BU", phone: "020 3456 7890" },
            { name: "St Thomas' Hospital, Westminster", loc: "SE1 7EH", phone: "020 7188 7188" },
            { name: "Royal London Hospital, Whitechapel", loc: "E1 1FR", phone: "020 7377 7000" },
            { name: "Princess Alexandra Hospital, Harlow", loc: "CM20 1QX", phone: "01279 444455" }
        ],
        apps: ["Citymapper", "TfL Go", "what3words", "Google Maps (offline)", "Trainline"]
    },

    hacks: [
        { icon: "🧒", title: "Under-5s Travel FREE", text: "Kabir travels 100% free on all Tube, Bus, and DLR. Walk through the wide luggage gates (green arrow) with him." },
        { icon: "🏙️", title: "Free London Views", text: "Skip London Eye (£30+). Horizon 22 at 22 Bishopsgate is FREE and higher than the Shard. Book tickets NOW at horizon22.co.uk — slots go Monday mornings." },
        { icon: "💧", title: "Free Water", text: "London tap water is safe and great. Don't buy bottles (£2.50 each). Bring a reusable bottle — look for 'Refill London' stickers." },
        { icon: "🚻", title: "Free Toilets", text: "Clean free loos: John Lewis, Marks & Spencer, museum lobbies, major train stations." },
        { icon: "🚌", title: "Bus Sightseeing Hack", text: "Skip £35 hop-on hop-off tours. Bus Route 11 or 15 passes every landmark for £1.75." },
        { icon: "💳", title: "Contactless Daily Cap", text: "Use contactless bank card on Tube/Bus. Daily cap £8.10 — never pay more no matter how many trips." },
        { icon: "🎭", title: "TKTS Half-Price Theatre", text: "Same-day half-price West End tickets at TKTS booth, Leicester Square. Only use the official booth." },
        { icon: "🥚", title: "Eggetarian London", text: "London has exceptional eggetarian dining. Dishoom, Hoppers, Bao, Crosstown and Borough Market are all outstanding. Book Hoppers walk-in slots by arriving at 12:30 for best chance." }
    ],

    days: [
        {
            day: 1, date: "Apr 25", title: "Wizards, Guards & Riverside Lights",
            route: "Amsterdam → Stansted → King's Cross → Westminster → South Bank",
            hotel: "Hotel Nirvana, Stratford",
            hotelLink: "https://www.google.com/search?q=Hotel+Nirvana+London+Stratford",
            hotelLoc: "E15 4LY",
            grocery: "Tesco Express, Stratford",
            groceryLoc: "E15 1XQ",
            transit: {
                lines: "Stansted Express → Central Line → District/Circle",
                cost: "Daily cap £8.10 · Kabir FREE",
                tips: "Use contactless card at barriers. Wide luggage gates (green arrow) for Kabir. Book Stansted Express online for cheapest fare."
            },
            meals: {
                breakfast: [
                    { name: "Flight / Packed", cost: "—", tag: "✈️ En Route", desc: "Eat before or on the flight. Save appetite for lunch at King's Cross.", link: "" }
                ],
                lunch: [
                    { name: "Dishoom, King's Cross", cost: "£15-20pp", tag: "🌟 Must Visit", desc: "Bombay-inspired Indian café. Kejriwal (fried eggs on toast) is eggetarian gold. Canal-side terrace at Granary Square.", link: "https://www.dishoom.com/kings-cross/" },
                    { name: "Caravan, Coal Drops Yard", cost: "£12-16pp", tag: "🔥 Trendy", desc: "Roastery café 2 mins from Dishoom. Excellent shakshuka & house coffee. Very Instagrammable.", link: "https://www.caravan.co.uk/" },
                    { name: "Notes on a Banana", cost: "£8-12pp", tag: "💰 Best Value", desc: "Relaxed café near King's Cross. Brilliant eggs, sourdough, great coffee. Child-friendly.", link: "https://notesonabanana.com/" }
                ],
                dessert: [
                    { name: "Crosstown Doughnuts, Coal Drops Yard", cost: "£4-5 each", tag: "🍩 Instagrammable", desc: "Artisan doughnuts with wild flavours. All vegetarian. Kabir will want at least two.", link: "https://www.crosstowndoughnuts.com/" }
                ],
                dinner: [
                    { name: "Bao, Broadgate", cost: "£12-16pp", tag: "🔥 Trending", desc: "Cult Taiwanese bao near Liverpool Street. Truffle egg bao & aged egg custard bao are eggetarian wins.", link: "https://www.baolondon.com/" },
                    { name: "Wagamama, Westfield Stratford", cost: "£10-14pp", tag: "💰 Best Value", desc: "Right at your hotel's doorstep. Ramen, pad thai, gyoza. Kabir-friendly portions.", link: "https://www.wagamama.com/" },
                    { name: "Namo, Westfield Stratford", cost: "£10-14pp", tag: "⚡ Quick Bite", desc: "Vietnamese street food. Brilliant veggie pho & summer rolls. Easy after a long day.", link: "https://www.namo.co.uk/" }
                ]
            },
            stops: [
                {
                    time: "07:20", title: "Land at London Stansted", icon: "plane-arrival", loc: "CM24 1QW",
                    desc: "Flight from Amsterdam (AMS 07:20 → STN 07:25 arrival). Immigration queue + stroller collection from baggage carousel (~15-20 min for Dutch passport).",
                    duration: "20 min (immigration + baggage)", cost: "—",
                    hack: "Dutch passport = fast-track EU queue. Collect stroller from baggage carousel.",
                    link: "https://www.stanstedexpress.com/"
                },
                {
                    time: "07:50", title: "National Express Bus — Stansted → Liverpool Street", icon: "bus", loc: "CM24 1QW",
                    desc: "Board National Express A6 bus from Stansted coach terminal. Direct to Liverpool Street Station (East London), close to King's Cross.",
                    duration: "70 min", cost: "~£12 adult (Kabir FREE)",
                    do: "Stroller goes in luggage hold. Easy with bags. Kabir can rest on the bus.",
                    hack: "Book online at nationalexpress.com for discounts. Runs every 30 mins. Arrive at Liverpool Street ~09:00.",
                    link: "https://www.nationalexpress.com/"
                },
                {
                    time: "09:00", title: "Arrive Liverpool Street Station", icon: "train", loc: "EC2M 7QN",
                    desc: "National Express arrives at Liverpool Street Coach Station. Collect stroller from baggage hold. Grab stroller & bags, head to tube.",
                    duration: "10 min", cost: "—",
                    do: "Exit coach station, walk to Liverpool Street tube entrance (same building, clearly marked).",
                    hack: "Toilets available at station. Use before heading to King's Cross.",
                    link: ""
                },
                {
                    time: "09:15", title: "Tube: Liverpool Street → King's Cross", icon: "train", loc: "N1C 4AA",
                    desc: "Red Central Line, 1 stop (5 minutes). Liverpool Street to King's Cross St Pancras. Easy with stroller — lifts available.",
                    duration: "15 min", cost: "Capped in daily £8.10",
                    do: "Use lifts (not stairs). Tap contactless card. Kabir travels free.",
                    hack: "Morning = not too crowded. Lifts are clearly marked.",
                    link: ""
                },
                {
                    time: "09:30", title: "Platform 9¾ at King's Cross", icon: "wand-magic", loc: "N1C 4QP",
                    desc: "The famous Harry Potter trolley pushed through the wall. Platform 9 & 10 at King's Cross Station. Leave luggage & stroller with spouse, or use station left luggage (£10-15).",
                    duration: "45 min", cost: "Free (photo) — £15 optional official photo",
                    do: "Queue for the trolley photo. Let Kabir 'push' through the wall. Browse Ollivander's shop with wands & robes.",
                    photoSpot: "📸 Inside the shop looks like Ollivander's — better photos than the trolley queue.",
                    hack: "Skip the official £15 photo. Use your phone for free. Or: one adult + Kabir can queue while spouse watches luggage.",
                    link: "https://www.google.com/maps/search/Platform+9+3/4+King%27s+Cross"
                },
                {
                    time: "10:15", title: "Lunch & Dessert at Granary Square", icon: "utensils", loc: "N1C 4AA",
                    desc: "Pick a lunch spot (Dishoom, Caravan, or Notes). Granary Square is scenic with fountains — perfect for post-lunch rest.",
                    duration: "1 hr", cost: "£10-20pp",
                    eat: "See meal options above. Walk-in at 10:15 = no queue.",
                    photoSpot: "📸 Granary Square fountains with Kabir.",
                    hack: "After lunch, collect luggage/stroller. Kabir will be tired — sit by fountains, let him rest.",
                    link: "https://www.google.com/maps/search/Granary+Square+King%27s+Cross"
                },
                {
                    time: "11:30", title: "Tube: King's Cross → Hotel Nirvana Drop-off", icon: "suitcase-rolling", loc: "E15 4LY",
                    desc: "Red Central Line back to Stratford (30 min). Hotel Nirvana is 2 mins walk from Stratford tube station.",
                    duration: "45 min (inc. walk)", cost: "Capped in daily £8.10",
                    do: "Exit Stratford tube, follow signs to Hotel Nirvana. Easy walk with stroller.",
                    hack: "Hotel might not have early check-in (usually 14:00-15:00). Use left luggage service, freshen up in bathroom, then leave stroller/bags.",
                    link: ""
                },
                {
                    time: "12:15", title: "Hotel Nirvana — Drop Luggage & Stroller", icon: "bed", loc: "E15 4LY",
                    desc: "Arrive at hotel. Check if early check-in available. If not, use left luggage (most hotels offer this free). Leave stroller here.",
                    duration: "30 min", cost: "Pre-paid",
                    do: "Freshen up. Use bathroom. Change Kabir's clothes if needed. Leave luggage/stroller with hotel.",
                    hack: "Hotel should hold luggage until official check-in (14:00-15:00). Confirm on arrival.",
                    link: "https://www.google.com/maps/search/Hotel+Nirvana+Stratford+London"
                },
                {
                    time: "13:00", title: "Quick Lunch at Westfield Stratford", icon: "utensils", loc: "E15 1AZ",
                    desc: "Westfield shopping centre is 2 mins from hotel. Grab a quick lunch (Wagamama, Namo, or others).",
                    duration: "45 min", cost: "£10-14pp",
                    eat: "Light lunch — you had breakfast at Granary Square. Keep it quick.",
                    hack: "Westfield has clean toilets & family facilities. Good place to rest briefly.",
                    link: ""
                },
                {
                    time: "14:00", title: "Diana Memorial Playground — Pirate Break", icon: "ship", loc: "W2 4RU",
                    desc: "Giant wooden pirate ship, sand pit, teepees, water features. West side of London (Kensington Gardens). Tube from Stratford: Central → District Line (30 min).",
                    duration: "1.5 hrs", cost: "Free",
                    do: "Let Kabir captain the pirate ship. Play in the sand & teepees. Burn travel energy. Perfect recharge after morning activity.",
                    hack: "Arrive at 14:00 = less crowded. Bring a change of clothes — kids love the water features.",
                    link: "https://www.royalparks.org.uk/parks/kensington-gardens/things-to-see-and-do/diana-memorial-playground"
                },
                {
                    time: "15:45", title: "Tube: Diana Playground → Westminster", icon: "train", loc: "SW1A 0AA",
                    desc: "Head east to Westminster. District/Circle line from Kensington area (20 min).",
                    duration: "25 min", cost: "Capped in daily £8.10",
                    do: "Freshen up at a café before Westminster stop if needed.",
                    link: ""
                },
                {
                    time: "16:15", title: "Westminster Bridge & Big Ben", icon: "landmark", loc: "SW1A 0AA",
                    desc: "Walk across Westminster Bridge. See Houses of Parliament & Elizabeth Tower (Big Ben = the bell) from the riverside path. Golden hour light for photos.",
                    duration: "1 hr", cost: "Free",
                    do: "Walk the full bridge. Stop midway for 'Big Ben + London Eye' photo. Tell Kabir the bells ring every 15 minutes.",
                    photoSpot: "📸 Midway on Westminster Bridge — Big Ben + London Eye + Thames in one shot. Late afternoon light is perfect.",
                    famous: "Big Ben is the 13.7-ton bell inside. The tower is Elizabeth Tower (renamed 2022).",
                    legend: "Clock tower completed 1859. Stopped only a handful of times in 160+ years.",
                    link: "https://www.google.com/maps/search/Westminster+Bridge+London"
                },
                {
                    time: "17:15", title: "South Bank — Street Performers & Sunset", icon: "person-walking", loc: "SE1 8XX",
                    desc: "Walk along Queen's Walk from Westminster Bridge (or tube to Waterloo). Street performers, carousel, London Eye lights up at dusk.",
                    duration: "2.5 hrs", cost: "Free",
                    do: "Watch performers. Spot carousel. See London Eye light up in neon as sun sets. Sit by Thames, relax.",
                    photoSpot: "📸 Golden hour from Waterloo Bridge — Thames + skyline stunning. Night lights (19:00+) are magical.",
                    hack: "Royal Festival Hall has clean free toilets. Good place to rest if Kabir is tired.",
                    link: "https://www.google.com/maps/search/South+Bank+London"
                },
                {
                    time: "19:45", title: "Dinner — Near Stratford Hotel", icon: "utensils", loc: "E15",
                    desc: "Return to Stratford area (tube from Waterloo, 30 min). Pick dinner: Bao (nearby Broadgate), Wagamama (Westfield), or Namo (Westfield).",
                    duration: "1.5 hrs", cost: "£10-20pp",
                    eat: "See dinner options. Wagamama/Namo at hotel = easiest after long day.",
                    hack: "Kabir will be tired. Keep dinner near hotel. Early night.",
                    link: ""
                },
                {
                    time: "21:15", title: "Hotel Check-in & Rest", icon: "bed", loc: "E15 4LY",
                    desc: "Return to Hotel Nirvana. Official check-in (luggage already left). Shower, rest, prepare for Day 2.",
                    duration: "Night", cost: "Pre-paid",
                    do: "Early night. Kabir will be exhausted from travel + sightseeing. Sleep by 22:00.",
                    hack: "This was a LONG Day 1. Expect Kabir to be tired. Day 2 can start more leisurely.",
                    link: ""
                }
            ]
        },

        {
            day: 2, date: "Apr 26", title: "Covent Garden, Toys & West End Lights",
            route: "Stratford → Covent Garden → Soho → Piccadilly → Stratford",
            hotel: "Hotel Nirvana, Stratford",
            hotelLink: "https://www.google.com/search?q=Hotel+Nirvana+London+Stratford",
            hotelLoc: "E15 4LY",
            grocery: "Waitrose, Soho",
            groceryLoc: "W1D 4RB",
            transit: {
                lines: "Central Line (Stay WEST of Thames — Marathon Day avoidance)",
                cost: "Daily cap £8.10",
                tips: "London Marathon runs through East & South London today. Stay in West End / Covent Garden / Soho. Avoid everything east of the Thames except your hotel."
            },
            meals: {
                breakfast: [
                    { name: "Eggbreak, Notting Hill", cost: "£12-18pp", tag: "🥚 Egg Specialist", desc: "Trendy basement café. Every dish features eggs. Perfect for eggetarians. Great for a leisurely start.", link: "https://eggbreak.com/" },
                    { name: "The Breakfast Club, Soho", cost: "£12-15pp", tag: "🥞 Fun Vibes", desc: "80s decor, massive pancake stacks. Cult favourite with kids. Arrive before 10:00 to avoid queues.", link: "https://thebreakfastclubcafes.com/" },
                    { name: "Covent Garden Piazza Cafés", cost: "£8-14pp", tag: "☀️ Outdoor Seating", desc: "Street-level cafés with views of performers. Casual, fun. Great for people-watching.", link: "" }
                ],
                lunch: [
                    { name: "Covent Garden Market Stalls", cost: "£10-15pp", tag: "🎭 Social", desc: "Graze at multiple stalls. Food vendors, crepe makers, artisan snacks. Interactive for kids.", link: "https://www.coventgardenmarket.com/" },
                    { name: "Hoppers, Soho", cost: "£15-18pp", tag: "🌟 Must Try", desc: "Sri Lankan street food. Egg hoppers & kottu roti are eggetarian magic. Arrive at 12:30 for walk-in slot.", link: "https://www.hoppersldn.com/" },
                    { name: "Canteen, Covent Garden", cost: "£10-16pp", tag: "🇬🇧 British Comfort", desc: "Simple British café. Egg dishes, soups, salads. Very child-friendly & relaxed.", link: "https://www.canteen.co.uk/" }
                ],
                dessert: [
                    { name: "Chin Chin Labs, Soho", cost: "£7-9", tag: "🧪 Sci-Fi Treats", desc: "Ice cream made with liquid nitrogen. Dramatic smoke effects. Kabir will be mesmerised.", link: "https://www.chinchincreamery.com/" },
                    { name: "Lick My Spoon, Covent Garden", cost: "£6-8", tag: "🍦 Trendy", desc: "Handmade ice cream, gelato. Wild flavours. Very photogenic." , link: "" },
                    { name: "Modernist Cuisine, Soho", cost: "£8-12", tag: "🎨 Artistic", desc: "Innovative desserts & cocktails for adults. Quirky, fun vibe.", link: "" }
                ],
                dinner: [
                    { name: "Speedy Bunny, Chinatown", cost: "£10-15pp", tag: "🥢 Instagram Famous", desc: "Veggie noodles & soft egg buns. Trendy basement spot. Very popular — expect queue.", link: "https://www.speedybunny.com/" },
                    { name: "Mildreds, Soho", cost: "£15-20pp", tag: "🌿 Veggie Legend", desc: "Gold standard for vegetarian soul food. Vibrant, packed, full of energy.", link: "https://www.mildreds.co.uk/" },
                    { name: "Jing Fong, Chinatown", cost: "£12-18pp", tag: "🥡 Dim Sum Fun", desc: "Trolley dim sum. Point & order. Chaotic, fun, great for families. Go early (17:00) to beat crowds.", link: "" }
                ]
            },
            stops: [
                {
                    time: "09:00", title: "Breakfast", icon: "croissant", loc: "W1D",
                    desc: "Pick one of the breakfast spots above. Eggbreak in Notting Hill (if you tube there early), The Breakfast Club in Soho, or a café in Covent Garden.",
                    duration: "1 hr", cost: "£10-15pp",
                    do: "Leisurely breakfast. Don't rush — you have all day in West London.",
                    hack: "The Breakfast Club gets busy by 10:00. Go early or expect a queue.",
                    link: ""
                },
                {
                    time: "10:00", title: "Covent Garden — Market & Street Performers", icon: "masks-theater", loc: "WC2E 8RF",
                    desc: "The historic piazza. Live street performers (musicians, acrobats, artists). Market stalls with crafts, vintage, food. Very photogenic & interactive for Kabir.",
                    duration: "2 hrs", cost: "Free entry (budget for stalls/lunch £10-15)",
                    do: "Watch performers. Browse market stalls. Let Kabir soak in the energy. Grab lunch at one of the stalls or sit at a café overlooking the piazza.",
                    photoSpot: "📸 The colonnade arcades around the piazza. Performers mid-act. Kabir watching street artists.",
                    famous: "Famous for buskers and performers. Once a fruit & vegetable market (1600s), now a cultural hub.",
                    hack: "Avoid Saturday afternoons (too crowded). Weekday late mornings are perfect.",
                    link: "https://www.google.com/maps/search/Covent+Garden+London"
                },
                {
                    time: "12:30", title: "Lunch at Covent Garden or Chinatown", icon: "utensils", loc: "WC2E 8RF",
                    desc: "Graze at market stalls OR walk 10 mins to Chinatown (Soho) for Hoppers or structured meal.",
                    duration: "1.5 hrs", cost: "£10-18pp",
                    eat: "See lunch options above.",
                    hack: "Hoppers takes walk-ins at 12:30. Go exactly at 12:30 to get in.",
                    link: ""
                },
                {
                    time: "15:00", title: "Hamleys — 7-Floor Toy Paradise", icon: "rocket", loc: "W1B 5BT",
                    desc: "London's most famous toy store. 7 floors. Live demonstrations, magic shows, staff doing tricks.",
                    duration: "2 hrs", cost: "Free entry",
                    do: "Explore each floor. Watch staff demos. Let Kabir pick one small toy (or look, no buy — your choice).",
                    photoSpot: "📸 LEGO structures on the top floor. Kabir's face at the toy displays.",
                    hack: "Use elevators to go to the top floor first, walk down. Less crowded at top.",
                    link: "https://www.google.com/maps/search/Hamleys+London"
                },
                {
                    time: "17:00", title: "Explore West End — Soho & Piccadilly", icon: "lightbulb", loc: "W1D 7ET",
                    desc: "Walk through Soho's colourful streets. Browse vintage shops, quirky cafés. Head to Piccadilly for neon lights & energy.",
                    duration: "1.5 hrs", cost: "Free",
                    do: "Wander. Window shop. Feel the energy of London's entertainment district. See the massive 3D screens at Piccadilly Circus.",
                    photoSpot: "📸 The steps under the Eros statue at Piccadilly Circus — neon background at dusk.",
                    legend: "Piccadilly's screens have only ever been turned off for funerals of Churchill & Princess Diana.",
                    link: "https://www.google.com/maps/search/Piccadilly+Circus+London"
                },
                {
                    time: "19:00", title: "Dinner — West End or Chinatown", icon: "utensils", loc: "W1D",
                    desc: "Pick from Speedy Bunny (trendy), Mildreds (veggie legend), or Jing Fong (dim sum fun). All in Soho/Chinatown area.",
                    duration: "1.5 hrs", cost: "£12-20pp",
                    eat: "See dinner options above.",
                    hack: "Jing Fong is chaotic & fun — go early (17:00) for less queue. Mildreds always busy — book ahead or expect wait. Speedy Bunny is Instagram-famous — arrive before 19:00.",
                    link: ""
                },
                {
                    time: "20:30", title: "Night Walk — West End Lights", icon: "moon", loc: "W1D 7ET",
                    desc: "Walk through Soho, Leicester Square, Shaftesbury Avenue after dark. See the neon signs, theatre marquees, street life at night.",
                    duration: "1 hr", cost: "Free",
                    do: "Soak in the evening energy. Stop for dessert (see options above). Watch the city light up.",
                    photoSpot: "📸 Soho neon signs. Leicester Square theatre lights. Shaftesbury Avenue after dark.",
                    hack: "Bring a camera/phone charged. Night photography is stunning in the West End.",
                    link: ""
                },
                {
                    time: "21:30", title: "Late Dessert — Extend the Evening", icon: "ice-cream", loc: "W1D",
                    desc: "Chin Chin Labs (liquid nitrogen ice cream), Lick My Spoon (artisan gelato), or any café. Wind down with something sweet.",
                    duration: "1 hr", cost: "£6-10",
                    eat: "See dessert options above.",
                    hack: "Chin Chin Labs is popular — go at 21:30 to avoid crowds. Perfect way to end Day 2.",
                    link: ""
                },
                {
                    time: "23:00", title: "Tube Back to Hotel", icon: "train", loc: "E15",
                    desc: "Central Line back to Stratford. Hotel Nirvana is 2 mins walk from station.",
                    duration: "45 min", cost: "Capped in daily £8.10",
                    hack: "Night Tube runs on Central Line after midnight. You'll be fine.",
                    link: ""
                }
            ]
        },

        {
            day: 3, date: "Apr 27", title: "Royal Guards, Towers & Night Departure",
            route: "Stratford → Buckingham Palace → The City → Liverpool Street → Stansted",
            hotel: "Ramada London Stansted Airport",
            hotelLink: "https://www.google.com/search?q=Ramada+London+Stansted+Airport",
            hotelLoc: "CM24 1PP",
            grocery: "M&S Simply Food, Stansted",
            groceryLoc: "CM24 1QW",
            transit: {
                lines: "District/Circle Line → Elizabeth Line or Tube (Buckingham to City) → National Express A6 (19:30 departure)",
                cost: "Daily cap £8.10 + £12 National Express",
                tips: "Move EAST today (avoid Marathon residual congestion in South). Buckingham Palace → Westminster → Tower corridor is scenic on foot or tube."
            },
            meals: {
                breakfast: [
                    { name: "Feya, James Street", cost: "£15pp", tag: "🌸 Forest Vibe", desc: "Stunning floral decor, forest-like setting. Creative Egg & Avo menu. Arrive early.", link: "https://www.feya.co.uk/" },
                    { name: "Lantana, Fitzrovia", cost: "£14-18pp", tag: "🌍 Aussie Brunch", desc: "Australian café chain. Smashed avocado, poached eggs, exceptional coffee.", link: "https://www.lantanacafe.com/" },
                    { name: "Pump House Café, Embankment", cost: "£10-14pp", tag: "☀️ Riverside Views", desc: "Thames-side café. Simple, bright. Eggs on sourdough. Scenic spot.", link: "" }
                ],
                lunch: [
                    { name: "Borough Market — Grazing", cost: "£10-15pp", tag: "🍓 Iconic", desc: "London's oldest food market (1000+ years). Graze stalls: Horn OK Please, Bread Ahead custard doughnut, Kappacasein cheese toastie.", link: "https://www.boroughmarket.org.uk/" },
                    { name: "Leadenhall Market Cafés", cost: "£10-14pp", tag: "🏛️ Historic", desc: "Victorian covered market (Diagon Alley filming location). Multiple small cafés. Atmospheric & photo-worthy.", link: "https://www.google.com/maps/search/Leadenhall+Market" },
                    { name: "The Breakfast Club, Spitalfields", cost: "£12-15pp", tag: "🥞 Fun", desc: "Another location of the beloved café chain. Great for egg dishes & pancakes.", link: "https://thebreakfastclubcafes.com/" }
                ],
                dessert: [
                    { name: "Humble Crumble, Borough", cost: "£6-8", tag: "🍮 Trending", desc: "Artisan fruit crumbles with unlimited hot custard. TikTok-famous. Very photogenic.", link: "" },
                    { name: "Bread Ahead, Borough Market", cost: "£5-6", tag: "🥐 Legendary", desc: "The custard doughnut. Queue is worth it. One bite & you'll understand why.", link: "" },
                    { name: "Luperini Bros, Borough Market", cost: "£4-5", tag: "🍝 Italian", desc: "Freshly-made Italian pastries & gelato. Smaller queue than Bread Ahead.", link: "" }
                ],
                dinner: [
                    { name: "Holy Carrot, Spitalfields", cost: "£15-20pp", tag: "🥕 Trendy Veg", desc: "Warehouse setting. High-end vegetarian & egg dishes. Modern & lively. Near Liverpool Street.", link: "https://www.holycarrot.co.uk/" },
                    { name: "Dishoom, Shoreditch", cost: "£15-20pp", tag: "🌟 Must Visit", desc: "Second Dishoom location. Same quality as King's Cross. Good for last dinner in London.", link: "https://www.dishoom.com/" },
                    { name: "Poppies, Spitalfields", cost: "£12-16pp", tag: "🍟 Fish & Chips", desc: "Classic British fish & chips (with egg options). Retro diner vibe. Fun for families.", link: "https://www.poppiesfish.com/" }
                ]
            },
            stops: [
                {
                    time: "09:00", title: "Buckingham Palace — Arrive Early", icon: "crown", loc: "SW1A 1AA",
                    desc: "Arrive at 09:00 to secure a good spot for the Changing of the Guard ceremony at 11:00. Stand near the Victoria Memorial steps for elevated view.",
                    duration: "2.5 hrs (wait + ceremony)", cost: "Free",
                    do: "Arrive 2 hours early for a good spot. The ceremony is loud, colourful & Kabir will love the marching band & horses.",
                    photoSpot: "📸 From the Victoria Memorial steps — elevated view over the crowds. Ceremony at 11:00 is 30-40 mins.",
                    hack: "Check the official schedule the night before at householddivision.org. Ceremony times vary (Mon is 11:00, but confirm). Bring a small cushion for Kabir to sit on.",
                    famous: "The King's soldiers march with the full band. The ceremony has happened nearly every day for 250+ years.",
                    link: "https://www.google.com/maps/search/Buckingham+Palace+London"
                },
                {
                    time: "12:00", title: "Walk to Westminster via Green Park", icon: "person-walking", loc: "SW1A 2AA",
                    desc: "After ceremony, walk through Green Park towards Westminster (scenic, 20-25 min walk) or tube (5 min, cheaper). Soak in the park & riverside views.",
                    duration: "30 min", cost: "Free (walk) or £1.75 (tube capped)",
                    do: "Walk if weather is good — you'll see more of London. Green Park is beautiful & quiet. Otherwise, use the Tube.",
                    photoSpot: "📸 Green Park with Buckingham Palace in the distance. Thames at Westminster.",
                    hack: "Walking burns Kabir's energy — good preparation for long afternoon.",
                    link: ""
                },
                {
                    time: "12:30", title: "Tower of London — Royal History", icon: "chess-rook", loc: "EC3N 4AB",
                    desc: "1000-year-old fortress, prison, execution ground — the most dramatic building in London's history. Walk the public path around the walls (free) or pay to enter (£33).",
                    duration: "1 hr (outside) or 2 hrs (inside)", cost: "Free (outside) — £33 (enter)",
                    do: "Walk the public path around the walls. Spot Tower Ravens from the fence — six must always live here (by royal decree, if they leave the kingdom falls!). Tell Kabir about the two young princes imprisoned here in 1483 & never seen again.",
                    famous: "Home of Crown Jewels. Unsolved mystery: two princes disappeared here in 1483.",
                    legend: "Six ravens must always live here. Their wings are clipped — just in case.",
                    photoSpot: "📸 From river walkway with White Tower centred. Kabir at Traitors' Gate.",
                    hack: "Skip the £33 entry. The public path gives you 90% of the experience — castle, moat, ravens, all visible.",
                    link: "https://www.google.com/maps/search/Tower+of+London"
                },
                {
                    time: "13:30", title: "Tower Bridge — Walk Across", icon: "bridge", loc: "SE1 2UP",
                    desc: "London's most iconic bridge. Victorian engineering masterpiece. Pedestrian walkway is free & perfect for photos.",
                    duration: "30 min", cost: "Free (walkway)",
                    do: "Walk across the pedestrian level. Tell Kabir the bridge opens by splitting apart vertically (bascules) — has done so 800+ times a year.",
                    famous: "Most photographed bridge in the world. Completed 1894. Often confused with London Bridge (the boring flat one upstream).",
                    legend: "Original 1894 hydraulic engines inside the towers are still perfectly preserved & still used.",
                    photoSpot: "📸 From south bank (More London plaza) — Tower Bridge + Tower of London in one shot. Perfect.",
                    hack: "Glass floor walkway inside is £12 — skip it. Free pedestrian crossing has identical view.",
                    link: "https://www.google.com/maps/search/Tower+Bridge+London"
                },
                {
                    time: "14:30", title: "Horizon 22 — Highest Free View", icon: "binoculars", loc: "EC2N 4BQ",
                    desc: "58th floor of 22 Bishopsgate. London's highest FREE viewing platform — higher than the Shard. Panoramic 360° views. 5-min walk from Tower Bridge.",
                    duration: "1 hr", cost: "FREE (must pre-book at horizon22.co.uk)",
                    do: "Book tickets in advance! Look south — you're looking DOWN on the Shard. Find Tower Bridge (you just walked it). Spot the Gherkin, Walkie-Talkie, St Paul's Cathedral.",
                    famous: "At 278m, London's highest free public viewing platform. The Shard charges £30.",
                    photoSpot: "📸 Thames snaking through the city. Looking down on the Shard from above. Kabir's face at the glass floor-to-ceiling windows.",
                    hack: "Book tickets at horizon22.co.uk — released every Monday for next 14 days. Sunday closes at 4 PM, so your 14:30 slot is perfect for Apr 27 (Sunday). Entrance via separate doors on Bishopsgate — look for signage.",
                    link: "https://horizon22.co.uk/book"
                },
                {
                    time: "15:30", title: "Leadenhall Market — Diagon Alley", icon: "wand-magic-sparkles", loc: "EC3V 1LT",
                    desc: "Victorian covered market — the REAL Diagon Alley filming location from Harry Potter. 5 mins walk from Horizon 22.",
                    duration: "45 min", cost: "Free",
                    do: "Find the blue optician's door at 42 Bull's Head Passage — that's the Leaky Cauldron entrance! Tell Kabir he's walking through Diagon Alley. Browse the vintage shops & cafés.",
                    famous: "Used as Diagon Alley in Harry Potter: Philosopher's Stone. Victorian ironwork painted in burgundy & gold.",
                    legend: "Roman amphitheatre stood here 2000 years ago. Market has traded here since the 14th century.",
                    photoSpot: "📸 The ornate painted Victorian roof. Blue optician's door (working shop!) at Bull's Head Passage junction.",
                    hack: "The blue door is easy to miss — it's a real optician at Bull's Head Passage & Gracechurch Street junction. Victorian architecture is more impressive than the King's Cross trolley.",
                    link: "https://www.google.com/maps/search/Leadenhall+Market+London"
                },
                {
                    time: "16:30", title: "Borough Market — Grazing & Treats", icon: "store", loc: "SE1 9AL",
                    desc: "London's oldest food market (1000+ years). Victorian arches. Ultimate eggetarian food crawl. Don't eat a big meal — graze small plates from multiple stalls.",
                    duration: "1.5 hrs", cost: "Free entry (budget £10-15pp food)",
                    do: "Graze through stalls: Horn OK Please (Indian veg), Bread Ahead (custard doughnut), Kappacasein (cheese toastie), Monmouth Coffee (best in London). Browse the Leaky Cauldron exterior (7 Stoney Street green shopfront from Harry Potter: Prisoner of Azkaban).",
                    eat: "Multiple stalls — see meal options. Don't fill up; this is about variety.",
                    famous: "London's oldest market (1000+ years). Leaky Cauldron exterior at 7 Stoney Street (green Victorian shopfront).",
                    photoSpot: "📸 Under the iron arches. Green shopfront (Leaky Cauldron). Market sign at main entrance.",
                    hack: "Monday quietest for photos. Don't eat a full meal first — this is a grazing experience.",
                    link: "https://www.google.com/maps/search/Borough+Market+London"
                },
                {
                    time: "18:00", title: "Dinner — Near Liverpool Street", icon: "utensils", loc: "E1",
                    desc: "Pick a dinner spot close to Liverpool Street (your 19:30 bus departure point). Holy Carrot (Spitalfields), Dishoom (Shoreditch), or Poppies (Spitalfields) are all 10-15 mins walk.",
                    duration: "1 hr", cost: "£12-20pp",
                    eat: "See dinner options above. Holy Carrot & Dishoom are elevated; Poppies is fun comfort food.",
                    hack: "Book Holy Carrot or Dishoom in advance (they're popular). Poppies is walk-in friendly.",
                    link: ""
                },
                {
                    time: "19:30", title: "National Express Bus to Stansted", icon: "bus", loc: "EC2N 1AR",
                    desc: "Depart from Liverpool Street Station Coach Bay. A6 National Express route to Stansted Airport. 70 minutes to airport hotel.",
                    duration: "1.5 hrs + check-in", cost: "£12",
                    do: "Board at Coach Bay (clearly marked). Kabir can sleep on the bus. Arrive at Ramada around 21:00.",
                    hack: "Book online at nationalexpress.com for peace of mind. Runs every 30 mins. Kabir rides free.",
                    link: "https://www.nationalexpress.com/"
                },
                {
                    time: "21:00", title: "Ramada London Stansted Airport", icon: "bed", loc: "CM24 1PP",
                    desc: "Check in to airport hotel. Rest before your morning flight tomorrow (Apr 28).",
                    duration: "Night", cost: "Pre-paid",
                    hack: "M&S Simply Food at terminal is better quality & cheaper than hotel restaurant. Pack & rest.",
                    link: "https://www.google.com/search?q=Ramada+London+Stansted"
                }
            ]
        }
    ],

    optionalActivities: [
        {
            title: "Natural History Museum",
            loc: "SW7 5BD",
            day: "Day 1 or 2",
            duration: "1.5-2 hrs",
            cost: "Free (donations welcome)",
            why: "Dinosaurs. Blue whale. Gem collection. Kids love it. Near Kensington (easy from Day 1 hotel).",
            hack: "Arrive at opening (10 AM) to avoid crowds. Focus on dinosaurs + blue whale, skip the rest.",
            link: "https://www.nhm.ac.uk/"
        },
        {
            title: "British Museum",
            loc: "WC1B 3DG",
            day: "Day 2 morning",
            duration: "2-3 hrs",
            cost: "Free (donations welcome)",
            why: "Egyptian mummies. Rosetta Stone. Greek sculptures. World's greatest collection in one place.",
            hack: "Focus on Egyptian wing (mummies) & Greek galleries — skip the rest. Arrive early.",
            link: "https://www.britishmuseum.org/"
        },
        {
            title: "Trafalgar Square",
            loc: "WC2N 5DN",
            day: "Day 2 (en route Soho to Piccadilly)",
            duration: "30 min",
            cost: "Free",
            why: "Nelson's Column. Iconic piazza. Pigeons everywhere. Great photo spot. 5 mins walk from Covent Garden.",
            hack: "It's on your route anyway Day 2. Stop by, take a photo, move on.",
            link: "https://www.google.com/maps/search/Trafalgar+Square+London"
        },
        {
            title: "Notting Hill — Coloured Houses & Cafés",
            loc: "W11",
            day: "Day 1 (early morning) or Day 2 (breakfast)",
            duration: "1-1.5 hrs",
            cost: "Free (budget for café)",
            why: "Pastel-coloured Victorian row houses. Iconic for photos. Trendy independent cafés & boutiques. Lively & Instagram-famous.",
            hack: "Go early (before 10 AM) for best light & fewer tourists. Pick one café for breakfast or coffee.",
            link: "https://www.google.com/maps/search/Notting+Hill+London"
        },
        {
            title: "St Paul's Cathedral",
            loc: "EC4M 8AD",
            day: "Day 3 (morning or lunch)",
            duration: "45 min (outside) or 2 hrs (inside)",
            cost: "Free (outside) — £21 (inside)",
            why: "London's most iconic cathedral. Christopher Wren's masterpiece (1697). Stunning interior & dome.",
            hack: "Walk around outside free. Interior is beautiful but kids might get bored. Skip unless you have time.",
            link: "https://www.stpauls.co.uk/"
        },
        {
            title: "Portobello Road Market",
            loc: "W11 2EB",
            day: "Day 2 (if heading to Notting Hill)",
            duration: "1 hr",
            cost: "Free (budget for stalls)",
            why: "Famous vintage & antique market. Colourful street. Good for browsing & photos.",
            hack: "Only open Wed-Sun. Weekdays are quieter. Mix with Notting Hill café visit.",
            link: "https://www.portobelloroad.co.uk/"
        }
    ]
};

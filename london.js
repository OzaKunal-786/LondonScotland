window.TRIPS = window.TRIPS || {};

window.TRIPS.london = {
    id: "london",
    name: "London",
    emoji: "🇬🇧",
    subtitle: "The No-Pay Family Adventure",
    dates: "Apr 25 – Apr 28, 2026",
    gradient: "red",       // maps to CSS class .grad-red

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
        { icon: "🏙️", title: "Free London Views", text: "Skip London Eye (£30+). Book Sky Garden or Horizon 22 — both FREE. Sky Garden releases tickets every Monday, 3 weeks ahead." },
        { icon: "💧", title: "Free Water", text: "London tap water is safe and great. Don't buy bottles (£2.50 each). Bring a reusable bottle — look for 'Refill London' stickers." },
        { icon: "🚻", title: "Free Toilets", text: "Clean free loos: John Lewis, Marks & Spencer, museum lobbies, major train stations." },
        { icon: "🚌", title: "Bus Sightseeing Hack", text: "Skip £35 hop-on hop-off tours. Bus Route 11 or 15 passes every landmark for £1.75." },
        { icon: "💳", title: "Contactless Daily Cap", text: "Use contactless bank card on Tube/Bus. Daily cap £8.10 — never pay more no matter how many trips." },
        { icon: "🎭", title: "TKTS Half-Price Theatre", text: "Same-day half-price West End tickets at TKTS booth, Leicester Square. Only use the official booth." },
        { icon: "🍽️", title: "Kids Eat Free", text: "Many chains offer kids eat free: Beefeater, Harvester, Sizzler. Check websites before going." }
    ],

    days: [
        {
            day: 1, date: "Apr 25", title: "Wizards & Icons",
            route: "Amsterdam → Stansted → King's Cross → Westminster",
            hotel: "Hotel Nirvana, Stratford",
            hotelLink: "https://www.google.com/search?q=Hotel+Nirvana+London+Stratford",
            hotelLoc: "Stratford, London E15",
            grocery: "Tesco Express, Stratford",
            groceryLoc: "E15 1XQ",
            transit: {
                lines: "Stansted Express → Central Line → Circle/Metropolitan → Jubilee",
                cost: "Daily cap £8.10 · Kabir FREE",
                tips: "Use contactless card at barriers. Wide luggage gates (green arrow) for Kabir. Book Stansted Express online for cheapest fare."
            },
            meals: {
                breakfast: { name: "Flight / Packed", cost: "—", link: "" },
                lunch: { name: "Dishoom, King's Cross", cost: "£15-20pp", link: "https://www.dishoom.com/kings-cross/" },
                dinner: { name: "Westfield Stratford food court", cost: "£8-12pp", link: "https://www.google.com/search?q=Westfield+Stratford+food+court" }
            },
            stops: [
			{
				time: "07:25", title: "Land at London Stansted", icon: "plane-arrival", loc: "CM24 1QW",
				desc: "Flight from Amsterdam (AMS 07:20 → STN 07:25). Stansted Express to Stratford.",
				duration: "1.5 hrs (immigration + train)", cost: "Stansted Express ~£20 return",
				hack: "Book Stansted Express online — saves £5+ vs walk-up. Or Greater Anglia stopping service is £12 but slower. Kabir rides free.",
				link: "https://www.stanstedexpress.com/"
			},
			{
				time: "09:15", title: "Hotel Nirvana — Drop Bags", icon: "suitcase-rolling", loc: "Stratford E15",
				desc: "Quick stop — drop luggage at reception and head straight out. Room won't be ready yet.",
				duration: "15 min", cost: "Pre-paid",
				hack: "Don't wait for the room. Tell reception you'll check in later — they store bags free. You need to be at Buckingham Palace by 10:00.",
				link: "https://www.google.com/search?q=Hotel+Nirvana+London+Stratford"
			},
			{
				time: "10:00", title: "Buckingham Palace — Changing of the Guard", icon: "crown", loc: "SW1A 1AA",
				desc: "The King's official residence. Arrive early to grab a front-row spot for the 11:00 AM Changing of the Guard — soldiers in bearskin hats with a full marching band.",
				duration: "1 hr 45 min (10:00 arrival → 11:45 ceremony end)", cost: "Free",
				do: "Get to the palace gates by 10:00 for a front spot. Lift Kabir onto your shoulders when the band starts. The soldiers march from Wellington Barracks (left side) — face that way.",
				famous: "Official royal residence since 1837. 775 rooms including a swimming pool, cinema, and its own post office. Ceremony happens since 1660.",
				legend: "A secret tunnel is rumoured to connect the Palace to Parliament. Staff report ghost monk sightings in the grounds.",
				photoSpot: "📸 Position at the palace gates centre. When the guards march in, shoot through the railings. After the ceremony — Victoria Memorial with the palace behind for the classic shot.",
				hack: "Arrive by 10:00 or you'll be 10 rows back and Kabir sees nothing. Stand at the LEFT side of the gates (facing palace) — guards march in from that side. Not held every day — check the schedule online the night before.",
				link: "https://www.google.com/search?q=Changing+of+the+Guard+schedule+2026"
			},
			{
				time: "11:50", title: "Baker Street — Sherlock Holmes", icon: "magnifying-glass", loc: "NW1 6XE",
				desc: "Quick stop on the way to King's Cross — Baker Street is literally on the route. Step outside for the Sherlock statue, then spot the Sherlock silhouette tiles on the platform walls.",
				duration: "15 min", cost: "Free",
				do: "Photo with the Sherlock statue outside the station. Back inside, hunt for Sherlock profile tiles on the platform walls — treasure hunt for Kabir.",
				famous: "221B Baker Street — world's most famous fictional address. The museum receives hundreds of letters addressed to Sherlock Holmes every year.",
				legend: "Baker Street station walls are covered in Sherlock Holmes silhouette tiles from 1984 — see how many Kabir can count before the train arrives.",
				photoSpot: "📸 Sherlock statue outside the station entrance. Inside on the platform — the brown Sherlock profile tiles on the cream walls.",
				hack: "Don't pay £16 for the museum. Don't even go to the shop. Statue outside (2 min) + platform tiles (2 min) = the whole Sherlock experience. You're changing trains here anyway.",
				link: "https://www.google.com/search?q=Sherlock+Holmes+Baker+Street+statue"
			},
			{
				time: "12:15", title: "King's Cross & Platform 9¾", icon: "wand-magic", loc: "N1C 4QP",
				desc: "The Harry Potter pilgrimage — luggage trolley embedded in the wall between platforms 9 and 10.",
				duration: "30 min", cost: "Free",
				do: "Queue for the trolley photo. Let Kabir 'push' through the wall. Visit the shop — styled like Ollivander's wand shop.",
				eat: "Skip station cafés. Dishoom is a 5-minute walk.",
				famous: "Platform 9¾ from Harry Potter. The shop is free and atmospherically lit like the films.",
				photoSpot: "📸 Skip the £15 official photographer. Shop interior is more magical for photos — looks like Ollivander's.",
				hack: "Official photographer charges £15/pack — your phone is fine. Shop is free to enter and more atmospheric than the trolley area itself. Queue is usually 10-15 min at midday.",
				link: "https://www.google.com/search?q=Platform+9+3/4+Kings+Cross"
			},
			{
				time: "13:00", title: "Dishoom, King's Cross", icon: "bowl-food", loc: "5 Stable St, N1C 4AB",
				desc: "London's best-loved Indian restaurant — inspired by Bombay's vanishing Irani cafés. A proper sit-down rest after a busy morning.",
				duration: "1 hr", cost: "£15-20pp",
				do: "Order the House Black Daal (simmered 24 hrs) and Cheese Naan. Kabir will demolish the naan. You've earned this.",
				famous: "Consistently rated London's favourite restaurant. Canal-side terrace at Granary Square.",
				photoSpot: "📸 Ornate interior mirrors and tiles. Terrace tables with Granary Square fountain behind.",
				hack: "No reservations for lunch — walk-in only. You're arriving at 13:00 so the noon rush has passed — should be seated quickly.",
				link: "https://www.dishoom.com/kings-cross/"
			},
			{
				time: "14:30", title: "Westminster & Big Ben", icon: "landmark", loc: "SW1A 0AA",
				desc: "The iconic clock tower, Westminster Abbey, and the Thames — London's most famous skyline.",
				duration: "1 hr", cost: "Free",
				do: "Exit Westminster station for the Hero Shot of Big Ben filling the sky. Walk across Westminster Bridge for Big Ben + London Eye in one frame. See Westminster Abbey from outside.",
				famous: "Big Ben is actually the bell, not the tower. The tower is Elizabeth Tower (renamed 2012).",
				legend: "A flock of starlings once landed on the minute hand and slowed time by 5 minutes.",
				photoSpot: "📸 Step 1: Station exit — Big Ben towers over you. Step 2: Middle of Westminster Bridge — Big Ben + London Eye in one shot. Step 3: South bank for full Parliament panorama.",
				hack: "Westminster Abbey is £27 to enter. Skip — exterior is stunning and free. Walk around the back for the flying buttresses.",
				link: "https://www.google.com/search?q=Big+Ben+Westminster"
			},
			{
				time: "16:00", title: "South Bank Sunset Walk", icon: "person-walking", loc: "SE1 8XX",
				desc: "Thames walk from Westminster Bridge towards Waterloo Bridge. Street performers, book stalls, city lights.",
				duration: "1 hr", cost: "Free",
				do: "Watch street performers. Browse second-hand book stalls under Waterloo Bridge. See London Eye lit up as the sun sets.",
				photoSpot: "📸 Golden hour from Waterloo Bridge — one of London's best sunset viewpoints. Thames + Parliament + Eye.",
				hack: "BFI Southbank bar has cheaper drinks than riverside pubs. Royal Festival Hall has free toilets and warm shelter if cold.",
				link: "https://www.google.com/search?q=South+Bank+walk+London"
			}
			]
        },
        {
            day: 2, date: "Apr 26", title: "Marathon Day — Play & LEGO",
            route: "Kensington → Leicester Square → Buckingham Palace",
            hotel: "Hotel Nirvana, Stratford",
            hotelLink: "https://www.google.com/search?q=Hotel+Nirvana+London+Stratford",
            hotelLoc: "Stratford, London E15",
            grocery: "Sainsbury's Local, Stratford",
            groceryLoc: "E15 1XQ",
            transit: {
                lines: "Central Line → Jubilee Line (avoid riverside — Marathon closures)",
                cost: "Daily cap £8.10 · Kabir FREE",
                tips: "London Marathon today! Roads near the river closed. Stay in West/Central. Check TfL Go app."
            },
            meals: {
                breakfast: { name: "Hotel / nearby café", cost: "£5-8pp", link: "" },
                lunch: { name: "Dishoom, Kensington", cost: "£15-20pp", link: "https://www.dishoom.com/kensington/" },
                dinner: { name: "Chinatown bakery + snacks", cost: "£5-10pp", link: "https://www.google.com/search?q=Chinatown+London+bakeries" }
            },
            stops: [
                {
                    time: "10:30", title: "Diana Memorial Playground", icon: "ship", loc: "W2 4RU",
                    desc: "A magical pirate ship playground in Kensington Gardens, inspired by Peter Pan.",
                    duration: "1.5-2 hrs", cost: "Free",
                    do: "Let Kabir captain the massive wooden pirate ship. Explore teepees, sensory trail, sand area.",
                    famous: "Inspired by Peter Pan set in Kensington Gardens. 900,000 visitors/year.",
                    photoSpot: "📸 Kabir on pirate ship bow. Through teepee entrance. Wide shot of ship with trees.",
                    hack: "Opens 10 AM, VERY busy by 11. Be there at opening. Kensington Palace is right next door (free outside).",
                    link: "https://www.google.com/search?q=Diana+Memorial+Playground"
                },
                {
                    time: "13:00", title: "Dishoom, Kensington", icon: "bowl-food", loc: "1 Derry St, W8 5HN",
                    desc: "Art Deco branch of London's favourite Indian restaurant.",
                    duration: "1.5 hrs", cost: "£15-20pp",
                    do: "Try something different — Pau Bhaji or Gunpowder Potatoes. Very family-friendly.",
                    famous: "Beautiful Art Deco building. Same legendary menu.",
                    hack: "Walk-ins only for lunch. If you had Black Daal yesterday, try Mattar Paneer today.",
                    link: "https://www.dishoom.com/kensington/"
                },
                {
                    time: "15:00", title: "LEGO Store & M&M World", icon: "shapes", loc: "Leicester Square WC2H 7LQ",
                    desc: "World's largest LEGO Store and 4-floor M&M World — both FREE entry.",
                    duration: "1 hr", cost: "Free entry (budget £10-15 souvenirs)",
                    do: "See LEGO Big Ben, Underground carriage, Shakespeare. Build-a-minifigure (£10 for 3). M&M World = 4 floors of colour.",
                    famous: "Leicester Square LEGO Store is world's largest. M&M World is 1 of only 5 globally.",
                    photoSpot: "📸 LEGO Big Ben. Kabir next to life-size LEGO Royal Guard. M&M wall on floor 2.",
                    hack: "Build-a-minifigure = best souvenir for £10. M&M World is free but 3x priced — look, don't buy.",
                    link: "https://www.google.com/search?q=LEGO+Store+Leicester+Square"
                },
                {
                    time: "16:30", title: "Chinatown", icon: "torii-gate", loc: "W1D 5BA",
                    desc: "Ornate gates, red lanterns, and incredible bakeries.",
                    duration: "30 min", cost: "Free (bakery items £1-3)",
                    do: "Walk through ceremonial gates. Get a custard bun or egg tart (£1.50). Kabir will love the lanterns.",
                    famous: "London's Chinatown since the 1950s. Gates hand-painted, gifted by China.",
                    photoSpot: "📸 Under main gate on Wardour Street with red lanterns overhead.",
                    hack: "Bakeries = best value food in ALL of central London. Skip sit-down restaurants (tourist traps).",
                    link: "https://www.google.com/search?q=Chinatown+London"
                },
                {
                    time: "17:00", title: "Buckingham Palace", icon: "crown", loc: "SW1A 1AA",
                    desc: "The King's official London residence — 775 rooms, 78 bathrooms, its own post office.",
                    duration: "30 min", cost: "Free (outside)",
                    do: "Photo at the gates. Marathon finishes on The Mall today — electric atmosphere even late afternoon.",
                    famous: "Official royal residence since 1837. 775 rooms including swimming pool, cinema, post office.",
                    legend: "A secret tunnel is rumoured to connect the Palace to Parliament. Staff report ghost monk sightings.",
                    photoSpot: "📸 Through palace gates with Victoria Memorial. From The Mall with Union Jacks.",
                    hack: "No Changing of Guard on Marathon Sunday. But Marathon buzz is even better.",
                    link: "https://www.google.com/search?q=Buckingham+Palace"
                }
            ]
        },
        {
            day: 3, date: "Apr 27", title: "Castles, Bridges & Diagon Alley",
            route: "Tower Hill → Borough → Stratford → Stansted",
            hotel: "Ramada London Stansted Airport",
            hotelLink: "https://www.google.com/search?q=Ramada+London+Stansted+Airport",
            hotelLoc: "CM24 1PP",
            grocery: "M&S Simply Food, Stansted Airport",
            groceryLoc: "CM24 1QW",
            transit: {
                lines: "Elizabeth Line → Tower Hill → Walking → National Express to Stansted",
                cost: "Tube cap £8.10 + National Express ~£10",
                tips: "Collect bags from Hotel Nirvana before heading to Stansted. National Express from Stratford Bus Station is easiest with luggage + child."
            },
            meals: {
                breakfast: { name: "Hotel Nirvana / local café", cost: "£5-8pp", link: "" },
                lunch: { name: "Borough Market grazing", cost: "£10-15pp", link: "https://www.google.com/search?q=Borough+Market+best+food+stalls" },
                dinner: { name: "Ramada hotel / M&S meal deal", cost: "£8-12pp", link: "" }
            },
            stops: [
                {
                    time: "10:00", title: "Tower of London", icon: "chess-rook", loc: "EC3N 4AB",
                    desc: "1000-year-old royal castle, fortress, prison, and execution ground.",
                    duration: "45 min (outside)", cost: "Free (outside) — £33 to enter",
                    do: "Walk the public path around the walls. Spot Tower Ravens from the fence. Tell Kabir about the princes.",
                    famous: "Home of Crown Jewels. Two princes imprisoned and vanished here in 1483.",
                    legend: "Six ravens must always live here. If they leave, the kingdom falls. Wings are clipped — just in case.",
                    photoSpot: "📸 From river walkway with White Tower centred. Kabir at Traitors' Gate.",
                    hack: "Don't pay £33 with a 5-year-old. Public path = 90% of the experience free. Castle, moat, ravens all visible.",
                    link: "https://www.google.com/search?q=Tower+of+London"
                },
                {
                    time: "11:00", title: "Tower Bridge", icon: "bridge", loc: "SE1 2UP",
                    desc: "London's most iconic bridge — a Victorian engineering masterpiece.",
                    duration: "20 min", cost: "Free (walkway)",
                    do: "Walk across pedestrian level. Tell Kabir the bridge opens for tall ships ~800 times/year.",
                    famous: "Most photographed bridge in the world. Often confused with London Bridge (the boring one).",
                    legend: "Original 1894 hydraulic engines still inside.",
                    photoSpot: "📸 From south bank (More London plaza) — Bridge + Tower in one shot. Golden hour is spectacular.",
                    hack: "Glass floor walkway is £12 — skip unless you love heights. Free crossing has same view.",
                    link: "https://www.google.com/search?q=Tower+Bridge+London"
                },
                {
                    time: "11:30", title: "Leadenhall Market — Diagon Alley", icon: "wand-magic-sparkles", loc: "EC3V 1LT",
                    desc: "Victorian covered market — the REAL Diagon Alley from Harry Potter films.",
                    duration: "30 min", cost: "Free",
                    do: "Find the blue door at 42 Bull's Head Passage — Leaky Cauldron entrance. Tell Kabir he's walking through Diagon Alley!",
                    famous: "Used as Diagon Alley in Philosopher's Stone. Victorian ironwork painted to look magical.",
                    legend: "A Roman amphitheatre stood here 2000 years ago. Market has traded since the 14th century.",
                    photoSpot: "📸 Ornate painted Victorian roof. Blue optician's door at 42 Bull's Head Passage.",
                    hack: "Blue door is easy to miss — junction of Bull's Head Passage and Gracechurch Street. It's a working optician's shop.",
                    link: "https://www.google.com/search?q=Leadenhall+Market+Diagon+Alley"
                },
                {
                    time: "13:00", title: "Borough Market", icon: "store", loc: "SE1 9AL",
                    desc: "London's oldest food market — 1000 years under Victorian arches. Ultimate food crawl.",
                    duration: "1.5 hrs", cost: "Free entry (budget £10-15pp food)",
                    do: "Find Leaky Cauldron entrance at 7 Stoney Street (green shopfront). Graze through the market.",
                    eat: "Horn OK Please (Indian street food). Humble Crumble (crumbles + custard). Bread Ahead (legendary doughnuts).",
                    famous: "London's oldest market — over 1000 years. Featured in Bridget Jones's Diary.",
                    legend: "Leaky Cauldron exterior from Prisoner of Azkaban filmed at 7 Stoney Street. Green Victorian shopfront still there.",
                    photoSpot: "📸 Under iron arches. 7 Stoney Street (Leaky Cauldron). Old 'Borough Market' painted sign.",
                    hack: "Monday is quietest — perfect for photos. Don't eat big before — graze small plates from different stalls.",
                    link: "https://www.google.com/search?q=Borough+Market+London"
                },
                {
                    time: "15:30", title: "Collect Bags → Stansted", icon: "suitcase-rolling", loc: "Stratford E15",
                    desc: "Return to Hotel Nirvana for bags. National Express bus from Stratford Bus Station to Stansted Airport.",
                    duration: "2.5 hrs total", cost: "National Express ~£10 adult",
                    hack: "National Express A21 from Stratford Bus Station — direct, easier than train with luggage + child. Book online. Runs every 30 min.",
                    link: "https://www.nationalexpress.com/"
                },
                {
                    time: "18:30", title: "Ramada London Stansted", icon: "bed", loc: "CM24 1PP",
                    desc: "Airport hotel for tomorrow's Edinburgh flight. Rest up — Scotland begins tomorrow!",
                    duration: "Evening", cost: "Pre-paid",
                    hack: "Check if breakfast included. If not, M&S Simply Food at terminal is cheaper than hotel restaurant. Pack bags tonight.",
                    link: "https://www.google.com/search?q=Ramada+London+Stansted"
                }
            ]
        }
    ]
};
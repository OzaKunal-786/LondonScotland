window.TRIPS = window.TRIPS || {};

window.TRIPS.test_trip = {
    "id": "test_trip",
    "name": "My Test Trip",
    "emoji": "🧪",
    "subtitle": "Testing the upload feature",
    "dates": "May 2026",
    "gradient": "emerald",
    "emergency": {
        "numbers": [
            {
                "label": "Emergency",
                "value": "112",
                "icon": "phone"
            }
        ],
        "hospitals": [
            {
                "name": "City Hospital",
                "loc": "XX1 1XX",
                "phone": "000"
            }
        ],
        "apps": [
            "Maps"
        ]
    },
    "hacks": [
        {
            "icon": "💡",
            "title": "Test Hack",
            "text": "This is a test."
        }
    ],
    "days": [
        {
            "day": 1,
            "date": "May 01",
            "title": "Testing Day",
            "route": "Home → Test-->upload-->Test",
            "hotel": "Test Hotel",
            "meals": {
                "breakfast": [
                    {
                        "name": "Egg Shop",
                        "cost": "£10",
                        "tag": "🍳",
                        "desc": "Eggs!",
                        "link": ""
                    }
                ]
            },
            "stops": [
                {
                    "time": "10:00",
                    "title": "First Test Stop",
                    "desc": "If you see this, it works!",
                    "icon": "check-circle"
                }
            ]
        }
    ]
};
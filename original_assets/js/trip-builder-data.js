/* =========================================================
   Plan Your Himalayan Trip — builder data
   Regions, places, seasons and suggested routes used by
   trip-builder.js. Month numbers are 1-12.
   ========================================================= */

window.TRIP_BUILDER_DATA = {
  regions: [
    {
      id: 'himachal',
      name: 'Himachal',
      tagline: 'Pine valleys, cafés & easy mountain escapes',
      image: 'assets/images/destinations/domestic/himachal.jpg',
      minDays: 4,
      openMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      seasonNote: 'Himachal is open all year. July–August brings monsoon landslides; Dec–Feb brings snow.',
      tripCategories: ['himachal_tours'],
      places: [
        'Manali', 'Old Manali', 'Solang Valley', 'Atal Tunnel & Sissu', 'Kullu', 'Kasol',
        'Tosh', 'Kheerganga', 'Jibhi & Tirthan Valley', 'Bir Billing', 'Dharamshala & McLeodganj',
        'Prashar Lake', 'Shimla', 'Narkanda', 'Dalhousie & Khajjiar', 'Jispa'
      ],
      route: ['Manali', 'Manali', 'Atal Tunnel & Sissu', 'Kasol', 'Jibhi & Tirthan Valley', 'Bir Billing', 'Dharamshala & McLeodganj']
    },
    {
      id: 'spiti',
      name: 'Spiti Valley',
      tagline: 'Cold desert, ancient monasteries, the highest villages',
      image: 'assets/images/destinations/domestic/spiti.jpg',
      minDays: 6,
      openMonths: [5, 6, 7, 8, 9, 10],
      seasonNote: 'The full Spiti circuit (via Kunzum Pass) is usually open June to mid-October. In winter only the Shimla–Kinnaur side is open, and it is better done as a 4x4 trip.',
      tripCategories: ['spiti_tours'],
      places: [
        'Kaza', 'Key Monastery', 'Kibber & Chicham Bridge', 'Langza', 'Hikkim', 'Komic',
        'Dhankar & Dhankar Lake', 'Tabo', 'Pin Valley (Mudh)', 'Chandratal Lake', 'Kunzum Pass',
        'Nako', 'Kalpa', 'Sangla', 'Chitkul', 'Narkanda'
      ],
      // Shimla side first: a gentler climb, and it finishes in Manali
      route: ['Narkanda', 'Kalpa', 'Nako', 'Tabo', 'Kaza', 'Kaza', 'Chandratal Lake', 'Manali']
    },
    {
      id: 'ladakh',
      name: 'Ladakh',
      tagline: 'High passes, blue lakes, endless roads',
      image: 'assets/images/trips/trip_117_image_url.jpg',
      minDays: 6,
      openMonths: [4, 5, 6, 7, 8, 9, 10],
      seasonNote: 'Leh is reachable by flight all year, but road trips (Manali–Leh, Srinagar–Leh) are usually open June to September. Winter Ladakh is extremely cold.',
      tripCategories: ['ladakh_tours'],
      places: [
        'Leh', 'Sham Valley', 'Khardung La', 'Nubra (Hunder & Diskit)', 'Turtuk', 'Pangong Tso',
        'Tso Moriri', 'Hanle', 'Umling La', 'Kargil', 'Lamayuru', 'Sarchu', 'Jispa'
      ],
      route: ['Leh', 'Leh', 'Nubra (Hunder & Diskit)', 'Turtuk', 'Pangong Tso', 'Leh', 'Tso Moriri', 'Leh']
    },
    {
      id: 'zanskar',
      name: 'Zanskar',
      tagline: 'Remote valleys, glaciers & cliffside monasteries',
      image: 'assets/images/trips/trip_105_image_url.jpg',
      minDays: 7,
      openMonths: [6, 7, 8, 9],
      seasonNote: 'Roads into Zanskar (via Kargil or Shinku La) are usually open only June to September.',
      tripCategories: ['ladakh_tours'],
      tripTitleMatch: /zanskar/i,
      places: [
        'Kargil', 'Suru Valley', 'Rangdum', 'Pensi La & Drang Drung Glacier', 'Padum',
        'Karsha Monastery', 'Phugtal Monastery', 'Zangla', 'Purne', 'Shinku La', 'Lamayuru'
      ],
      route: ['Kargil', 'Rangdum', 'Padum', 'Padum', 'Purne', 'Padum', 'Kargil']
    },
    {
      id: 'kashmir',
      name: 'Kashmir',
      tagline: 'Houseboats, meadows & snowy Gulmarg',
      image: 'assets/images/trips/trip_115_image_url.jpg',
      minDays: 4,
      openMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      seasonNote: 'Kashmir is open all year. Gulmarg has snow December to March; Sonamarg and Gurez roads can close in heavy winter.',
      tripCategories: ['kashmir_tours'],
      places: [
        'Srinagar', 'Dal Lake Houseboat', 'Gulmarg', 'Pahalgam', 'Aru & Betaab Valley', 'Sonamarg',
        'Doodhpathri', 'Yusmarg', 'Gurez Valley', 'Kashmir Great Lakes Trek'
      ],
      route: ['Srinagar', 'Gulmarg', 'Pahalgam', 'Pahalgam', 'Sonamarg', 'Srinagar']
    },
    {
      id: 'uttarakhand',
      name: 'Uttarakhand',
      tagline: 'Temples, treks & the Ganga',
      image: 'assets/images/trips/trip_119_image_url.jpg',
      minDays: 4,
      openMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      seasonNote: 'Uttarakhand is open all year, but July–August monsoon can block mountain roads. Kedarnath and Badrinath are open roughly May to early November.',
      tripCategories: ['uttarakhand_tours'],
      places: [
        'Rishikesh', 'Mussoorie', 'Dhanaulti & Kanatal', 'Chopta & Tungnath', 'Auli', 'Joshimath',
        'Valley of Flowers', 'Kedarnath', 'Badrinath', 'Nainital', 'Jim Corbett', 'Munsiyari'
      ],
      route: ['Rishikesh', 'Rishikesh', 'Chopta & Tungnath', 'Chopta & Tungnath', 'Auli', 'Rishikesh']
    },
    {
      id: 'northeast',
      name: 'Northeast',
      tagline: 'Living root bridges, monasteries & festivals',
      image: 'assets/images/trips/trip_114_image_url.jpg',
      minDays: 5,
      openMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      seasonNote: 'October to April is the best time in the Northeast. Meghalaya is very wet June–September; Tawang and North Sikkim passes can close with snow in winter.',
      tripCategories: ['northeast_india_tours'],
      places: [
        'Guwahati', 'Shillong', 'Cherrapunji (Sohra)', 'Mawlynnong', 'Dawki', 'Kaziranga',
        'Dirang', 'Tawang', 'Ziro', 'Gangtok', 'Lachung & Yumthang', 'Darjeeling', 'Majuli'
      ],
      route: ['Shillong', 'Cherrapunji (Sohra)', 'Cherrapunji (Sohra)', 'Shillong', 'Kaziranga', 'Guwahati']
    }
  ],

  startPoints: ['Delhi', 'Chandigarh', 'Manali', 'Leh', 'Srinagar', 'Dehradun', 'Guwahati', 'Bagdogra', 'Other'],

  groupTypes: ['Friends', 'Family', 'Couple', 'Solo', 'Office / Corporate', 'School / College'],

  stays: [
    { id: 'budget', label: 'Budget', hint: 'Clean guesthouses, hostels & homestays' },
    { id: 'comfort', label: 'Comfort', hint: '3-star hotels & good homestays' },
    { id: 'premium', label: 'Premium', hint: 'Boutique stays & the best in each town' },
    { id: 'camps', label: 'Mix with camps', hint: 'Hotels plus a few nights under canvas' }
  ],

  transport: [
    { id: 'tempo', label: 'Tempo Traveller', hint: 'Best for 6+ people' },
    { id: 'suv', label: 'SUV / Innova', hint: 'Comfortable for up to 6' },
    { id: '4x4', label: '4x4', hint: 'Snow, rough roads, winter Spiti' },
    { id: 'bikes', label: 'Royal Enfield bikes', hint: 'With a backup vehicle' },
    { id: 'suggest', label: 'Suggest for me', hint: 'We will pick the right one' }
  ],

  paces: [
    { id: 'relaxed', label: 'Relaxed', hint: 'Short drives, slow mornings' },
    { id: 'balanced', label: 'Balanced', hint: 'A good mix of both' },
    { id: 'packed', label: 'Action-packed', hint: 'See as much as possible' }
  ],

  activities: [
    'Paragliding', 'River rafting', 'Camping', 'Snow activities', 'Day hikes', 'Multi-day trek',
    'Monasteries & culture', 'Stargazing', 'Photography help', 'Local food trail', 'Village homestay',
    'Festival visit', 'Jeep safari', 'Hot springs'
  ],

  callTimes: ['As soon as possible', 'Morning (10 AM – 1 PM)', 'Afternoon (1 – 4 PM)', 'Evening (4 – 7 PM)'],

  // Callback rule: every lead gets a call within responseHours. Shown on the
  // site and in Banjara's replies.
  workingHours: { start: 10, end: 19, responseHours: 24 },

  whatsappNumber: '919103910523'
};

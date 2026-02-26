// ============================================================
// data.js — Single source of truth for all app data
// Structured to mirror future DB tables (each export = 1 table)
// ============================================================

// TABLE: towns
export const towns = [
  {
    id: 1,
    name: "Nairobi",
    description: "Capital city with extensive matatu network",
    isActive: true,
  },
  {
    id: 2,
    name: "Mombasa",
    description: "Coastal city transport hub",
    isActive: false,
  },
  {
    id: 3,
    name: "Kisumu",
    description: "Lake region transport center",
    isActive: false,
  },
  {
    id: 4,
    name: "Nakuru",
    description: "Rift Valley transport junction",
    isActive: false,
  },
  {
    id: 5,
    name: "Eldoret",
    description: "North Rift transport hub",
    isActive: false,
  },
  {
    id: 6,
    name: "Thika",
    description: "Industrial town with connectivity",
    isActive: false,
  },
];

// TABLE: roads
// FK: townId → towns.id
export const roads = [
  {
    id: 1,
    townId: 1,
    name: "Thika Superhighway",
    description: "Serves Roysambu, Kasarani, and Githurai",
  },
  {
    id: 2,
    townId: 1,
    name: "Waiyaki Way",
    description: "Main artery for Westlands, Kangemi, and Kikuyu",
  },
  {
    id: 3,
    townId: 1,
    name: "Mombasa Road",
    description: "Connects CBD to Syokimau and JKIA",
  },
  {
    id: 4,
    townId: 1,
    name: "Jogoo Road",
    description: "Primary route for Eastlands and Donholm",
  },
  {
    id: 5,
    townId: 1,
    name: "Ngong Road",
    description: "Serves Upperhill, Adams, and Karen",
  },
  {
    id: 6,
    townId: 1,
    name: "Kiambu Road",
    description: "Connects Muthaiga, Ridgeways, and Kiambu",
  },
];

// TABLE: destinations
// FK: roadId → roads.id
export const destinations = [
  // Thika Superhighway (roadId: 1)
  {
    id: 1,
    roadId: 1,
    name: "Kasarani",
    description: "Mwiki, Clay City, ICIPE",
  },
  {
    id: 2,
    roadId: 1,
    name: "Githurai",
    description: "Githurai 44, Githurai 45",
  },
  {
    id: 3,
    roadId: 1,
    name: "Ruiru",
    description: "Kimbo, Kihunguro, Ruiru Town",
  },
  { id: 4, roadId: 1, name: "Juja", description: "JKUAT, Highpoint, Kalimoni" },
  {
    id: 5,
    roadId: 1,
    name: "Nairobi CBD",
    description: "T-Mall, Archive, Odeon",
  },

  // Waiyaki Way (roadId: 2)
  {
    id: 6,
    roadId: 2,
    name: "Westlands",
    description: "Sarit, ABC Place, Mall",
  },
  {
    id: 7,
    roadId: 2,
    name: "Kangemi",
    description: "Mountain View, Sodom, Waruku",
  },
  {
    id: 8,
    roadId: 2,
    name: "Kikuyu",
    description: "Kawangware, Uthiru, Kabete",
  },
  {
    id: 9,
    roadId: 2,
    name: "Nairobi CBD",
    description: "Koja, Bus Station, Railways",
  },

  // Mombasa Road (roadId: 3)
  {
    id: 10,
    roadId: 3,
    name: "Syokimau",
    description: "SGR Terminus, Gateway Mall",
  },
  {
    id: 11,
    roadId: 3,
    name: "Mlolongo",
    description: "Signature Mall, Weigh Bridge",
  },
  {
    id: 12,
    roadId: 3,
    name: "Nairobi CBD",
    description: "Railways, General Post Office",
  },

  // Jogoo Road (roadId: 4)
  {
    id: 13,
    roadId: 4,
    name: "Umoja",
    description: "Umoja 1, 2, 3, Inner Core",
  },
  { id: 14, roadId: 4, name: "Donholm", description: "Phase 1-5, Mumias Road" },
  {
    id: 15,
    roadId: 4,
    name: "Buruburu",
    description: "Phase 1-5, Mumias Road",
  },
  {
    id: 16,
    roadId: 4,
    name: "Embakasi",
    description: "Pipeline, Fedha, Nyayo",
  },
  {
    id: 17,
    roadId: 4,
    name: "Nairobi CBD",
    description: "Muthurwa, Machakos Country Bus",
  },

  // Ngong Road (roadId: 5)
  {
    id: 18,
    roadId: 5,
    name: "Karen",
    description: "Hardy, Galleria, Crossroads",
  },
  { id: 19, roadId: 5, name: "Ngong", description: "Ngong Town, Kibiko" },
  {
    id: 20,
    roadId: 5,
    name: "Adams Arcade",
    description: "Dagoretti Corner, Junction",
  },
  {
    id: 21,
    roadId: 5,
    name: "Nairobi CBD",
    description: "Kencom, Ambassador, GPO",
  },

  // Kiambu Road (roadId: 6)
  { id: 22, roadId: 6, name: "Kiambu Town", description: "Kirigiti, Ndumberi" },
  {
    id: 23,
    roadId: 6,
    name: "Ridgeways",
    description: "Ciata City, Wanderjoy",
  },
  {
    id: 24,
    roadId: 6,
    name: "Nairobi CBD",
    description: "Globe Cinema, Fig Tree",
  },
];

// TABLE: saccos
export const saccos = [
  {
    id: 1,
    name: "Super Metro",
    stage: "Archives/Commercial",
    landmark: "Opp. Archives",
    color: "#2563eb",
    payment: ["M-Pesa", "Cash"],
    rating: 4.8,
    reviews: 1240,
    phone: "+254726174961",
    whatsapp: null,
  },
  {
    id: 2,
    name: "Neo Kenya Mpya",
    stage: "Odeon Cinema",
    landmark: "Latema Road",
    color: "#eab308",
    payment: ["M-Pesa", "Cash"],
    rating: 4.2,
    reviews: 2100,
    phone: null,
    whatsapp: null,
  },
  {
    id: 3,
    name: "Mwiki United",
    stage: "Mwiki Stage",
    landmark: "Clay City Rd",
    color: "#16a34a",
    payment: ["Cash"],
    rating: 4.0,
    reviews: 870,
    phone: null,
    whatsapp: null,
  },
  {
    id: 4,
    name: "City Shuttle",
    stage: "OTC",
    landmark: "Opp. Globe",
    color: "#dc2626",
    payment: ["Cash"],
    rating: 4.5,
    reviews: 960,
    phone: null,
    whatsapp: null,
  },
  {
    id: 5,
    name: "Haki Trans",
    stage: "Kencom",
    landmark: "Moi Avenue",
    color: "#7c3aed",
    payment: ["Cash"],
    rating: 3.9,
    reviews: 540,
    phone: null,
    whatsapp: null,
  },
  {
    id: 6,
    name: "Forward Travellers",
    stage: "Railways",
    landmark: "Haile Selassie",
    color: "#0891b2",
    payment: ["Cash"],
    rating: 3.7,
    reviews: 430,
    phone: null,
    whatsapp: null,
  },
  {
    id: 7,
    name: "KBS",
    stage: "Koja",
    landmark: "River Road",
    color: "#ea580c",
    payment: ["M-Pesa", "Cash"],
    rating: 4.6,
    reviews: 1870,
    phone: null,
    whatsapp: null,
  },
  {
    id: 8,
    name: "North Now",
    stage: "Bus Station",
    landmark: "Ronald Ngala",
    color: "#0d9488",
    payment: ["Cash"],
    rating: 4.1,
    reviews: 620,
    phone: null,
    whatsapp: null,
  },
  {
    id: 9,
    name: "2NK Sacco",
    stage: "OTC",
    landmark: "Accra Road",
    color: "#be185d",
    payment: ["M-Pesa", "Cash"],
    rating: 4.7,
    reviews: 1100,
    phone: "+254721374310",
    whatsapp: "+254792657999",
  },
  {
    id: 10,
    name: "Double M",
    stage: "Muthurwa",
    landmark: "Pumwani Rd",
    color: "#854d0e",
    payment: ["Cash"],
    rating: 4.4,
    reviews: 780,
    phone: null,
    whatsapp: null,
  },
  {
    id: 11,
    name: "Lopha",
    stage: "Archives",
    landmark: "City Hall Way",
    color: "#166534",
    payment: ["Cash"],
    rating: 3.8,
    reviews: 310,
    phone: null,
    whatsapp: null,
  },
  {
    id: 12,
    name: "Baba Dogo",
    stage: "Bus Station",
    landmark: "Cross Rd",
    color: "#1e40af",
    payment: ["Cash"],
    rating: 3.5,
    reviews: 290,
    phone: null,
    whatsapp: null,
  },
  {
    id: 13,
    name: "Githurai 45 Sacco",
    stage: "Githurai Stage",
    landmark: "Thika Rd",
    color: "#065f46",
    payment: ["Cash"],
    rating: 3.9,
    reviews: 510,
    phone: null,
    whatsapp: null,
  },
  {
    id: 14,
    name: "Zuri",
    stage: "OTC",
    landmark: "Accra Rd",
    color: "#7e22ce",
    payment: ["M-Pesa", "Cash"],
    rating: 4.4,
    reviews: 730,
    phone: null,
    whatsapp: null,
  },
  {
    id: 15,
    name: "Kenya Mpya",
    stage: "Kencom",
    landmark: "Moi Ave",
    color: "#b45309",
    payment: ["Cash"],
    rating: 4.3,
    reviews: 890,
    phone: null,
    whatsapp: null,
  },
  {
    id: 16,
    name: "Ruiru Express",
    stage: "Bus Station",
    landmark: "Ronald Ngala",
    color: "#0369a1",
    payment: ["M-Pesa", "Cash"],
    rating: 4.1,
    reviews: 420,
    phone: null,
    whatsapp: null,
  },
  {
    id: 17,
    name: "Kasarani Express",
    stage: "Archives",
    landmark: "City Hall Way",
    color: "#9f1239",
    payment: ["M-Pesa", "Cash"],
    rating: 4.2,
    reviews: 560,
    phone: null,
    whatsapp: null,
  },
  {
    id: 18,
    name: "Umoinner",
    stage: "Muthurwa",
    landmark: "Eastleigh Rd",
    color: "#1d4ed8",
    payment: ["Cash"],
    rating: 4.1,
    reviews: 670,
    phone: null,
    whatsapp: null,
  },
  {
    id: 19,
    name: "City Hoppa",
    stage: "City Stadium",
    landmark: "Jogoo Rd",
    color: "#15803d",
    payment: ["M-Pesa", "Cash"],
    rating: 4.2,
    reviews: 810,
    phone: null,
    whatsapp: null,
  },
  {
    id: 20,
    name: "Transline Classic",
    stage: "Muthurwa",
    landmark: "Pumwani Rd",
    color: "#92400e",
    payment: ["Cash"],
    rating: 4.0,
    reviews: 490,
    phone: null,
    whatsapp: null,
  },
  {
    id: 21,
    name: "Westlands Express",
    stage: "Archives",
    landmark: "City Hall Way",
    color: "#0c4a6e",
    payment: ["M-Pesa", "Cash"],
    rating: 4.4,
    reviews: 920,
    phone: null,
    whatsapp: null,
  },
  {
    id: 22,
    name: "Kikuyu Travelers",
    stage: "OTC",
    landmark: "Latema Rd",
    color: "#4d7c0f",
    payment: ["Cash"],
    rating: 3.8,
    reviews: 380,
    phone: null,
    whatsapp: null,
  },
  {
    id: 23,
    name: "Metro Trans",
    stage: "Railways",
    landmark: "Haile Selassie",
    color: "#6d28d9",
    payment: ["M-Pesa", "Cash"],
    rating: 4.5,
    reviews: 1050,
    phone: null,
    whatsapp: null,
  },
  {
    id: 24,
    name: "Nangkis",
    stage: "Kencom",
    landmark: "Moi Ave",
    color: "#b91c1c",
    payment: ["Cash"],
    rating: 4.2,
    reviews: 460,
    phone: null,
    whatsapp: null,
  },
  {
    id: 25,
    name: "Dakika",
    stage: "Railways",
    landmark: "Haile Selassie",
    color: "#0f766e",
    payment: ["Cash"],
    rating: 4.0,
    reviews: 340,
    phone: null,
    whatsapp: null,
  },
  {
    id: 26,
    name: "Latema",
    stage: "Odeon",
    landmark: "Latema Rd",
    color: "#7c2d12",
    payment: ["Cash"],
    rating: 4.3,
    reviews: 510,
    phone: null,
    whatsapp: null,
  },
  {
    id: 27,
    name: "Ngokana",
    stage: "OTC",
    landmark: "Accra Rd",
    color: "#1e3a5f",
    payment: ["Cash"],
    rating: 3.9,
    reviews: 280,
    phone: null,
    whatsapp: null,
  },
  {
    id: 28,
    name: "Enabled",
    stage: "Archives",
    landmark: "City Hall Way",
    color: "#064e3b",
    payment: ["M-Pesa", "Cash"],
    rating: 4.1,
    reviews: 390,
    phone: null,
    whatsapp: null,
  },
  {
    id: 29,
    name: "Raj Safaris",
    stage: "Railways",
    landmark: "Haile Selassie",
    color: "#78350f",
    payment: ["M-Pesa", "Cash"],
    rating: 4.4,
    reviews: 610,
    phone: null,
    whatsapp: null,
  },
  {
    id: 30,
    name: "Karen Shuttle",
    stage: "Railways",
    landmark: "Haile Selassie",
    color: "#1e1b4b",
    payment: ["M-Pesa", "Cash"],
    rating: 4.3,
    reviews: 720,
    phone: null,
    whatsapp: null,
  },
];

// TABLE: routes
// FK: destinationId → destinations.id
export const routes = [
  // --- Thika Superhighway → Kasarani (destinationId: 1) ---
  {
    id: 1,
    destinationId: 1,
    routeNumber: "17B",
    path: ["CBD", "Pangani", "Muthaiga", "Roysambu", "Kasarani"],
    fare: 80,
    duration: "45 mins",
    distance: "12 km",
    isExpress: false,
  },
  {
    id: 2,
    destinationId: 1,
    routeNumber: "237",
    path: ["CBD", "Allsops", "Survey", "Garden City", "Kasarani"],
    fare: 100,
    duration: "50 mins",
    distance: "13 km",
    isExpress: false,
  },
  {
    id: 3,
    destinationId: 1,
    routeNumber: "60F",
    path: ["CBD", "Ngara", "Highridge", "Roysambu", "Kasarani"],
    fare: 70,
    duration: "55 mins",
    distance: "12.5 km",
    isExpress: false,
  },

  // --- Thika Superhighway → Githurai (destinationId: 2) ---
  {
    id: 4,
    destinationId: 2,
    routeNumber: "45",
    path: ["CBD", "Ngara", "Allsops", "Roysambu", "Githurai"],
    fare: 60,
    duration: "55 mins",
    distance: "15 km",
    isExpress: false,
  },
  {
    id: 5,
    destinationId: 2,
    routeNumber: "45B",
    path: ["CBD", "Pangani", "Muthaiga", "Kahawa West", "Githurai"],
    fare: 70,
    duration: "60 mins",
    distance: "16 km",
    isExpress: false,
  },
  {
    id: 6,
    destinationId: 2,
    routeNumber: "100",
    path: ["CBD", "Allsops", "Kahawa Sukari", "Kenyatta Uni", "Githurai"],
    fare: 80,
    duration: "65 mins",
    distance: "17 km",
    isExpress: false,
  },
  {
    id: 7,
    destinationId: 3,
    routeNumber: "145",
    path: ["CBD", "Pangani", "Kahawa Sukari", "Kihunguro", "Ruiru"],
    fare: 150,
    duration: "60 mins",
    distance: "22 km",
    isExpress: false,
  },
  {
    id: 8,
    destinationId: 3,
    routeNumber: "145B",
    path: ["CBD", "Allsops", "Roysambu", "Githurai", "Ruiru"],
    fare: 130,
    duration: "70 mins",
    distance: "23 km",
    isExpress: false,
  },
  {
    id: 9,
    destinationId: 3,
    routeNumber: "260",
    path: ["CBD", "Muthaiga", "Kahawa West", "Kenyatta Uni", "Ruiru"],
    fare: 160,
    duration: "65 mins",
    distance: "24 km",
    isExpress: true,
  },

  // --- Ngong Road → Karen (destinationId: 18) ---
  {
    id: 10,
    destinationId: 18,
    routeNumber: "24",
    path: ["Railways", "Adams", "Dagoretti Corner", "Karen Hardy", "Karen"],
    fare: 80,
    duration: "45 mins",
    distance: "16 km",
    isExpress: false,
  },
  {
    id: 11,
    destinationId: 18,
    routeNumber: "24B",
    path: ["Railways", "Prestige", "Junction", "Karen C", "Karen"],
    fare: 70,
    duration: "50 mins",
    distance: "17 km",
    isExpress: false,
  },
  {
    id: 12,
    destinationId: 18,
    routeNumber: "58",
    path: ["CBD", "Bomas", "Hardy", "Karen Crossroads", "Karen"],
    fare: 90,
    duration: "55 mins",
    distance: "18 km",
    isExpress: false,
  },

  // --- Ngong Road → Ngong (destinationId: 19) ---
  {
    id: 13,
    destinationId: 19,
    routeNumber: "111",
    path: ["Railways", "Adams", "Junction", "Karen", "Ngong"],
    fare: 100,
    duration: "1h 10m",
    distance: "23 km",
    isExpress: false,
  },
  {
    id: 14,
    destinationId: 19,
    routeNumber: "111B",
    path: ["Railways", "Prestige", "Dagoretti Corner", "Ngong Rd", "Ngong"],
    fare: 90,
    duration: "1h 20m",
    distance: "24 km",
    isExpress: false,
  },
  {
    id: 15,
    destinationId: 19,
    routeNumber: "126",
    path: ["Railways", "Bomas", "Ongata Rongai Jct", "Kibiko", "Ngong"],
    fare: 120,
    duration: "1h 15m",
    distance: "25 km",
    isExpress: false,
  },

  // --- Jogoo Road → Umoja (destinationId: 13) ---
  {
    id: 16,
    destinationId: 13,
    routeNumber: "35/60",
    path: ["Muthurwa", "City Stadium", "Makadara", "Donholm", "Umoja"],
    fare: 70,
    duration: "50 mins",
    distance: "10 km",
    isExpress: false,
  },
  {
    id: 17,
    destinationId: 13,
    routeNumber: "60",
    path: ["Muthurwa", "Jogoo Rd", "Harambee", "Komarock", "Umoja"],
    fare: 60,
    duration: "55 mins",
    distance: "11 km",
    isExpress: false,
  },
  {
    id: 18,
    destinationId: 13,
    routeNumber: "35",
    path: ["Muthurwa", "Makadara", "Kayole Jct", "Soweto", "Umoja"],
    fare: 65,
    duration: "60 mins",
    distance: "12 km",
    isExpress: false,
  },

  // --- Jogoo Road → Donholm (destinationId: 14) ---
  {
    id: 19,
    destinationId: 14,
    routeNumber: "58",
    path: ["Muthurwa", "City Stadium", "Makadara", "Donholm"],
    fare: 50,
    duration: "35 mins",
    distance: "8 km",
    isExpress: false,
  },
  {
    id: 20,
    destinationId: 14,
    routeNumber: "58B",
    path: ["Muthurwa", "Jogoo Rd", "Harambee Est", "Donholm"],
    fare: 45,
    duration: "40 mins",
    distance: "8.5 km",
    isExpress: false,
  },
  {
    id: 21,
    destinationId: 14,
    routeNumber: "9",
    path: ["CBD", "Jogoo Rd", "Makadara", "Donholm"],
    fare: 55,
    duration: "45 mins",
    distance: "9 km",
    isExpress: false,
  },

  // --- Waiyaki Way → Westlands (destinationId: 6) ---
  {
    id: 22,
    destinationId: 6,
    routeNumber: "23",
    path: ["CBD", "Museum Hill", "Westlands"],
    fare: 50,
    duration: "20 mins",
    distance: "5 km",
    isExpress: false,
  },
  {
    id: 23,
    destinationId: 6,
    routeNumber: "105",
    path: ["CBD", "Parklands Jct", "Westlands"],
    fare: 40,
    duration: "30 mins",
    distance: "6 km",
    isExpress: false,
  },
  {
    id: 24,
    destinationId: 6,
    routeNumber: "23C",
    path: ["CBD", "University Way", "Chiromo", "Westlands"],
    fare: 45,
    duration: "25 mins",
    distance: "5.5 km",
    isExpress: false,
  },

  // --- Waiyaki Way → Kikuyu (destinationId: 8) ---
  {
    id: 25,
    destinationId: 8,
    routeNumber: "46",
    path: ["CBD", "Westlands", "Kangemi", "Kikuyu"],
    fare: 80,
    duration: "50 mins",
    distance: "18 km",
    isExpress: false,
  },
  {
    id: 26,
    destinationId: 8,
    routeNumber: "46B",
    path: ["CBD", "Waiyaki Way", "Uthiru", "Kikuyu"],
    fare: 70,
    duration: "55 mins",
    distance: "19 km",
    isExpress: false,
  },
  {
    id: 27,
    destinationId: 8,
    routeNumber: "102",
    path: ["CBD", "Westlands", "Kabete", "Kikuyu"],
    fare: 90,
    duration: "60 mins",
    distance: "20 km",
    isExpress: false,
  },
];

// JUNCTION TABLE: route_saccos
// FK: routeId → routes.id, saccoId → saccos.id
// Replaces the inline `matatus` arrays on each route
export const routeSaccos = [
  {
    routeId: 1,
    saccoId: 1,
    servicedStops: ["CBD", "Pangani", "Muthaiga", "Roysambu", "Kasarani"],
    isExpress: false,
  },
  {
    routeId: 1,
    saccoId: 2,
    servicedStops: ["CBD", "Pangani", "Muthaiga", "Roysambu", "Kasarani"],
    isExpress: false,
  },
  {
    routeId: 1,
    saccoId: 3,
    servicedStops: ["CBD", "Roysambu", "Kasarani"],
    isExpress: false,
  },
  {
    routeId: 1,
    saccoId: 4,
    servicedStops: ["CBD", "Kasarani"],
    isExpress: true,
  },
  {
    routeId: 1,
    saccoId: 5,
    servicedStops: ["CBD", "Pangani", "Kasarani"],
    isExpress: false,
  },
  {
    routeId: 1,
    saccoId: 6,
    servicedStops: ["CBD", "Muthaiga", "Kasarani"],
    isExpress: false,
  },
  {
    routeId: 1,
    saccoId: 7,
    servicedStops: ["CBD", "Pangani", "Muthaiga", "Roysambu", "Kasarani"],
    isExpress: false,
  },
  {
    routeId: 1,
    saccoId: 8,
    servicedStops: ["CBD", "Kasarani"],
    isExpress: true,
  },
  {
    routeId: 1,
    saccoId: 9,
    servicedStops: ["CBD", "Kasarani"],
    isExpress: true,
  },
  {
    routeId: 1,
    saccoId: 10,
    servicedStops: ["CBD", "Pangani", "Kasarani"],
    isExpress: false,
  },
  {
    routeId: 1,
    saccoId: 11,
    servicedStops: ["CBD", "Kasarani"],
    isExpress: true,
  },
  {
    routeId: 1,
    saccoId: 12,
    servicedStops: ["CBD", "Kasarani"],
    isExpress: true,
  },

  // Route 237 (routeId: 2)
  {
    routeId: 2,
    saccoId: 1,
    servicedStops: ["CBD", "Kasarani"],
    isExpress: true,
  },
  {
    routeId: 2,
    saccoId: 4,
    servicedStops: ["CBD", "Allsops", "Survey", "Garden City", "Kasarani"],
    isExpress: false,
  },
  {
    routeId: 2,
    saccoId: 9,
    servicedStops: ["CBD", "Kasarani"],
    isExpress: true,
  },
  {
    routeId: 2,
    saccoId: 7,
    servicedStops: ["CBD", "Allsops", "Kasarani"],
    isExpress: false,
  },
  {
    routeId: 2,
    saccoId: 17,
    servicedStops: ["CBD", "Allsops", "Survey", "Garden City", "Kasarani"],
    isExpress: false,
  },
  {
    routeId: 2,
    saccoId: 8,
    servicedStops: ["CBD", "Kasarani"],
    isExpress: true,
  },

  // Route 60F (routeId: 3)
  {
    routeId: 3,
    saccoId: 10,
    servicedStops: ["CBD", "Ngara", "Roysambu", "Kasarani"],
    isExpress: false,
  },
  {
    routeId: 3,
    saccoId: 11,
    servicedStops: ["CBD", "Kasarani"],
    isExpress: true,
  },
  {
    routeId: 3,
    saccoId: 5,
    servicedStops: ["CBD", "Ngara", "Kasarani"],
    isExpress: false,
  },
  {
    routeId: 3,
    saccoId: 6,
    servicedStops: ["CBD", "Highridge", "Kasarani"],
    isExpress: false,
  },
  {
    routeId: 3,
    saccoId: 12,
    servicedStops: ["CBD", "Kasarani"],
    isExpress: true,
  },
  {
    routeId: 3,
    saccoId: 3,
    servicedStops: ["CBD", "Ngara", "Highridge", "Roysambu", "Kasarani"],
    isExpress: false,
  },

  // Route 45 (routeId: 4)
  {
    routeId: 4,
    saccoId: 13,
    servicedStops: ["CBD", "Ngara", "Allsops", "Roysambu", "Githurai"],
    isExpress: false,
  },
  {
    routeId: 4,
    saccoId: 1,
    servicedStops: ["CBD", "Githurai"],
    isExpress: true,
  },
  {
    routeId: 4,
    saccoId: 14,
    servicedStops: ["CBD", "Allsops", "Githurai"],
    isExpress: false,
  },
  {
    routeId: 4,
    saccoId: 7,
    servicedStops: ["CBD", "Ngara", "Allsops", "Roysambu", "Githurai"],
    isExpress: false,
  },

  // Route 45B (routeId: 5)
  {
    routeId: 5,
    saccoId: 8,
    servicedStops: ["CBD", "Githurai"],
    isExpress: true,
  },
  {
    routeId: 5,
    saccoId: 9,
    servicedStops: ["CBD", "Githurai"],
    isExpress: true,
  },
  {
    routeId: 5,
    saccoId: 13,
    servicedStops: ["CBD", "Pangani", "Muthaiga", "Kahawa West", "Githurai"],
    isExpress: false,
  },
  {
    routeId: 5,
    saccoId: 10,
    servicedStops: ["CBD", "Pangani", "Githurai"],
    isExpress: false,
  },
  {
    routeId: 5,
    saccoId: 2,
    servicedStops: ["CBD", "Pangani", "Muthaiga", "Kahawa West", "Githurai"],
    isExpress: false,
  },

  // Route 100 (routeId: 6)
  {
    routeId: 6,
    saccoId: 1,
    servicedStops: ["CBD", "Githurai"],
    isExpress: true,
  },
  {
    routeId: 6,
    saccoId: 7,
    servicedStops: [
      "CBD",
      "Allsops",
      "Kahawa Sukari",
      "Kenyatta Uni",
      "Githurai",
    ],
    isExpress: false,
  },
  { routeId: 6, saccoId: 14, servicedStops: ["CBD", "Allsops", "Githurai"] },
  {
    routeId: 6,
    saccoId: 5,
    servicedStops: ["CBD", "Kahawa Sukari", "Githurai"],
    isExpress: false,
  },
  {
    routeId: 6,
    saccoId: 3,
    servicedStops: [
      "CBD",
      "Allsops",
      "Kahawa Sukari",
      "Kenyatta Uni",
      "Githurai",
    ],
    isExpress: false,
  },

  // Route 145 (routeId: 7)
  { routeId: 7, saccoId: 1, servicedStops: ["CBD", "Ruiru"], isExpress: true },
  {
    routeId: 7,
    saccoId: 15,
    servicedStops: ["CBD", "Pangani", "Kahawa Sukari", "Kihunguro", "Ruiru"],
    isExpress: false,
  },
  {
    routeId: 7,
    saccoId: 7,
    servicedStops: ["CBD", "Kahawa Sukari", "Ruiru"],
    isExpress: false,
  },
  { routeId: 7, saccoId: 9, servicedStops: ["CBD", "Ruiru"], isExpress: true },
  {
    routeId: 7,
    saccoId: 16,
    servicedStops: ["CBD", "Pangani", "Kahawa Sukari", "Kihunguro", "Ruiru"],
    isExpress: false,
  },

  // Route 145B (routeId: 8)
  { routeId: 8, saccoId: 8, servicedStops: ["CBD", "Ruiru"], isExpress: true },
  {
    routeId: 8,
    saccoId: 10,
    servicedStops: ["CBD", "Allsops", "Ruiru"],
    isExpress: false,
  },
  {
    routeId: 8,
    saccoId: 14,
    servicedStops: ["CBD", "Roysambu", "Githurai", "Ruiru"],
    isExpress: false,
  },
  { routeId: 8, saccoId: 6, servicedStops: ["CBD", "Ruiru"], isExpress: true },

  // Route 260 (routeId: 9)
  { routeId: 9, saccoId: 1, servicedStops: ["CBD", "Ruiru"], isExpress: true },
  {
    routeId: 9,
    saccoId: 7,
    servicedStops: ["CBD", "Muthaiga", "Kahawa West", "Kenyatta Uni", "Ruiru"],
    isExpress: false,
  },
  {
    routeId: 9,
    saccoId: 16,
    servicedStops: ["CBD", "Kenyatta Uni", "Ruiru"],
    isExpress: false,
  },
  {
    routeId: 9,
    saccoId: 2,
    servicedStops: ["CBD", "Muthaiga", "Kahawa West", "Kenyatta Uni", "Ruiru"],
    isExpress: false,
  },

  // Route 24 — Karen (routeId: 10)
  {
    routeId: 10,
    saccoId: 23,
    servicedStops: [
      "Railways",
      "Adams",
      "Dagoretti Corner",
      "Karen Hardy",
      "Karen",
    ],
    isExpress: false,
  },
  {
    routeId: 10,
    saccoId: 30,
    servicedStops: ["Railways", "Karen Hardy", "Karen"],
    isExpress: false,
  },
  {
    routeId: 10,
    saccoId: 1,
    servicedStops: ["Railways", "Karen"],
    isExpress: true,
  },
  {
    routeId: 10,
    saccoId: 24,
    servicedStops: ["Railways", "Adams", "Karen"],
    isExpress: false,
  },
  {
    routeId: 10,
    saccoId: 29,
    servicedStops: [
      "Railways",
      "Adams",
      "Dagoretti Corner",
      "Karen Hardy",
      "Karen",
    ],
    isExpress: false,
  },

  // Route 24B (routeId: 11)
  {
    routeId: 11,
    saccoId: 25,
    servicedStops: ["Railways", "Prestige", "Junction", "Karen C", "Karen"],
    isExpress: false,
  },
  {
    routeId: 11,
    saccoId: 30,
    servicedStops: ["Railways", "Karen"],
    isExpress: true,
  },
  {
    routeId: 11,
    saccoId: 26,
    servicedStops: ["Railways", "Junction", "Karen"],
    isExpress: false,
  },
  {
    routeId: 11,
    saccoId: 28,
    servicedStops: ["Railways", "Prestige", "Karen"],
    isExpress: false,
  },

  // Route 58 — Karen (routeId: 12)
  { routeId: 12, saccoId: 1, servicedStops: ["CBD", "Karen"], isExpress: true },
  {
    routeId: 12,
    saccoId: 23,
    servicedStops: ["CBD", "Bomas", "Hardy", "Karen Crossroads", "Karen"],
    isExpress: false,
  },
  {
    routeId: 12,
    saccoId: 29,
    servicedStops: ["CBD", "Hardy", "Karen"],
    isExpress: false,
  },
  {
    routeId: 12,
    saccoId: 24,
    servicedStops: ["CBD", "Karen Crossroads", "Karen"],
    isExpress: false,
  },

  // Route 111 — Ngong (routeId: 13)
  {
    routeId: 13,
    saccoId: 1,
    servicedStops: ["Railways", "Ngong"],
    isExpress: true,
  },
  {
    routeId: 13,
    saccoId: 24,
    servicedStops: ["Railways", "Adams", "Junction", "Karen", "Ngong"],
    isExpress: false,
  },
  {
    routeId: 13,
    saccoId: 23,
    servicedStops: ["Railways", "Adams", "Ngong"],
    isExpress: false,
  },
  {
    routeId: 13,
    saccoId: 25,
    servicedStops: ["Railways", "Karen", "Ngong"],
    isExpress: false,
  },
  {
    routeId: 13,
    saccoId: 26,
    servicedStops: ["Railways", "Adams", "Junction", "Karen", "Ngong"],
    isExpress: false,
  },
  {
    routeId: 13,
    saccoId: 27,
    servicedStops: ["Railways", "Ngong"],
    isExpress: true,
  },
  {
    routeId: 13,
    saccoId: 28,
    servicedStops: ["Railways", "Karen", "Ngong"],
    isExpress: false,
  },
  {
    routeId: 13,
    saccoId: 29,
    servicedStops: ["Railways", "Adams", "Junction", "Karen", "Ngong"],
    isExpress: false,
  },

  // Route 111B (routeId: 14)
  {
    routeId: 14,
    saccoId: 25,
    servicedStops: [
      "Railways",
      "Prestige",
      "Dagoretti Corner",
      "Ngong Rd",
      "Ngong",
    ],
    isExpress: false,
  },
  {
    routeId: 14,
    saccoId: 24,
    servicedStops: ["Railways", "Prestige", "Ngong"],
    isExpress: false,
  },
  {
    routeId: 14,
    saccoId: 27,
    servicedStops: ["Railways", "Dagoretti Corner", "Ngong"],
    isExpress: false,
  },
  {
    routeId: 14,
    saccoId: 23,
    servicedStops: ["Railways", "Ngong"],
    isExpress: true,
  },
  {
    routeId: 14,
    saccoId: 29,
    servicedStops: [
      "Railways",
      "Prestige",
      "Dagoretti Corner",
      "Ngong Rd",
      "Ngong",
    ],
    isExpress: false,
  },

  // Route 126 (routeId: 15)
  {
    routeId: 15,
    saccoId: 26,
    servicedStops: [
      "Railways",
      "Bomas",
      "Ongata Rongai Jct",
      "Kibiko",
      "Ngong",
    ],
    isExpress: false,
  },
  {
    routeId: 15,
    saccoId: 28,
    servicedStops: ["Railways", "Kibiko", "Ngong"],
    isExpress: false,
  },
  {
    routeId: 15,
    saccoId: 1,
    servicedStops: ["Railways", "Ngong"],
    isExpress: false,
  },
  {
    routeId: 15,
    saccoId: 27,
    servicedStops: ["Railways", "Bomas", "Ngong"],
    isExpress: false,
  },

  // Route 35/60 (routeId: 16)
  {
    routeId: 16,
    saccoId: 18,
    servicedStops: ["Muthurwa", "City Stadium", "Makadara", "Donholm", "Umoja"],
    isExpress: false,
  },
  {
    routeId: 16,
    saccoId: 6,
    servicedStops: ["Muthurwa", "Makadara", "Umoja"],
    isExpress: false,
  },
  {
    routeId: 16,
    saccoId: 10,
    servicedStops: ["Muthurwa", "Donholm", "Umoja"],
    isExpress: false,
  },
  {
    routeId: 16,
    saccoId: 19,
    servicedStops: ["Muthurwa", "City Stadium", "Makadara", "Donholm", "Umoja"],
    isExpress: false,
  },

  // Route 60 (routeId: 17)
  {
    routeId: 17,
    saccoId: 10,
    servicedStops: ["Muthurwa", "Jogoo Rd", "Harambee", "Komarock", "Umoja"],
    isExpress: false,
  },
  {
    routeId: 17,
    saccoId: 19,
    servicedStops: ["Muthurwa", "Harambee", "Umoja"],
    isExpress: false,
  },
  {
    routeId: 17,
    saccoId: 18,
    servicedStops: ["Muthurwa", "Umoja"],
    isExpress: true,
  },
  {
    routeId: 17,
    saccoId: 20,
    servicedStops: ["Muthurwa", "Jogoo Rd", "Harambee", "Komarock", "Umoja"],
    isExpress: false,
  },

  // Route 35 (routeId: 18)
  {
    routeId: 18,
    saccoId: 6,
    servicedStops: ["Muthurwa", "Makadara", "Kayole Jct", "Soweto", "Umoja"],
    isExpress: false,
  },
  {
    routeId: 18,
    saccoId: 18,
    servicedStops: ["Muthurwa", "Kayole Jct", "Umoja"],
    isExpress: false,
  },
  {
    routeId: 18,
    saccoId: 19,
    servicedStops: ["Muthurwa", "Umoja"],
    isExpress: true,
  },
  {
    routeId: 18,
    saccoId: 10,
    servicedStops: ["Muthurwa", "Makadara", "Soweto", "Umoja"],
    isExpress: false,
  },

  // Route 58 — Donholm (routeId: 19)
  {
    routeId: 19,
    saccoId: 10,
    servicedStops: ["Muthurwa", "City Stadium", "Makadara", "Donholm"],
    isExpress: false,
  },
  {
    routeId: 19,
    saccoId: 19,
    servicedStops: ["Muthurwa", "Makadara", "Donholm"],
    isExpress: false,
  },
  {
    routeId: 19,
    saccoId: 20,
    servicedStops: ["Muthurwa", "Donholm"],
    isExpress: true,
  },
  {
    routeId: 19,
    saccoId: 18,
    servicedStops: ["Muthurwa", "City Stadium", "Makadara", "Donholm"],
    isExpress: false,
  },

  // Route 58B (routeId: 20)
  {
    routeId: 20,
    saccoId: 19,
    servicedStops: ["Muthurwa", "Jogoo Rd", "Harambee Est", "Donholm"],
    isExpress: false,
  },
  {
    routeId: 20,
    saccoId: 6,
    servicedStops: ["Muthurwa", "Donholm"],
    isExpress: true,
  },
  {
    routeId: 20,
    saccoId: 10,
    servicedStops: ["Muthurwa", "Harambee Est", "Donholm"],
    isExpress: false,
  },

  // Route 9 (routeId: 21)
  {
    routeId: 21,
    saccoId: 20,
    servicedStops: ["CBD", "Jogoo Rd", "Makadara", "Donholm"],
    isExpress: false,
  },
  {
    routeId: 21,
    saccoId: 18,
    servicedStops: ["CBD", "Makadara", "Donholm"],
    isExpress: false,
  },
  {
    routeId: 21,
    saccoId: 10,
    servicedStops: ["CBD", "Donholm"],
    isExpress: true,
  },
  {
    routeId: 21,
    saccoId: 19,
    servicedStops: ["CBD", "Jogoo Rd", "Makadara", "Donholm"],
    isExpress: false,
  },

  // Route 23 — Westlands (routeId: 22)
  {
    routeId: 22,
    saccoId: 1,
    servicedStops: ["CBD", "Westlands"],
    isExpress: true,
  },
  {
    routeId: 22,
    saccoId: 21,
    servicedStops: ["CBD", "Museum Hill", "Westlands"],
    isExpress: false,
  },
  {
    routeId: 22,
    saccoId: 7,
    servicedStops: ["CBD", "Museum Hill", "Westlands"],
    isExpress: false,
  },
  {
    routeId: 22,
    saccoId: 23,
    servicedStops: ["CBD", "Westlands"],
    isExpress: true,
  },

  // Route 105 (routeId: 23)
  {
    routeId: 23,
    saccoId: 22,
    servicedStops: ["CBD", "Parklands Jct", "Westlands"],
    isExpress: false,
  },
  {
    routeId: 23,
    saccoId: 23,
    servicedStops: ["CBD", "Westlands"],
    isExpress: true,
  },
  {
    routeId: 23,
    saccoId: 7,
    servicedStops: ["CBD", "Parklands Jct", "Westlands"],
    isExpress: false,
  },

  // Route 23C (routeId: 24)
  {
    routeId: 24,
    saccoId: 21,
    servicedStops: ["CBD", "University Way", "Chiromo", "Westlands"],
    isExpress: false,
  },
  {
    routeId: 24,
    saccoId: 1,
    servicedStops: ["CBD", "Westlands"],
    isExpress: true,
  },
  {
    routeId: 24,
    saccoId: 22,
    servicedStops: ["CBD", "Chiromo", "Westlands"],
    isExpress: false,
  },
  {
    routeId: 24,
    saccoId: 7,
    servicedStops: ["CBD", "University Way", "Chiromo", "Westlands"],
    isExpress: false,
  },

  // Route 46 — Kikuyu (routeId: 25)
  {
    routeId: 25,
    saccoId: 22,
    servicedStops: ["CBD", "Westlands", "Kangemi", "Kikuyu"],
    isExpress: false,
  },
  {
    routeId: 25,
    saccoId: 1,
    servicedStops: ["CBD", "Kikuyu"],
    isExpress: true,
  },
  {
    routeId: 25,
    saccoId: 7,
    servicedStops: ["CBD", "Westlands", "Kikuyu"],
    isExpress: false,
  },
  {
    routeId: 25,
    saccoId: 23,
    servicedStops: ["CBD", "Kangemi", "Kikuyu"],
    isExpress: false,
  },

  // Route 46B (routeId: 26)
  {
    routeId: 26,
    saccoId: 22,
    servicedStops: ["CBD", "Waiyaki Way", "Uthiru", "Kikuyu"],
    isExpress: false,
  },
  {
    routeId: 26,
    saccoId: 7,
    servicedStops: ["CBD", "Uthiru", "Kikuyu"],
    isExpress: false,
  },
  {
    routeId: 26,
    saccoId: 23,
    servicedStops: ["CBD", "Kikuyu"],
    isExpress: true,
  },

  // Route 102 (routeId: 27)
  {
    routeId: 27,
    saccoId: 1,
    servicedStops: ["CBD", "Kikuyu"],
    isExpress: true,
  },
  {
    routeId: 27,
    saccoId: 22,
    servicedStops: ["CBD", "Westlands", "Kabete", "Kikuyu"],
    isExpress: false,
  },
  {
    routeId: 27,
    saccoId: 7,
    servicedStops: ["CBD", "Kabete", "Kikuyu"],
    isExpress: false,
  },
  {
    routeId: 27,
    saccoId: 23,
    servicedStops: ["CBD", "Westlands", "Kabete", "Kikuyu"],
    isExpress: false,
  },
];

// ============================================================
// HELPER FUNCTIONS
// These replace the old nested object lookups and mirror
// what SQL joins / ORM queries would do in a real DB.
// ============================================================

export const getRoadsByTown = (townId) =>
  roads.filter((r) => r.townId === townId);

export const getDestinationsByRoad = (roadId) =>
  destinations.filter((d) => d.roadId === roadId);

export const getRoutesByDestination = (destinationId) =>
  routes.filter((r) => r.destinationId === destinationId);

export const getSaccosByRoute = (routeId) => {
  const entries = routeSaccos.filter((rs) => rs.routeId === routeId);
  return entries.map((entry) => ({
    ...saccos.find((s) => s.id === entry.saccoId),
    servicedStops: entry.servicedStops,
    isExpress: entry.isExpress
  }));
};

export const getTownByName = (name) => towns.find((t) => t.name === name);

export const getRoadByName = (name) => roads.find((r) => r.name === name);

export const getDestinationByName = (roadId, name) =>
  destinations.find((d) => d.roadId === roadId && d.name === name);

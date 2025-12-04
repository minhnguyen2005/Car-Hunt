// src/api/mockApi.js
// Mock dataset

import { getApprovedPublicSellRequests, getPublicSellRequest } from "./sellApi";
import placeholderImg from "../assets/logo.png";

// Tesla Model 3
import teslaMain from "../assets/Tesla Model 3 Standard Range Plus/download.jpg";
import teslaGallery1 from "../assets/Tesla Model 3 Standard Range Plus/B18FA59B-5FF1-4E1D-BA11-3C9226D7959B.jpeg";
import teslaGallery2 from "../assets/Tesla Model 3 Standard Range Plus/ghislain-bukura-2SnQbYV5yTk-unsplash.jpg";
import teslaGallery3 from "../assets/Tesla Model 3 Standard Range Plus/e31f0e52-5dc2-468f-a53a-eaf75fa3f412-1_all_14020.jpg";
import teslaGallery4 from "../assets/Tesla Model 3 Standard Range Plus/Tesla Model 3 Long Range AWD 2022 Price In USA , Features And Specs.jpg";

// Ford F-250 Super Duty
import fordF250Main from "../assets/Ford F-250 Super Duty/2026_ford_f-250-super-duty_crew-cab-pickup_lariat_fq_oem_3_1600x1067.jpg";
import fordF250Gallery1 from "../assets/Ford F-250 Super Duty/2026_ford_f-250-super-duty_crew-cab-pickup_lariat_fq_oem_1_815.avif";
import fordF250Gallery2 from "../assets/Ford F-250 Super Duty/2026_ford_f-250-super-duty_crew-cab-pickup_lariat_pr_izmo_1_1600x1067.avif";
import fordF250Gallery3 from "../assets/Ford F-250 Super Duty/2026_ford_f-250-super-duty_crew-cab-pickup_lariat_rqn_izmo_1_1600x1067.avif";
import fordF250Gallery4 from "../assets/Ford F-250 Super Duty/2026_ford_f-250-super-duty_crew-cab-pickup_xl_fq_oem_1_1600x1067.avif";
import fordF250Gallery5 from "../assets/Ford F-250 Super Duty/2026_ford_f-250-super-duty_crew-cab-pickup_xl_fq_oem_2_1600x1067.avif";
import fordF250Gallery6 from "../assets/Ford F-250 Super Duty/2026_ford_f-250-super-duty_crew-cab-pickup_xl_rq_oem_1_1600x1067.avif";

// Honda Pilot
import hondaPilotMain from "../assets/Honda Pilot Touring 7-Passenger/1eac7b47254c19605f152bfa5338eaf6.jpg";
import hondaPilotGallery1 from "../assets/Honda Pilot Touring 7-Passenger/3bbdf73263865502a5e355d3615ef98e.jpg";
import hondaPilotGallery2 from "../assets/Honda Pilot Touring 7-Passenger/490e847282d9f9c222880292d38df5da.jpg";
import hondaPilotGallery3 from "../assets/Honda Pilot Touring 7-Passenger/5d7bbb4e7515ef1b7d9eb90b31eedc5c.jpg";

// Chevrolet Equinox
import chevyEquinoxMain from "../assets/Chevrolet Equinox LS/0b0fc237ca7b89989f705de03d688f3b.jpg";
import chevyEquinoxGallery1 from "../assets/Chevrolet Equinox LS/618a50b3b0fe792b5c51731ac0cd8b26.jpg";
import chevyEquinoxGallery2 from "../assets/Chevrolet Equinox LS/9eb7cc943f38d3bd6a4dbe0afd07473c.jpg";
import chevyEquinoxGallery3 from "../assets/Chevrolet Equinox LS/a6a5f57d6b02d5a952a40a7be3c21704.jpg";

// Kia Sorento
import kiaSorentoMain from "../assets/Kia Sorento S/z3977511561961_a393e68e6178b19263b347ee52c38e63.jpg";
import kiaSorentoGallery1 from "../assets/Kia Sorento S/z3977511562713_be841f900c9e164da1863d99032609fe.jpg";
import kiaSorentoGallery2 from "../assets/Kia Sorento S/z3977511564585_b40802d19abe9f71d26b76f81df67411.jpg";
import kiaSorentoGallery3 from "../assets/Kia Sorento S/z3977511566372_650f5faa4fe44d3236ca6b13e541b5a4.jpg";
import kiaSorentoGallery4 from "../assets/Kia Sorento S/z3977511569628_883ee78079bcda82d67c7d604b43d137.jpg";
import kiaSorentoGallery5 from "../assets/Kia Sorento S/z3977511569631_c5909949fb93bf2e5f4ed7a6c481d497.jpg";
import kiaSorentoGallery6 from "../assets/Kia Sorento S/z3977511570227_c150e3ad927e483df75d732640ac8283.jpg";
import kiaSorentoGallery7 from "../assets/Kia Sorento S/z3977511574960_01701c07ba50bbc859c2675922a2eb9f.jpg";

// Toyota Camry
import camryMain from "../assets/Toyota Camry LE/toyota-camry-se-awd-2025-760556.jpg";
import camryGallery1 from "../assets/Toyota Camry LE/toyota-camry-se-awd-2025-760557.jpg";
import camryGallery2 from "../assets/Toyota Camry LE/toyota-camry-se-awd-2025-760558.jpg";
import camryGallery3 from "../assets/Toyota Camry LE/toyota-camry-se-awd-2025-760560.jpg";

// Toyota RAV4
import rav4Main from "../assets/Toyota RAV4 XLE/toyota-rav4-xle-awd-premium-blue-flame-2019-520762.jpg";
import rav4Gallery1 from "../assets/Toyota RAV4 XLE/toyota-rav4-xle-awd-premium-blue-flame-2019-520763.jpg";
import rav4Gallery2 from "../assets/Toyota RAV4 XLE/toyota-rav4-xle-awd-premium-blue-flame-2019-520771.jpg";

// Ford Explorer
import explorerMain from "../assets/Ford Explorer XLT/2023_ford_explorer_4dr-suv_platinum_fq_oem_1_1600x1067.avif";
import explorerGallery1 from "../assets/Ford Explorer XLT/2023_ford_explorer_4dr-suv_platinum_fq_oem_2_1600x1067.avif";
import explorerGallery2 from "../assets/Ford Explorer XLT/2023_ford_explorer_4dr-suv_king-ranch_fq_oem_3_1600x1067.avif";
import explorerGallery3 from "../assets/Ford Explorer XLT/2023_ford_explorer_4dr-suv_st_fq_oem_1_1600x1067.avif";
import explorerGallery4 from "../assets/Ford Explorer XLT/2023_ford_explorer_4dr-suv_st_fq_oem_2_1600x1067.avif";
import explorerGallery5 from "../assets/Ford Explorer XLT/2023_ford_explorer_4dr-suv_st_fq_oem_3_1600x1067.avif";
import explorerGallery6 from "../assets/Ford Explorer XLT/2023_ford_explorer_4dr-suv_timberline_fq_oem_1_1600x1067.avif";
import explorerGallery7 from "../assets/Ford Explorer XLT/2023_ford_explorer_4dr-suv_timberline_fq_oem_2_1600x1067.avif";
import explorerGallery8 from "../assets/Ford Explorer XLT/2023_ford_explorer_4dr-suv_timberline_fq_oem_3_1600x1067.avif";

// Ford F-150
import f150Main from "../assets/Ford F-150 Lariat/2025_ford_f-150_crew-cab-pickup_stx_fq_oem_1_1600x1067.avif";
import f150Gallery1 from "../assets/Ford F-150 Lariat/2025_ford_f-150_crew-cab-pickup_lariat_rq_oem_1_1600x1067.avif";
import f150Gallery2 from "../assets/Ford F-150 Lariat/2025_ford_f-150_crew-cab-pickup_raptor_rq_oem_1_1600x1067.avif";
import f150Gallery3 from "../assets/Ford F-150 Lariat/2025_ford_f-150_crew-cab-pickup_stx_fq_oem_2_1600x1067.webp";
import f150Gallery4 from "../assets/Ford F-150 Lariat/2025_ford_f-150_crew-cab-pickup_stx_rq_oem_1_1600x1067.jpg";
import f150Gallery5 from "../assets/Ford F-150 Lariat/2025_ford_f-150_crew-cab-pickup_tremor_fq_oem_1_1600x1067.avif";
import f150Gallery6 from "../assets/Ford F-150 Lariat/2025_ford_f-150_crew-cab-pickup_tremor_fq_oem_2_1600x1067.avif";
import f150Gallery7 from "../assets/Ford F-150 Lariat/2025_ford_f-150_crew-cab-pickup_tremor_fq_oem_3_1600x1067.avif";
import f150Gallery8 from "../assets/Ford F-150 Lariat/2025_ford_f-150_crew-cab-pickup_xlt_fq_oem_1_1600x1067.avif";
import f150Gallery9 from "../assets/Ford F-150 Lariat/2025_ford_f-150_crew-cab-pickup_xlt_fq_oem_2_1600x1067.webp";

// Ford Mustang
import mustangMain from "../assets/Ford Mustang GT/202420Mustang20front20quarter%20angle.avif";
import mustangGallery1 from "../assets/Ford Mustang GT/202420Mustang20front20quarter%20low.avif";
import mustangGallery2 from "../assets/Ford Mustang GT/202420Mustang20rear.avif";
import mustangGallery3 from "../assets/Ford Mustang GT/202420Mustang20rear20quarter%20high.avif";

// Toyota Corolla
import corollaMain from "../assets/Toyota Corolla SE/2024_Corolla_Hero.jpg";
import corollaGallery1 from "../assets/Toyota Corolla SE/23_Corolla_SE_RubyFlarePearl_01.png";
import corollaGallery2 from "../assets/Toyota Corolla SE/23_Corolla_SE_RubyFlarePearl_02.png";
import corollaGallery3 from "../assets/Toyota Corolla SE/23_Corolla_SE_RubyFlarePearl_03.png";
import corollaGallery4 from "../assets/Toyota Corolla SE/23_Corolla_SE_RubyFlarePearl_04.png";

// Toyota Highlander
import highlanderMain from "../assets/Toyota Highlander XLE/2024_toyota_highlander-hybrid_4dr-suv_platinum_f_oem_1_1600x1067.avif";
import highlanderGallery1 from "../assets/Toyota Highlander XLE/2024_toyota_highlander-hybrid_4dr-suv_xle-nightshade_fq_oem_1_1600x1067.avif";
import highlanderGallery2 from "../assets/Toyota Highlander XLE/2024_toyota_highlander-hybrid_4dr-suv_limited_pr_izmo_1_1600x1067.avif";
import highlanderGallery3 from "../assets/Toyota Highlander XLE/2024_toyota_highlander-hybrid_4dr-suv_platinum_s_oem_1_1600x1067.jpg";
import highlanderGallery4 from "../assets/Toyota Highlander XLE/2024_toyota_highlander-hybrid_4dr-suv_xle-nightshade_rq_oem_1_1600x1067.avif";
import highlanderGallery5 from "../assets/Toyota Highlander XLE/2024_toyota_highlander-hybrid_4dr-suv_xle-nightshade_s_oem_1_1600x1067.avif";
const MOCK_CARS = [
  {
    id: 1,
    model: "Model 3",
    name: "Tesla Model 3 Standard Range Plus",
    brand: "Tesla",
    year: 2020,
    price: 57148,
    condition: "new",
    featured: true,
    location: "Florida, USA",
    fuel: "Electric",
    tags: ["new", "electric"],
    img: teslaMain,
    description:
      "The Tesla Model 3 Standard Range Plus combines cutting-edge electric technology with exceptional performance. Featuring a sleek design and advanced autopilot capabilities, this vehicle represents the future of sustainable transportation.",
    features: [
      "Autopilot",
      "Summon",
      "Autopark",
      "Auto Lane Change",
      "15 inch Touchscreen Display",
      "360° Camera",
      "12 Ultrasonic Sensor",
    ],
    bodyType: "Sedan",
    seats: 5,
    color: "Red",
    mileage: "340 km",
    transmission: "Automatic",
    driveType: "Rear-wheel Drive",
    power: "283 hp (211 kW)",
    battery: "55.0 kWh",
    chargeSpeed: "64 km/h",
    chargePort: "Type 2",
    chargeTime: "330 min",
    length: "4694 mm",
    width: "1849 mm",
    height: "1443 mm",
    cargo: "542 L",
    gallery: [
      teslaMain,
      teslaGallery1,
      teslaGallery2,
      teslaGallery3,
      teslaGallery4,
    ],
    rating: 4.5,
    reviews: 12,
  },
  {
    id: 2,
    model: "F-250",
    name: "Ford F-250 Super Duty",
    brand: "Ford",
    year: 2021,
    price: 82089,
    condition: "used",
    featured: true,
    location: "Milan, Italy",
    fuel: "Diesel",
    tags: ["used", "diesel"],
    img: fordF250Main,
    description:
      "The Ford F-250 Super Duty is a powerful workhorse designed for heavy-duty tasks. With its robust diesel engine and impressive towing capacity, this truck is built to handle the toughest jobs with ease.",
    features: [
      "4WD System",
      "Towing Package",
      "Heated Seats",
      "Premium Audio",
      "Navigation System",
      "Backup Camera",
      "Blind Spot Monitoring",
    ],
    bodyType: "Pickup Truck",
    seats: 5,
    color: "Black",
    mileage: "25000 km",
    transmission: "Automatic",
    driveType: "Four-wheel Drive",
    power: "450 hp (336 kW)",
    length: "6330 mm",
    width: "2032 mm",
    height: "1986 mm",
    cargo: "1200 L",
    gallery: [
      fordF250Main,
      fordF250Gallery1,
      fordF250Gallery2,
      fordF250Gallery3,
      fordF250Gallery4,
      fordF250Gallery5,
      fordF250Gallery6,
    ],
    rating: 4.3,
    reviews: 8,
  },
  {
    id: 3,
    model: "Pilot",
    name: "Honda Pilot Touring 7-Passenger",
    brand: "Honda",
    year: 2021,
    price: 43735,
    condition: "new",
    featured: false,
    location: "Caracas, Venezuela",
    fuel: "Gasoline",
    tags: ["new", "gasoline"],
    img: hondaPilotMain,
    description:
      "The Honda Pilot Touring offers spacious comfort for up to 7 passengers with advanced safety features and reliable performance. Perfect for families seeking adventure and comfort.",
    features: [
      "Honda Sensing",
      "Apple CarPlay",
      "Android Auto",
      "Heated Seats",
      "Premium Audio",
      "Navigation System",
      "360° Camera",
    ],
    bodyType: "SUV",
    seats: 7,
    color: "White",
    mileage: "0 km",
    transmission: "Automatic",
    driveType: "All-wheel Drive",
    power: "280 hp (209 kW)",
    length: "4991 mm",
    width: "1996 mm",
    height: "1778 mm",
    cargo: "510 L",
    gallery: [
      hondaPilotMain,
      hondaPilotGallery1,
      hondaPilotGallery2,
      hondaPilotGallery3,
    ],
    rating: 4.4,
    reviews: 15,
  },
  {
    id: 4,
    model: "Equinox",
    name: "Chevrolet Equinox LS",
    brand: "Chevrolet",
    year: 2017,
    price: 17978,
    condition: "used",
    featured: false,
    location: "Madrid, Spain",
    fuel: "Gasoline",
    tags: ["used", "gasoline"],
    img: chevyEquinoxMain,
    description:
      "The Chevrolet Equinox LS is a compact SUV that offers great value and reliability. With its efficient engine and comfortable interior, it's perfect for daily commuting and weekend trips.",
    features: [
      "Chevrolet MyLink",
      "Rear Camera",
      "Bluetooth",
      "USB Ports",
      "Cruise Control",
      "Keyless Entry",
    ],
    bodyType: "SUV",
    seats: 5,
    color: "Silver",
    mileage: "85000 km",
    transmission: "Automatic",
    driveType: "Front-wheel Drive",
    power: "182 hp (136 kW)",
    length: "4652 mm",
    width: "1843 mm",
    height: "1684 mm",
    cargo: "894 L",
    gallery: [
      chevyEquinoxMain,
      chevyEquinoxGallery1,
      chevyEquinoxGallery2,
      chevyEquinoxGallery3,
    ],
    rating: 4.0,
    reviews: 22,
  },
  {
    id: 5,
    model: "Sorento",
    name: "Kia Sorento S",
    brand: "Kia",
    year: 2021,
    price: 29791,
    condition: "used",
    featured: false,
    location: "Bangkok, Thailand",
    fuel: "Gasoline",
    tags: ["used", "gasoline"],
    img: kiaSorentoMain,
    description:
      "The Kia Sorento S combines style, comfort, and technology in a versatile SUV package. With its modern design and comprehensive features, it offers excellent value for families.",
    features: [
      "UVO Link",
      "Apple CarPlay",
      "Android Auto",
      "Rear Camera",
      "Blind Spot Detection",
      "Lane Keep Assist",
      "Forward Collision Warning",
    ],
    bodyType: "SUV",
    seats: 7,
    color: "Blue",
    mileage: "15000 km",
    transmission: "Automatic",
    driveType: "Front-wheel Drive",
    power: "191 hp (142 kW)",
    length: "4810 mm",
    width: "1900 mm",
    height: "1695 mm",
    cargo: "605 L",
    gallery: [
      kiaSorentoMain,
      kiaSorentoGallery1,
      kiaSorentoGallery2,
      kiaSorentoGallery3,
      kiaSorentoGallery4,
      kiaSorentoGallery5,
      kiaSorentoGallery6,
      kiaSorentoGallery7,
    ],
    rating: 4.2,
    reviews: 18,
  },
  {
    id: 6,
    model: "Camry",
    name: "Toyota Camry LE",
    brand: "Toyota",
    year: 2023,
    price: 31000,
    condition: "new",
    featured: false,
    location: "Tokyo, Japan",
    fuel: "Hybrid",
    tags: ["new", "hybrid"],
    img: camryMain,
    description:
      "The Toyota Camry LE Hybrid combines legendary reliability with exceptional fuel economy. This midsize sedan offers a smooth ride, advanced safety features, and cutting-edge hybrid technology for an eco-friendly driving experience.",
    features: [
      "Toyota Safety Sense 2.5+",
      "Apple CarPlay",
      "Android Auto",
      "Hybrid System",
      "Lane Departure Alert",
      "Pre-Collision System",
      "Adaptive Cruise Control",
      "Blind Spot Monitor",
    ],
    bodyType: "Sedan",
    seats: 5,
    color: "Gray",
    mileage: "0 km",
    transmission: "CVT",
    driveType: "Front-wheel Drive",
    power: "208 hp (155 kW)",
    length: "4885 mm",
    width: "1840 mm",
    height: "1445 mm",
    cargo: "428 L",
    gallery: [camryMain, camryGallery1, camryGallery2, camryGallery3],
    rating: 4.6,
    reviews: 25,
  },
  {
    id: 7,
    model: "Mustang",
    name: "Ford Mustang GT",
    brand: "Ford",
    year: 2019,
    price: 45500,
    condition: "used",
    featured: false,
    location: "Los Angeles, USA",
    fuel: "Gasoline",
    tags: ["used", "gasoline", "sport"],
    img: mustangMain,
    description:
      "The Ford Mustang GT is an American icon, delivering thrilling performance with its powerful V8 engine. This legendary sports car combines classic styling with modern technology for an unforgettable driving experience.",
    features: [
      "SYNC 3",
      "Apple CarPlay",
      "Android Auto",
      "Performance Package",
      "Track Apps",
      "Line Lock",
      "Launch Control",
      "Premium Audio",
    ],
    bodyType: "Coupe",
    seats: 4,
    color: "Blue",
    mileage: "32000 km",
    transmission: "Manual",
    driveType: "Rear-wheel Drive",
    power: "450 hp (336 kW)",
    length: "4789 mm",
    width: "1916 mm",
    height: "1381 mm",
    cargo: "382 L",
    gallery: [mustangMain, mustangGallery1, mustangGallery2, mustangGallery3],
    rating: 4.7,
    reviews: 30,
  },
  // Toyota Cars
  {
    id: 8,
    model: "RAV4",
    name: "Toyota RAV4 XLE",
    brand: "Toyota",
    year: 2024,
    price: 34500,
    condition: "new",
    featured: true,
    location: "Tokyo, Japan",
    fuel: "Hybrid",
    tags: ["new", "hybrid", "suv"],
    img: rav4Main,
    description:
      "The Toyota RAV4 XLE Hybrid is a versatile compact SUV that offers excellent fuel economy and all-wheel drive capability. With its spacious interior and advanced safety features, it's perfect for both city driving and outdoor adventures.",
    features: [
      "Toyota Safety Sense 2.5",
      "Apple CarPlay",
      "Android Auto",
      "Hybrid AWD",
      "Power Liftgate",
      "Heated Seats",
      "Blind Spot Monitor",
      "360° Camera",
    ],
    bodyType: "SUV",
    seats: 5,
    color: "White",
    mileage: "0 km",
    transmission: "CVT",
    driveType: "All-wheel Drive",
    power: "219 hp (163 kW)",
    length: "4600 mm",
    width: "1855 mm",
    height: "1685 mm",
    cargo: "580 L",
    gallery: [rav4Main, rav4Gallery1, rav4Gallery2],
    rating: 4.5,
    reviews: 20,
  },
  {
    id: 9,
    model: "Corolla",
    name: "Toyota Corolla SE",
    brand: "Toyota",
    year: 2023,
    price: 26500,
    condition: "new",
    featured: false,
    location: "Osaka, Japan",
    fuel: "Gasoline",
    tags: ["new", "gasoline", "sedan"],
    img: corollaMain,
    description:
      "The Toyota Corolla SE offers sporty styling and reliable performance in a compact sedan package. Known for its exceptional fuel economy and low maintenance costs, it's an excellent choice for daily commuting.",
    features: [
      "Toyota Safety Sense 2.0",
      "Apple CarPlay",
      "Android Auto",
      "Sport Mode",
      "LED Headlights",
      "Smart Key",
      "Backup Camera",
    ],
    bodyType: "Sedan",
    seats: 5,
    color: "Red",
    mileage: "0 km",
    transmission: "CVT",
    driveType: "Front-wheel Drive",
    power: "169 hp (126 kW)",
    length: "4630 mm",
    width: "1780 mm",
    height: "1435 mm",
    cargo: "371 L",
    gallery: [
      corollaMain,
      corollaGallery1,
      corollaGallery2,
      corollaGallery3,
      corollaGallery4,
    ],
    rating: 4.4,
    reviews: 28,
  },
  {
    id: 10,
    model: "Highlander",
    name: "Toyota Highlander XLE",
    brand: "Toyota",
    year: 2022,
    price: 42500,
    condition: "used",
    featured: false,
    location: "Yokohama, Japan",
    fuel: "Hybrid",
    tags: ["used", "hybrid", "suv"],
    img: highlanderMain,
    description:
      "The Toyota Highlander XLE Hybrid is a spacious three-row SUV that combines comfort, capability, and efficiency. Perfect for large families who need extra space without sacrificing fuel economy.",
    features: [
      "Toyota Safety Sense 2.5+",
      "Apple CarPlay",
      "Android Auto",
      "Hybrid AWD",
      "Panoramic Moonroof",
      "Heated Seats",
      "Premium Audio",
      "360° Camera",
    ],
    bodyType: "SUV",
    seats: 8,
    color: "Black",
    mileage: "18000 km",
    transmission: "CVT",
    driveType: "All-wheel Drive",
    power: "243 hp (181 kW)",
    length: "4950 mm",
    width: "1930 mm",
    height: "1730 mm",
    cargo: "456 L",
    gallery: [
      highlanderMain,
      highlanderGallery1,
      highlanderGallery2,
      highlanderGallery3,
      highlanderGallery4,
      highlanderGallery5,
    ],
    rating: 4.6,
    reviews: 16,
  },
  // Ford Cars
  {
    id: 11,
    model: "Explorer",
    name: "Ford Explorer XLT",
    brand: "Ford",
    year: 2023,
    price: 38500,
    condition: "new",
    featured: true,
    location: "Detroit, USA",
    fuel: "Gasoline",
    tags: ["new", "gasoline", "suv"],
    img: explorerMain,
    description:
      "The Ford Explorer XLT is a versatile three-row SUV that offers impressive towing capacity and advanced technology. With its spacious interior and powerful engine, it's perfect for families and adventure seekers.",
    features: [
      "SYNC 4",
      "Apple CarPlay",
      "Android Auto",
      "Co-Pilot360",
      "Power Liftgate",
      "Heated Seats",
      "Blind Spot Information System",
      "360° Camera",
    ],
    bodyType: "SUV",
    seats: 7,
    color: "Silver",
    mileage: "0 km",
    transmission: "Automatic",
    driveType: "Rear-wheel Drive",
    power: "300 hp (224 kW)",
    length: "5066 mm",
    width: "2004 mm",
    height: "1778 mm",
    cargo: "515 L",
    gallery: [
      explorerMain,
      explorerGallery1,
      explorerGallery2,
      explorerGallery3,
      explorerGallery4,
      explorerGallery5,
      explorerGallery6,
      explorerGallery7,
      explorerGallery8,
    ],
    rating: 4.3,
    reviews: 19,
  },
  {
    id: 12,
    model: "F-150",
    name: "Ford F-150 Lariat",
    brand: "Ford",
    year: 2024,
    price: 62500,
    condition: "new",
    featured: true,
    location: "Texas, USA",
    fuel: "Gasoline",
    tags: ["new", "gasoline", "truck"],
    img: f150Main,
    description:
      "The Ford F-150 Lariat is America's best-selling truck, combining rugged capability with premium comfort. With its powerful engine options and advanced towing technology, it's built for both work and play.",
    features: [
      "SYNC 4",
      "Apple CarPlay",
      "Android Auto",
      "Co-Pilot360",
      "Pro Power Onboard",
      "Trailer Backup Assist",
      "360° Camera",
      "Heated Seats",
    ],
    bodyType: "Pickup Truck",
    seats: 5,
    color: "Blue",
    mileage: "0 km",
    transmission: "Automatic",
    driveType: "Four-wheel Drive",
    power: "400 hp (298 kW)",
    length: "5910 mm",
    width: "2029 mm",
    height: "1993 mm",
    cargo: "1800 L",
    gallery: [
      f150Main,
      f150Gallery1,
      f150Gallery2,
      f150Gallery3,
      f150Gallery4,
      f150Gallery5,
      f150Gallery6,
      f150Gallery7,
      f150Gallery8,
      f150Gallery9,
    ],
    rating: 4.7,
    reviews: 35,
  },
  {
    id: 13,
    model: "Escape",
    name: "Ford Escape SE",
    brand: "Ford",
    year: 2022,
    price: 28500,
    condition: "used",
    featured: false,
    location: "Chicago, USA",
    fuel: "Hybrid",
    tags: ["used", "hybrid", "suv"],
    img: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    description:
      "The Ford Escape SE Hybrid offers excellent fuel economy in a compact SUV package. With its modern design and advanced safety features, it's perfect for urban driving and weekend getaways.",
    features: [
      "SYNC 3",
      "Apple CarPlay",
      "Android Auto",
      "Co-Pilot360",
      "Hybrid System",
      "Power Liftgate",
      "Blind Spot Monitor",
      "Rear Camera",
    ],
    bodyType: "SUV",
    seats: 5,
    color: "Gray",
    mileage: "22000 km",
    transmission: "CVT",
    driveType: "Front-wheel Drive",
    power: "200 hp (149 kW)",
    length: "4610 mm",
    width: "1882 mm",
    height: "1680 mm",
    cargo: "971 L",
    gallery: [
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    ],
    rating: 4.2,
    reviews: 14,
  },
  // Audi Cars
  {
    id: 14,
    model: "A4",
    name: "Audi A4 Premium",
    brand: "Audi",
    year: 2024,
    price: 42500,
    condition: "new",
    featured: true,
    location: "Munich, Germany",
    fuel: "Gasoline",
    tags: ["new", "gasoline", "luxury"],
    img: "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg",
    description:
      "The Audi A4 Premium combines sophisticated design with cutting-edge technology. This luxury sedan offers a refined driving experience with advanced infotainment and safety features, all wrapped in Audi's signature style.",
    features: [
      "Virtual Cockpit",
      "MMI Touch",
      "Apple CarPlay",
      "Android Auto",
      "Audi Pre Sense",
      "Adaptive Cruise Control",
      "Bang & Olufsen Audio",
      "Panoramic Sunroof",
    ],
    bodyType: "Sedan",
    seats: 5,
    color: "Black",
    mileage: "0 km",
    transmission: "Automatic",
    driveType: "All-wheel Drive",
    power: "261 hp (195 kW)",
    length: "4762 mm",
    width: "1847 mm",
    height: "1431 mm",
    cargo: "460 L",
    gallery: [
      "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg",
    ],
    rating: 4.6,
    reviews: 24,
  },
  {
    id: 15,
    model: "Q5",
    name: "Audi Q5 Premium Plus",
    brand: "Audi",
    year: 2023,
    price: 48500,
    condition: "new",
    featured: true,
    location: "Berlin, Germany",
    fuel: "Gasoline",
    tags: ["new", "gasoline", "luxury", "suv"],
    img: "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg",
    description:
      "The Audi Q5 Premium Plus is a luxury compact SUV that delivers exceptional performance and refinement. With its quattro all-wheel drive system and premium interior, it offers a perfect blend of capability and comfort.",
    features: [
      "Virtual Cockpit",
      "MMI Touch",
      "Apple CarPlay",
      "Android Auto",
      "Audi Pre Sense",
      "quattro AWD",
      "Panoramic Sunroof",
      "Premium Audio",
    ],
    bodyType: "SUV",
    seats: 5,
    color: "White",
    mileage: "0 km",
    transmission: "Automatic",
    driveType: "All-wheel Drive",
    power: "261 hp (195 kW)",
    length: "4682 mm",
    width: "1893 mm",
    height: "1659 mm",
    cargo: "550 L",
    gallery: [
      "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg",
    ],
    rating: 4.7,
    reviews: 21,
  },
  {
    id: 16,
    model: "A6",
    name: "Audi A6 Prestige",
    brand: "Audi",
    year: 2022,
    price: 58500,
    condition: "used",
    featured: false,
    location: "Hamburg, Germany",
    fuel: "Gasoline",
    tags: ["used", "gasoline", "luxury"],
    img: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
    description:
      "The Audi A6 Prestige is a premium executive sedan that combines elegant design with advanced technology. With its luxurious interior and powerful engine, it delivers an exceptional driving experience for discerning drivers.",
    features: [
      "Virtual Cockpit Plus",
      "MMI Touch Response",
      "Apple CarPlay",
      "Android Auto",
      "Audi Pre Sense",
      "Adaptive Air Suspension",
      "Bang & Olufsen 3D Audio",
      "Matrix LED Headlights",
    ],
    bodyType: "Sedan",
    seats: 5,
    color: "Silver",
    mileage: "15000 km",
    transmission: "Automatic",
    driveType: "All-wheel Drive",
    power: "335 hp (250 kW)",
    length: "4939 mm",
    width: "1886 mm",
    height: "1457 mm",
    cargo: "530 L",
    gallery: [
      "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
    ],
    rating: 4.8,
    reviews: 17,
  },
  // BMW Cars
  {
    id: 17,
    model: "3 Series",
    name: "BMW 330i",
    brand: "BMW",
    year: 2024,
    price: 44500,
    condition: "new",
    featured: true,
    location: "Munich, Germany",
    fuel: "Gasoline",
    tags: ["new", "gasoline", "luxury", "sport"],
    img: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
    description:
      "The BMW 330i is the ultimate driving machine, combining sporty performance with luxury amenities. With its precise handling and powerful turbocharged engine, it delivers an exhilarating driving experience.",
    features: [
      "iDrive 8",
      "Apple CarPlay",
      "Android Auto",
      "BMW Live Cockpit",
      "Active Driving Assistant",
      "Harman Kardon Audio",
      "Panoramic Moonroof",
      "Adaptive LED Headlights",
    ],
    bodyType: "Sedan",
    seats: 5,
    color: "Blue",
    mileage: "0 km",
    transmission: "Automatic",
    driveType: "Rear-wheel Drive",
    power: "255 hp (190 kW)",
    length: "4709 mm",
    width: "1827 mm",
    height: "1435 mm",
    cargo: "480 L",
    gallery: [
      "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
    ],
    rating: 4.7,
    reviews: 26,
  },
  {
    id: 18,
    model: "X5",
    name: "BMW X5 xDrive40i",
    brand: "BMW",
    year: 2023,
    price: 62500,
    condition: "new",
    featured: true,
    location: "Stuttgart, Germany",
    fuel: "Gasoline",
    tags: ["new", "gasoline", "luxury", "suv"],
    img: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    description:
      "The BMW X5 xDrive40i is a luxury midsize SUV that combines sporty performance with spacious comfort. With its powerful engine and advanced xDrive all-wheel drive system, it's perfect for both city driving and off-road adventures.",
    features: [
      "iDrive 8",
      "Apple CarPlay",
      "Android Auto",
      "BMW Live Cockpit",
      "Active Driving Assistant Pro",
      "Panoramic Sky Lounge",
      "Harman Kardon Audio",
      "Air Suspension",
    ],
    bodyType: "SUV",
    seats: 7,
    color: "Black",
    mileage: "0 km",
    transmission: "Automatic",
    driveType: "All-wheel Drive",
    power: "335 hp (250 kW)",
    length: "4930 mm",
    width: "2004 mm",
    height: "1776 mm",
    cargo: "650 L",
    gallery: [
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    ],
    rating: 4.8,
    reviews: 23,
  },
  {
    id: 19,
    model: "5 Series",
    name: "BMW 530i",
    brand: "BMW",
    year: 2022,
    price: 52500,
    condition: "used",
    featured: false,
    location: "Frankfurt, Germany",
    fuel: "Gasoline",
    tags: ["used", "gasoline", "luxury"],
    img: "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg",
    description:
      "The BMW 530i is a premium executive sedan that offers the perfect balance of performance, luxury, and technology. With its refined interior and powerful engine, it provides an exceptional driving experience for business and pleasure.",
    features: [
      "iDrive 7",
      "Apple CarPlay",
      "Android Auto",
      "BMW Live Cockpit Professional",
      "Active Driving Assistant Pro",
      "Bowers & Wilkins Audio",
      "Panoramic Moonroof",
      "Adaptive LED Headlights",
    ],
    bodyType: "Sedan",
    seats: 5,
    color: "White",
    mileage: "12000 km",
    transmission: "Automatic",
    driveType: "Rear-wheel Drive",
    power: "248 hp (185 kW)",
    length: "4963 mm",
    width: "1868 mm",
    height: "1479 mm",
    cargo: "530 L",
    gallery: [
      "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg",
    ],
    rating: 4.6,
    reviews: 19,
  },
];

// Map SellRequest (from backend) → car object used in frontend
function mapSellRequestToCar(sell) {
  if (!sell) return null;

  const isNew = sell.condition === "new";

  return {
    id: sell._id, // use MongoDB id (string) so we can fetch detail later
    model: sell.model || sell.title || "User Car",
    name: sell.title || `${sell.brand || ""} ${sell.model || ""}`.trim(),
    brand: sell.brand || "User",
    year: sell.year || new Date(sell.createdAt).getFullYear(),
    price: sell.price,
    condition: sell.condition || "used",
    featured: false,
    location: "User listing",
    fuel: sell.fuelType || "Gasoline",
    tags: [sell.condition || "used"],
    img: placeholderImg,
    description: sell.description || "User submitted vehicle.",
    features: sell.features || [],
    bodyType: sell.bodyType || "",
    seats: sell.passengerCapacity || 4,
    color: sell.exteriorColor || "",
    mileage: sell.mileage ? `${sell.mileage} km` : "",
    transmission: sell.transmission || "",
    driveType: sell.drivetrain || "",
    power: sell.power ? `${sell.power} hp` : "",
    length: sell.length ? `${sell.length} mm` : "",
    width: sell.width ? `${sell.width} mm` : "",
    height: sell.height ? `${sell.height} mm` : "",
    cargo: sell.cargoVolume ? `${sell.cargoVolume} L` : "",
    gallery: [placeholderImg],
    rating: isNew ? 4.5 : 4.2,
    reviews: 0,
  };
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms || 500));
}

/**
 * options: { q, brand, model, minPrice, maxPrice, year, condition, sortBy, page, limit }
 */
export async function getCars(options = {}, sourceData = MOCK_CARS) {
  await delay(600); // simulate network latency
  let list = sourceData.slice();

  // 🔄 Append approved sell requests from backend as extra cars
  try {
    const res = await getApprovedPublicSellRequests();
    const extraCars = (res?.data || [])
      .map(mapSellRequestToCar)
      .filter(Boolean);
    list = list.concat(extraCars);
  } catch (err) {
    console.error("Failed to load approved sell cars:", err);
  }

  // 🔍 Search filter
  const q = (options.q || "").toString().trim().toLowerCase();

  // Nếu search trống hoặc filter bị reset → trả lại tất cả hoặc random
  if (
    !options.tag &&
    !q &&
    !options.brand &&
    !options.model &&
    !options.year &&
    !options.minPrice &&
    !options.maxPrice &&
    (!options.condition || options.condition === "all")
  ) {
    // Trả random 5 xe tượng trưng
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    return {
      data: shuffled.slice(0, 5),
      total: list.length,
      page: 1,
      limit: 5,
    };
  }

  if (q) {
    list = list.filter(
      (c) =>
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.model && c.model.toLowerCase().includes(q)) ||
        (c.brand && c.brand.toLowerCase().includes(q)) ||
        (c.location && c.location.toLowerCase().includes(q))
    );
  }

  if (options.brand) list = list.filter((c) => c.brand === options.brand);
  if (options.model) list = list.filter((c) => c.model === options.model);
  if (options.year)
    list = list.filter((c) => String(c.year) === String(options.year));

  const minP = options.minPrice ? Number(options.minPrice) : 0;
  const maxP = options.maxPrice
    ? Number(options.maxPrice)
    : Number.MAX_SAFE_INTEGER;
  list = list.filter((c) => c.price >= minP && c.price <= maxP);

  if (options.condition && options.condition !== "all") {
    list = list.filter((c) => c.condition === options.condition);
  }

  // 🧮 Sort logic
  if (options.sortBy) {
    if (options.sortBy === "priceAsc") list.sort((a, b) => a.price - b.price);
    if (options.sortBy === "priceDesc") list.sort((a, b) => b.price - a.price);
    if (options.sortBy === "yearDesc") list.sort((a, b) => b.year - a.year);
    if (options.sortBy === "name")
      list.sort((a, b) => a.name.localeCompare(b.name));
  }

  // 📄 Pagination
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 12);
  const total = list.length;
  const start = (page - 1) * limit;
  const items = list.slice(start, start + limit);

  return { data: items, total, page, limit };
}

export async function getCarsByTag(tag, options = {}) {
  const normalized = (tag || "").toLowerCase().trim();
  if (!normalized) {
    return getCars(options);
  }

  const filteredByTag = MOCK_CARS.filter((car) => {
    const carTags = (car.tags || []).map((t) => t.toLowerCase());
    return (
      carTags.includes(normalized) ||
      (normalized === "used" && car.condition === "used") ||
      (normalized === "new" && car.condition === "new")
    );
  });

  const enforcedCondition =
    normalized === "used" || normalized === "new"
      ? normalized
      : options.condition;

  return getCars(
    {
      ...options,
      condition: enforcedCondition || options.condition || "all",
      tag: normalized,
    },
    filteredByTag
  );
}

export async function getUsedCars(options = {}) {
  return getCarsByTag("used", options);
}

export async function getFeaturedCars() {
  await delay(400);
  return MOCK_CARS.filter((c) => c.featured);
}

export async function getCarById(id) {
  await delay(200);
  // First, try local mock data (numeric ids)
  const numericId = Number(id);
  const fromMock = MOCK_CARS.find((c) => c.id === numericId);
  if (fromMock) return fromMock;

  // Then, try backend sell request (string Mongo id)
  try {
    const res = await getPublicSellRequest(id);
    return mapSellRequestToCar(res?.data);
  } catch (err) {
    console.error("Failed to load car from sell request:", err);
    return null;
  }
}

export async function getCarsByBrand(brand, options = {}) {
  await delay(300);
  const normalizedBrand = (brand || "").toString().trim();
  if (!normalizedBrand) {
    return getCars(options);
  }
  return getCars({
    ...options,
    brand: normalizedBrand,
  });
}

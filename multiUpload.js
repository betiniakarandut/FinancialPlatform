import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import Property from "./models/RealEstateModels/PropertyModel.js";
import { dbConnStr } from "./utils/configuration.js";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
  });
  

const propertyData = [
    {
        description: "**Ready Hotel | 24 Rooms Per Floor | Call NOW!!!**",
        asking_price: 395000000,
        location: "Park Heights, Palm Jumeirah, Dubai UAE,",
        label: "FOR SALE",
        area: "31200Sqft",
        bathrooms: 7,
        garage: 1,
        bedrooms: 1,
        picture: "https://www.platinumsquare.ae/property-image/psdmc-36903491.jpg",
        // propertyDocument: "https://www.platinumsquare.ae/property-image/psdmc-39826331.jpg",
        ownerId: Property.ownerId,
        createdAt: Date.now(),
    },
    {
        description: "LAVISH 5-BR MANSION | JUMIERAH 3 | WIDE POOL",
        asking_price: 31000000,
        location: "Jumeirah 3, Jumeirah, Dubai UAE,",
        label: "FOR SALE",
        area: "22500Sqft",
        bathrooms: 6,
        garage: 4,
        bedrooms: 5,
        picture: "https://www.platinumsquare.ae/property-image/psdmc-40436711.jpg",
        // propertyDocument: "https://www.platinumsquare.ae/property-image/psdmc-39826331.jpg",
        ownerId: Property.ownerId,
        createdAt: Date.now(),
    },
    {
        description: "Maia Park Lane |Large Plot |Very special location",
        asking_price: 27000000,
        location: "Elysian Mansions, Tilal Al Ghaf, Dubai UAE,",
        label: "FOR SALE",
        area: "10672Sqft",
        bathrooms: 6,
        garage: 1,
        bedrooms: 5,
        picture: "https://www.platinumsquare.ae/property-image/psdmc-53458071.jpg",
        // propertyDocument: "https://www.platinumsquare.ae/property-image/psdmc-39826331.jpg",
        ownerId: Property.ownerId,
        createdAt: Date.now(),
    },
    {
        description: "Luxury 5-BR plus maids room villa in Pearl Jumeirah",
        asking_price: 25000000,
        location: "Pearl Jumeirah, Jumeirah, Dubai UAE,",
        label: "FOR SALE",
        area: "5700Sqft",
        bathrooms: 7,
        garage: 2,
        bedrooms: 5,
        picture: "https://www.platinumsquare.ae/property-image/psdmc-32584131.jpg",
        // propertyDocument: "https://www.platinumsquare.ae/property-image/psdmc-39826331.jpg",
        ownerId: Property.ownerId,
        createdAt: Date.now(),
    },
    {
        description: "Deluxe 4BR Penthouse | Luxurious Furnishing",
        asking_price: 25000000,
        location: "Le Reve, Dubai Marina, Dubai UAE,",
        label: "FOR SALE",
        area: "6298Sqft",
        bathrooms: 5,
        garage: 2,
        bedrooms: 4,
        picture: "https://www.platinumsquare.ae/property-image/psre-26821711.jpg",
        // propertyDocument: "https://www.platinumsquare.ae/property-image/psdmc-39826331.jpg",
        ownerId: Property.ownerId,
        createdAt: Date.now(),
    },
    {
        description: "Lavish Penthouse with Elevator & Cinema Room",
        asking_price: 25000000,
        location: "Oceanic, Dubai Marina, Dubai UAE,",
        label: "FOR SALE",
        area: "9421.87Sqft",
        bathrooms: 7,
        garage: 1,
        bedrooms: 5,
        picture: "https://www.platinumsquare.ae/property-image/psdmc-38269071.jpg",
        // propertyDocument: "https://www.platinumsquare.ae/property-image/psdmc-39826331.jpg",
        ownerId: Property.ownerId,
        createdAt: Date.now(),
    },
    {
        description: "Penthouse duplex with private beach, pool, terrace",
        asking_price: 14000000,
        location: "Seven Palm, Palm Jumeirah, Dubai UAE,",
        label: "FOR SALE",
        area: "sqft",
        bathrooms: 6,
        garage: 1,
        bedrooms: 4,
        picture: "https://www.platinumsquare.ae/property-image/psre-18503381.jpg",
        // propertyDocument: "https://www.platinumsquare.ae/property-image/psdmc-39826331.jpg",
        ownerId: Property.ownerId,
        createdAt: Date.now(),
    },
    {
        description: "Half floor Penthouse / VOT / 360 Dubai Views",
        asking_price: 13000000,
        location: "Burj Khalifa Area, Downtown Dubai, Dubai UAE,",
        label: "FOR SALE",
        area: "4815Sqft",
        bathrooms: 5,
        garage: 2,
        bedrooms: 3,
        picture: "https://www.platinumsquare.ae/property-image/psdmc-59106791.jpg",
        // propertyDocument: "https://www.platinumsquare.ae/property-image/psdmc-39826331.jpg",
        ownerId: Property.ownerId,
        createdAt: Date.now(),
    },
    {
        description: "Resale | Luxury Living | Close to Lagoon",
        asking_price: 13000000,
        location: "Venice, Damac Lagoons, Dubai UAE,",
        label: "FOR SALE",
        area: "7535Sqft",
        bathrooms: 7,
        garage: 1,
        bedrooms: 7,
        picture: "https://www.platinumsquare.ae/property-image/psdmc-39826331.jpg",
        // propertyDocument: "https://www.platinumsquare.ae/property-image/psdmc-39826331.jpg",
        ownerId: Property.ownerId,
        createdAt: Date.now(),
    },
    {
        description: "Elegant 4BR + Maid | Fendi Styled Villa",
        asking_price: 12500000,
        location: "Trevi, DAMAC Hills, Dubai UAE,",
        label: "FOR SALE",
        area: "4938.05Sqft",
        bathrooms: 6,
        garage: 2,
        bedrooms: 4,
        picture: "https://www.platinumsquare.ae/property-image/psdmc-43798461.jpg",
        // propertyDocument: "https://www.platinumsquare.ae/property-image/psdmc-39826331.jpg",
        ownerId: Property.ownerId,
        createdAt: Date.now(),
    },
    {
        description: "Resale | Luxury Living | Close to Lagoon",
        asking_price: 9800000,
        location: "Portofino, Damac Lagoons, Dubai UAE,",
        label: "FOR SALE",
        area: "7535Sqft",
        bathrooms: 7,
        garage: 1,
        bedrooms: 7,
        picture: "https://www.platinumsquare.ae/property-image/psdmc-53245781.jpg",
        // propertyDocument: "https://www.platinumsquare.ae/property-image/psdmc-39826331.jpg",
        ownerId: Property.ownerId,
        createdAt: Date.now(),
    },
    {
        description: "Vacant | Golf & Lake View | Huge Plot",
        asking_price: 9700000,
        location: "The Turf, DAMAC Hills, Dubai UAE,",
        label: "FOR SALE",
        area: "7423.76Sqft",
        bathrooms: 7,
        garage: 1,
        bedrooms: 5,
        picture: "https://www.platinumsquare.ae/property-image/psdmc-45210271.jpg",
        // propertyDocument: "https://www.platinumsquare.ae/property-image/psdmc-39826331.jpg",
        ownerId: Property.ownerId,
        createdAt: Date.now(),
    },
    {
        description: "Payment Plan | Palm View | Vacant | Furnished",
        asking_price: 7900000,
        location: "EMAAR Beachfront, Dubai Harbour, Dubai UAE,",
        label: "FOR SALE",
        area: "1928Sqft",
        bathrooms: 4,
        garage: 3,
        bedrooms: 3,
        picture: "https://www.platinumsquare.ae/property-image/psdmc-55235501.jpg",
        // propertyDocument: "https://www.platinumsquare.ae/property-image/psdmc-39826331.jpg",
        ownerId: Property.ownerId,
        createdAt: Date.now(),
    },
    {
        description: "Fully upgraded | 5 BR Villa|Type C| Smart Home",
        asking_price: 6500000,
        location: "",
        label: "FOR SALE",
        area: "5700.35Sqft",
        bathrooms: 6,
        garage: 3,
        bedrooms: 5,
        picture: "https://www.platinumsquare.ae/property-image/psdmc-39826331.jpg",
        // propertyDocument: "https://www.platinumsquare.ae/property-image/psdmc-39826331.jpg",
        ownerId: Property.ownerId,
        createdAt: Date.now(),
    },
    {
        description: "** In Demand Lay-Out | Purely for Investment **",
        asking_price: 5600000,
        location: "Celadon, City Walk, Dubai UAE,",
        label: "FOR SALE",
        area: "2142.34Sqft",
        bathrooms: 4,
        garage: 1,
        bedrooms: 3,
        picture: "https://www.platinumsquare.ae/property-image/psdmc-39821541.jpg",
        // propertyDocument: "https://www.platinumsquare.ae/property-image/psdmc-39826331.jpg",
        ownerId: Property.ownerId,
        createdAt: Date.now(),
    },
    {
        description: "Single row | Spacious | Payment plan | Corner",
        asking_price: 5500000,
        location: "Murooj Al Furjan, Al Furjan, Dubai UAE,",
        label: "FOR SALE",
        area: "6715Sqft",
        bathrooms: 7,
        garage: 3,
        bedrooms: 5,
        picture: "https://www.platinumsquare.ae/property-image/psdmc-54572961.jpg",
        // propertyDocument: "https://www.platinumsquare.ae/property-image/psdmc-39826331.jpg",
        ownerId: Property.ownerId,
        createdAt: Date.now(),
    },
    {
        description: "LUXURY LIVING | HUGE LAYOUT | AMAZING SEA VIEW",
        asking_price: 5300000,
        location: "Liv Lux, Dubai Marina, Dubai UAE,",
        label: "FOR SALE",
        area: "1543.43Sqft",
        bathrooms: 3,
        garage: 3,
        bedrooms: 2,
        picture: "https://www.platinumsquare.ae/property-image/psdmc-54897741.jpg",
        // propertyDocument: "https://www.platinumsquare.ae/property-image/psdmc-39826331.jpg",
        ownerId: Property.ownerId,
        createdAt: Date.now(),
    },
    {
        description: "Vacant | Genuine Seller | Well Maintained",
        asking_price: 5100000,
        location: "Maple at Dubai Hills Estate, Dubai Hills Estate, Dubai UAE,",
        label: "FOR SALE",
        area: "2700Sqft",
        bathrooms: 6,
        garage: 3,
        bedrooms: 5,
        picture: "https://www.platinumsquare.ae/property-image/psdmc-55130341.jpg",
        // propertyDocument: "https://www.platinumsquare.ae/property-image/psdmc-39826331.jpg",
        ownerId: Property.ownerId,
        createdAt: Date.now(),
    },
]

const seedDatabase = async (req, res) => {
    try {

        mongoose.connect(dbConnStr, { useNewUrlParser: true })
        .then( () => {
            console.log("Financial Platform database is connected");
        })
        .catch( (err) => {
            console.log(`Financial Platform Database is not connected:${err}`);
        })

        await Property.deleteMany({});

        for (const seedData of propertyData){
            const imageUrl = await cloudinary.uploader.upload(seedData.picture);
            // const propertyUrl = await cloudinary.uploader.upload(seedData.propertyDocument);

            const newProperty = new Property({
                description: seedData.description,
                asking_price: seedData.asking_price,
                location: seedData.location,
                label: seedData.label,
                area: seedData.area,
                bathrooms: seedData.bathrooms,
                garage: seedData.garage,
                bedrooms: seedData.bedrooms,
                picture: imageUrl.secure_url,
                // propertyDocument: propertyUrl.secure_url,
                ownerId: seedData.ownerId,
                createdAt: Date.now(),
            });

            await newProperty.save();
            
        }

        console.log("Databse seeded successfully");
        
    } catch (error) {
        console.log(error);
    }
}

seedDatabase();

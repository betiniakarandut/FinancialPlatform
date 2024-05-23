import mongoose from "mongoose";

const propertyModelSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    asking_price: {type: Number, trim: true},
    label: {type: String, trim: true},
    location: {type: String, trim: true},
    picture: {type: String, trim: true},
    description: {type: String, trim: true},
    area: {type: String, trim: true},
    bedrooms: {type: Number, trim: true},
    bathrooms: {type: Number, trim: true},
    garage: {type: Number, trim: true},
    propertyDocument: {type: String, trim: true},
    createdAt: {type: Date, default: Date.now()},
});

const Property = mongoose.model("Property", propertyModelSchema);
export default Property;
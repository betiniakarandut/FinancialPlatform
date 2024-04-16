import mongoose from "mongoose";

const propertyModelSchema = new mongoose.Schema({
    name: String,
    label: {enum: ['For Sale'], default: 'For Sale'},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    amount: Number,
    address: String,
    picture: String,
    description: String,
    createdAt: {type: Date, default: Date.now()},
});

const Property = mongoose.model("Property", propertyModelSchema);
export default Property;
import fs from "fs";
import { promisify } from "util";
import Property from "../../models/RealEstateModels/PropertyModel.js";
import dotenv from "dotenv";
import {v2 as cloudinary} from 'cloudinary';

dotenv.config()

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
});

export const uploadProperty = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, description, label, address, amount } = req.body;
        const file = req.file;

        if (!name || !address || !label || !amount) {
            return res.status(400).json({
                status: "Failed",
                message: "Incomplete fields"
            });
        }
        else if (!userId) {
            return res.status(403).json({
                status: 'Failed',
                message: "Unauthorized user"
            });
        }

        if (!file) {
            return res.status(400).json({
                status: "Failed",
                message: "Bad request: No file"
            });
        }
        console.log('this is file: ', file)

        const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto" });
        console.log(result);

        const property = new Property({
            name: name,
            amount: amount,
            address: address,
            label: label,
            description: description,
            picture: result.secure_url,
            owner: userId,
            createdAt: Date.now(),
        });
        
        const savedProperty = await property.save();
        
        return res.status(200).json({
            status: "Success",
            message: "Property successfully registered",
            property: savedProperty,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "Failed",
            message: "Internal server error"
        });
    }

}

export const updateProperty = async (req, res) => {
    try {
        const userId = req.user._id;
        const propertyId = req.params.propertyId;

        console.log('this is req.body: ', req.body); 

        console.log('this is userId: ', userId);
        console.log('this is propertyId: ', propertyId);
        if (!userId || !propertyId) {
            return res.status(404).json({
                status: "Failed",
                message: "Not found or user does not exist",
            });
        }
        
        const existingProperty = await Property.findOneAndUpdate(
            { _id: propertyId, owner: userId },
            {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    amount: req.body.amount,
                    label: req.body.label,
                    address: req.body.address,
                    picture: req.body.picture
                }
            },
            { new: true }
        );

        console.log("This is existing Property: ", existingProperty)
        if(!existingProperty) {
            return res.status(404).json({
                status: "Failed",
                message: "Not found: Property does not exist"
            });
        }
        
        const savedUpdatedProperty = await existingProperty.save();
        console.log('updated property ', savedUpdatedProperty)

        

        return res.status(200).json({
            status: "Success",
            message: "Your property was successfully updated",
            updatedProperty: savedUpdatedProperty
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "Failed",
            message: `Internal server error ${error}`
        });
    }
}

export const deleteProperty = async (req, res) => {
    try {
        const userId = req.user._id;
        const propertyId = req.params.propertyId;
        
        if(!userId) {
            return res.status(403).json({
                status: "Failed",
                message: "Unauthorized"
            });
        }

        const existingProperty = await Property.findById({_id: propertyId, owner: userId});
        if (!existingProperty) {
            return res.status(404).json({
                status: "Failed",
                message: "Not Found: Property does not exist"
            });
        }

        await Property.findByIdAndDelete(propertyId);

        return res.status(200).json({
            status: "Success",
            message: "Property deleted successfully",
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "Failed",
            message: `Internal server error ${error}`
        });
    }
}

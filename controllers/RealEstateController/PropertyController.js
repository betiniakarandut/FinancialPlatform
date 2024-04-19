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
        const {
            description, 
            label, 
            location, 
            asking_price,
            bedrooms,
            bathrooms,
            garage,
            area, 
        } = req.body;

        const file1 = req.files['file1'][0];
        const file2 = req.files['file2'][0];

        if (
            !description || !location || 
            !label || !area || !garage ||
            !bedrooms || !bathrooms || !asking_price
        ) {
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

        if (!file1 || !file2) {
            return res.status(400).json({
                status: "Failed",
                message: "Bad request: No file"
            });
        }
        console.log('this is file1: ', file1);
        console.log('this is file2: ', file2);

        const result1 = await cloudinary.uploader.upload(file1.path, { resource_type: "auto" });
        const result2 = await cloudinary.uploader.upload(file2.path, { resource_type: "auto" });
        console.log(result1);
        console.log(result2);
        console.log(`this is asking price: ${asking_price}`)

        const property = new Property({
            description: description,
            asking_price: asking_price,
            location: location,
            label: label,
            area: area,
            bathrooms: bathrooms,
            garage: garage,
            bedrooms: bedrooms,
            picture: result1.secure_url,
            propertyDocument: result2.secure_url,
            owner: userId,
            createdAt: Date.now(),
        });

        console.log(`this is asking price: ${property.asking_price}`)
        
        const savedProperty = await property.save();
        console.log(`this is asking price: ${savedProperty.asking_price}`)

        return res.status(200).json({
            status: "Success",
            message: "Property successfully registered",
            personal_info: {
                fullName: req.user.name,
                email: req.user.email,
                phone: req.user.phone,
                ownershipDocument: result2.secure_url,
            },
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

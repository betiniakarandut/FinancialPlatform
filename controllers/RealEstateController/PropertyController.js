import fs from "fs";
import { promisify } from "util";
import Property from "../../models/RealEstateModels/PropertyModel";
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
        const { name, description, address, label, amount } = req.body;
        const file = req.files.file;

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

        const readFileAsync = promisify(fs.readFile);
        const fileData = await readFileAsync(file.tempFilePath);
        const result = await cloudinary.uploader.upload(fileData, { resource_type: "auto" });
        console.log(result);

        const property = new Property({
            name: name,
            label: label,
            amount: amount,
            address: address,
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
        const { propertyId } = req.params.propertyId;
        const { name, label, amount, description, address, picture} = req.body;

        if (!userId || !propertyId) {
            return res.status(404).json({
                status: "Failed",
                message: "Not found or user does not exist",
            });
        }
        
        const existingProperty = await Property.findById({_id: propertyId, owner: userId});
        if(!existingProperty) {
            return res.status(404).json({
                status: "Failed",
                message: "Not found: Property does not exist"
            });
        }

        if (name) existingProperty.name = name;
        if (description) existingProperty.description = description;
        if (address) existingProperty.address = address;
        if (label) existingProperty.label = label;
        if (amount) existingProperty.amount = amount;
        if (picture) existingProperty.picture = picture;

        const savedExistingProperty = await existingProperty.save();

        return res.status(200).json({
            status: "Success",
            message: "Your property was successfully updated",
            name: savedExistingProperty.name,
            description: savedExistingProperty.description,
            amount: savedExistingProperty.amount,
            updatedAt: Date.now(),
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

        existingProperty = await Property.findById({_id: userId});
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

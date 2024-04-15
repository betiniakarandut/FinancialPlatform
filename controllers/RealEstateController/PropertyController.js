import Property from "../../models/RealEstateModels/PropertyModel";

export const uploadProperty = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, description, address, label, amount } = req.body;
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

        const property = new Property({
            name: name,
            label: label,
            amount: amount,
            address: address,
            description: description,
            owner: userId,
            picture: picture,
            createdAt: Date.now(),
        });
        
        const savedProperty = await property.save();
        
        return res.status(200).json({
            status: "Success",
            message: "Property successfully registered",
            property: savedProperty,
        });
    } catch (error) {
        console,log(error);
        return res.status(500).json({
            status: "Failed",
            message: "Internal server error"
        });
    }

}

export const updateProperty = async (req, res) {
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
        if (description) existingProperty.description = description,
        if (address) existingProperty.address = address;
        if (label) existingProperty.label = label;
        if (amount) existingProperty.amount = amount
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "Failed",
            message: `Internal server error ${error}`
        });
    }
}

import Property from "../../models/RealEstateModels/PropertyModel.js";


export const searchProperty = async (req, res) => {
    try {

        const userInput = req.query.input;
        const regexQuery = new RegExp(userInput, 'i');
        
        const searchResult = await Property.find({
            $or: [
                {name: {$regex: regexQuery}},
                {address: {$regex: regexQuery}},
                {description: {$regex: regexQuery}},
                {label: {$regex: regexQuery}},
                {amount: {$regex: regexQuery}},
            ]
        });

        return res.status(200).json({
            status: "Success",
            message: "Searching properties",
            searchResult
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "Failed",
            message: "Internal server error"
        });
    }
}
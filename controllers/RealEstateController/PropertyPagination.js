import Property from "../../models/RealEstateModels/PropertyModel.js";

const propertyPagination = async (req, res) => {
    try {
        const rawPage = typeof req.query.page === 'string' ? req.query.page: undefined;
        const page = rawPage ? parseInt(rawPage) : 1;
        const perPage = 9;

        const countProperty = await Property.countDocuments();
        const propertyPerPage = await Property.find()
            .skip((page - 1) * perPage)
            .limit(perPage);

        return res.status(200).json({
            status: "Success",
            message: "Pagination was successful",
            totalProperty: countProperty,
            totalPages: Math.ceil(countProperty / perPage),
            propertyPerPage: propertyPerPage,
            perPage: perPage,
            currentPage: page,

        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "Failed",
            message: `Internal server error ${error}`
        })
    }
}

export default propertyPagination;
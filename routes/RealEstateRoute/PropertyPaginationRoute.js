import express from "express";
import propertyPagination from "../../controllers/RealEstateController/PropertyPagination.js";

const paginationRoute = express.Router();

paginationRoute.get('/property', propertyPagination);

export default paginationRoute;
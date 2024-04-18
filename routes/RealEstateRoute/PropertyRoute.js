import express from "express";
import multer from "multer";
import { middlewareAuth } from "../../middlewares/UserAuth.js";
import { 
    deleteProperty,
    updateProperty, 
    uploadProperty 
} from "../../controllers/RealEstateController/PropertyController.js";
import { searchProperty } from "../../controllers/RealEstateController/SearchProperty.js";

const propertyRoute = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

propertyRoute.post('/uploads', upload.single('file'), middlewareAuth, uploadProperty);
propertyRoute.put('/:propertyId/update', middlewareAuth, updateProperty);
propertyRoute.delete('/:propertyId/delete', middlewareAuth, deleteProperty);
propertyRoute.get('/search', searchProperty);

export default propertyRoute;
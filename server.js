import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { dbConnStr } from "./utils/configuration.js";
import userRoutes from "./routes/UserRoutes.js";
import propertyRoute from "./routes/RealEstateRoute/PropertyRoute.js";
import paginationRoute from "./routes/RealEstateRoute/PropertyPaginationRoute.js";


const app = express();

app.use(cors())

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('/', (req, res) => {
    if (res.statusCode === 200) {
        return res.status(200).json({message: "Welcome to YouTube server"});
    }else{
        console.log("Server is not running");
    }
})

app.use('/user', userRoutes);
app.use('/property', propertyRoute);
app.use('/pagination', paginationRoute);

mongoose.connect(dbConnStr, { useNewUrlParser: true })
.then( () => {
    console.log("Financial Platform database is connected");

    app.listen(process.env.PORT, () => {
        console.log(`server is running on port 127.0.0.1:${process.env.PORT}`);
    })
}
).catch( (err) => {
    console.log(`Financial Platform Database is not connected:${err}`)
})


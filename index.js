const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");

dotenv.config();

app.use(express.json());

//MONGO_URL is hidden in .env file
mongoose
    .connect(process.env.MONGO_URL, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,       })
    .then(() => console.log("MongoDB Connected"))
    .catch(err=> console.log(err));

    app.use("/api/users", userRoute);
    app.use("/api/pins", pinRoute);

app.listen(8800, ()=>{
    console.log("Backend server is running.")
});
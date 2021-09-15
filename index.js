const express = require("express");
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");
// const userModel = require("./models/User");
// const pinModel = require("./models/Pin");


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

const PORT = process.env.PORT || 3000;
app.use(express.static(path.resolve(__dirname, "./frontend/build")));
app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});
app.listen(PORT, ()=>{
    console.log(`Backend server is running on port ${PORT}.`);
});
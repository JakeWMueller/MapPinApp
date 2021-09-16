const User = require("../models/User");
const router = require("express").Router();
//salting hashing package - bcrypt
const bcrypt = require("bcrypt");


//register

router.post("/register", async (req, res)=>{
    console.log(req.body); 
    try{
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //save User and send response
        const user = await newUser.save();
        //using await as the newUser being saved takes more time than giving a status update response
        res.status(200).json(user._id);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

//used Postman to ensure that users were being added to the MongoDB cluster and having their passwords hashed

//login
router.post("/login", async (req,res)=>{
    try{
        //find user
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json("Wrong username or password.");

        //validate password
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        !validPassword && res.status(400).json("Wrong username or password.");
        //send response
        res.status(200).json({ _id: user._id, username: user.username });
    }catch(err){
        res.status(500).json(err);
    } 
});

module.exports = router;
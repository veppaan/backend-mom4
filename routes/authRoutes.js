const express = require("express");
const router = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();


///User model
const User = require("../models/User");

//Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to database...");
});


//GET
router.get("/", (req, res) => {
    res.json({ message: "Hello and welcome to this API!"});
}
);
//Add user
router.post("/register", async(req, res) => {
    try {
        const { username, password } = req.body;

        //Validate input
        if(!username || !password){
            return res.status(400).json({ error: "Invalid input, send username and password"});
        }

        //Correct - save user
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: "User created"});

    } catch (error) {
        res.status(500).json({ error: "Server error"});
    }
});

//Login user
router.post("/login", async(req, res) =>{
    try {
        const { username, password } = req.body;

        //Validate input
        if(!username || !password){
            return res.status(400).json({ error: "Invalid input, send username and password"});
        }

        //Does user exist?
        const user = await User.findOne({ username });
        if(!user){
            return res.status(401).json({ error: "Incorrect username/password!"});
        }

        //Check passsword
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch){
            return res.status(401).json({ error: "Incorrect username/password!"});
        }else{
            //Create JWT
            const payload = { username: username };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '2m' }); 
            //Hämta användare utan lösenordet
            const user = await User.findOne({ username: username }, { password: 0 });
            const response = {
                message: "User logged in!",
                user: user,
                token: token
            }
            res.status(200).json({ response })
        }

    } catch (error) {
        res.status(500).json({ error: "Server error"});
    }
});

//Protected
router.get("/protected", authenticateToken, async (req, res) => {
    try{
        const allUsernames = await User.find({}, {username: 1, _id: 0});
        res.json(allUsernames);
    }catch (error){
        res.status(500).json({message: "Error when fetching usernames from database", error: error})
    }
    //res.json({ message: "Skyddad route!"});
});

//Validate token
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //Token

    if(token == null) return res.status(401).json({ message: "Not authorized for this route - token missing!"});

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) =>{
        if(err) return res.status(403).json({ message: "Invalid JWT"});

        req.username = username;
        next();
    })
}

//Returnera till anropet
module.exports = router;
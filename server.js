const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
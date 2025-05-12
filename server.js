const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use("/api", authRoutes);

//Protected routes
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({ message: "Skyddad route!"});
});
//Validate token
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //Token

    if(token == null) res.status(401).json({ message: "Not authorized for this route - token missing!"});

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) =>{
        if(err) return res.status(403).json({ message: "Invalid JWT"});

        req.username = username;
        next();
    })
}

//Start application
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
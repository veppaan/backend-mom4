const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());

//Routes
app.use("/api", authRoutes);

//Start application
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
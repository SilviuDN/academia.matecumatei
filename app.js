// ℹ️ Gets access to environment variables/settings
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require("./config/cors.config")(app);
require("./config/session.config")(app)
// require("./config/cloudinary.config")(app)

// 👇 Start handling routes here
require("./routes")(app);


app.use((req, res) => res.sendFile(__dirname + "/public/index.html"))

module.exports = app;

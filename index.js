const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const {connectDB} = require("./db/postgresDb");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/addRow", require("./hooks/addRowHook.js"));

app.listen(PORT, '0.0.0.0', async () => {
    try {
        await connectDB()
        console.log(`Server started at PORT ${PORT}`);
    } catch (e) {
        console.error("Server failed to start!: " + e);
    }
})
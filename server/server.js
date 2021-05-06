const express = require("express");
const bodyParser = require("body-parser");

const connectDB = require("./config/database");
const bookRoutes = require("./routes/api/books");

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Connect to database
connectDB();

app.use("/api/books", bookRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

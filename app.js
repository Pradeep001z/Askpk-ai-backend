require("dotenv").config();
const express = require("express");
const cors = require("cors");

require("./utils/firebaseAdmin");  // IMPORTANT

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const askRoutes = require("./routes/auth");

app.use("/api", askRoutes);

app.get("/", (req, res) => {
    res.send("Backend Running Successfully 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));

const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const connectdb = require("./config/db");
const userrouter = require("./routes/userRoute");
const noterouter = require("./routes/noteRoute");
dotenv.config();
app.use(cors());
app.use(express.json());

connectdb();

app.use("/api/users", userrouter);

app.use("/api/notes", noterouter);

app.get("/", (req, res) => {
  res.send("API End point...");
});

app.get("/api/notes", (req, res) => {
  res.send(notes);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on ${PORT}`));

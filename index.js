const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const register = require("./routes/register")
const login = require("./routes/login")
const getUser = require("./routes/getUser")
const createCard = require("./routes/createCard")
const getCard = require("./routes/getCard")
const getUserCard = require("./routes/getUserCard")
const editCard = require("./routes/editCard")
const deleteCard = require("./routes/deleteCard")
const app = express();

const port = process.env.PORT || 6000;

app.use(express.json());
app.use("/api/register", register)
app.use("/api/login", login)
app.use("/api/user", getUser)
app.use("/api/createCard", createCard)
app.use("/api/getCard", getCard)
app.use("/api/getUserCard", getUserCard)
app.use("/api/editCard", editCard)
app.use("/api/deleteCard", deleteCard)


mongoose
    .connect(process.env.DB, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connected"))
    .catch(() => console.log("MongoDB failed"));

app.listen(port, ()=> console.log(`server started on port ${port}`));


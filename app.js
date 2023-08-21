const {config} = require('dotenv')
config({
    path: "./data/config.env"
})
require('express-async-errors');
// const cors = require('cors')()
const express = require('express');
const app = express()
const {connectDB} = require('./models/db')
// const mongoose = require("mongoose");

const userRoutes = require('./routes/users')
const genreRoutes = require('./routes/genres')

const PORT  = 3000 || process.env.PORT;

// app.use(cors())
app.use(express.json());
app.use('/api/users',userRoutes);
app.use('/api/genre',genreRoutes);

connectDB()

app.listen(PORT , ()=>console.log(`server listening on port ${PORT}`));
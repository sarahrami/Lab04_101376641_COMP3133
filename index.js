require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/UserRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use(bodyParser.json());

const DB_CONNECTION_STRING = process.env.MONGODB_URI;

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true ,
}).then(() => {
    console.log("Successfully connected to database");    
}).catch(err => {
    console.log('Failed to connect to database.', err);
    process.exit();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

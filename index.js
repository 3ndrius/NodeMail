const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.json({message: 'Succes from server'})
})

let port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server listening on port ${port}`) )
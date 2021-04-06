const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./Model/User');
var cors = require('cors');
const cookie = require('cookie-parser');
const {Login, Signup} = require('./controller/userController')
const auth = require('./middleware/auth')

app.use(express.json());
app.use(cors());
app.use(cookie());

let URL = 'mongodb+srv://iamkarthick:karthick29@maincluster.1jsxq.mongodb.net/TravelTech?retryWrites=true&w=majority'
app.get('/', (req,res)=>{
    return res.send('Hello World')
});

app.post('/login',Login )

app.post('/signup', Signup)

app.use(auth);

app.get('/dashboard', (req,res) => {
    return res.send("Check Auth");
})

mongoose.connect(URL,{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }).then(()=>{
    console.log("DB Connected")
}).catch((e)=>{
    console.log("DB Error")
})

app.listen(8000, ()=> {
    console.log("Server Running")
});


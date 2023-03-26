const express = require("express");
const app = express();
const cors = require ("cors")
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./models/user.js')

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'adlfkasdfafoweirud'

require('dotenv').config()


app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test ok')
})

app.post('/register', async (req, res) =>{
    const {firstName, lastName, email, password} = req.body;

try {
    const userDoc = await User.create({
        firstName,
        lastName,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
    })
    res.json(userDoc); 
} catch(e) {
    res.status(422).json(e)
}
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body
    const userDoc = await User.findOne({email})
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            jwt.sign({email:userDoc.email, id:userDoc._id}, jwtSecret, {} , (err,token) => {
                if(err) throw err; 
                res.cookie('token', token).json('userDoc')
            })
            
        } else {
            res.status(422).json('pass not ok')
        }
    } else {
        res.status(422).json('not found')
    }
})



app.listen(4000)
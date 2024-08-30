const express = require("express")
const bcrypt  = require ("bcryptjs")
const jwt = require ("jsonwebtoken")
const User = require("../models/User")

const router = express.Router()


//Register Module

router.post("/register", async (req,res) => {
    const {username,email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({msg:"User already exist"});
        }

        user = new User({ username , email , password});
        await user.save();

        const payload = {user:{id:user.id}};
        
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY , {expiresIn:"7d"});
        res.json({token})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});


//Login Module

router.post("/login" , async (req,res) => {
    const{username,password} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({msg:"User does not exist"})
        }
        const isMatch = await bcrypt.compare(password , user.password);
        if (!isMatch) {
            return res.status(400).json({msg:"Inavlid Credentials"})
        }

        const payload = {user:{id:user.id}};

        const token = jwt.sign(payload , process.env.JWT_SECRET_KEY , {expiresIn:"7d"});
        res.json({token});
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }
});


module.exports = router;


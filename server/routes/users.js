const mongoose = require('mongoose');
const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');
const utils = require('../libs/utils');


router.get('/verify', passport.authenticate('jwt', {session: false}),  (req, res, next) => {
    res.status(200).json({success: true, msg: "You are authorized"});;
});

router.post('/login', async (req, res, next) => {
    await User.findOne({ username: req.body.username})
        .then((user) =>{
            if(!user){
                res.status(401).json({success: false, msg: "Couldn't find user"});
            } else {
                const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

                if(isValid){
                    const tokenObject = utils.issueJWT(user);

                    res.status(200).json({ success : true, user : user, token : tokenObject.token, expires : tokenObject.expires})
                } else {
                    res.status(401).json({ success: false, msg : "you entered the wrong password"})
                }  
            }
        })
        .catch(err => next(err));
});
router.post('/register', async (req, res, next) => {
    try{
        const existingUser = await User.findOne({ username: req.body.username});
        if(existingUser){
            res.status(400).json({success: false, msg: 'Username is already taken'});
        } else {
            const saltHash = utils.genPassword(req.body.password);

            const salt = saltHash.salt;
            const hash = saltHash.hash;
            
            const newUser = new User({
                username: req.body.username,
                hash: hash,
                salt: salt,
                isAdmin: false
            });

            const savedUser = await newUser.save();
        
            const jwt = utils.issueJWT(savedUser);

            res.status(200).json({
                success: true, 
                user: savedUser, 
                token: jwt.token, 
                expires: jwt.expires
            });
        }

        
    } catch(err){
        next(err);
    }


});

module.exports = router;
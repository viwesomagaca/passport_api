const passport = require('passport');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.post('/register', passport.authenticate('register',{session:false}) ,async(req,res,next) =>{
    passport.authenticate('login', async(err, user) =>{
        try{
            const body ={ _id: user._id, email:user.email};
            const token = jwt.sign({ user:body}, 'top_secret');
            res.json({
                success: true,
                user:req.user,
                token: token,
                message:"Signup sucessfully"
            })
        } catch(err){
            res.json({
                success:false,
                error:err,
                message:"User Authentication Failed"
                
            })
        }
    })(req,res,next);
});

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {   
      try {
        if(err || !user){
          return res.json({
            success: false,
            message: 'Credentials do not Match'
          })
        }
        req.login(user, { session : false }, async (error) => {
          if( error ) return next(error)
          const body = { _id : user._id, email : user.email };
          const token = jwt.sign({ user : body },'top_secret');
          return res.json({ 
            success:true,
            message : 'Login Successful',
            user : req.user ,
            token : token
           })  
         })
        } catch (err) {
         res.json({
            success: false,
            error: err
         })
        }
      })(req, res, next);
    });

module.exports = router;
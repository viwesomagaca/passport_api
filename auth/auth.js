const localStrategy = require('passport-local').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy;
const userModel = require('../model/auth');
const passport = require('passport');

// Passport middleware created
passport.use('register', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
} ,async (email, password, done) =>{
 try{
     const user = await userModel.create({email, password});
     return done(null, user, {message:"User is sucessfully registered"})
 } catch(err){
     done(err)
}
}));

passport.use('login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async ( email, password, done) =>{
  try{
      const user = await userModel.findOne({ email });
      if (!user){
          return done(null, false, { message: 'User does not exist'});
      }

       const validate = await user.isValidPassword(password);
      if(!validate){
           return done(null,false,{ message:'Password does not Match'});
      }
      return done(null, user, { message: 'Logged in Sucessfully'})
  } catch(err){
      return done(err);
 }

}));


passport.use(new JWTstrategy({
    secretOrKey : 'top_secret',
    jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
  }, async (token, done) => {
    try {
      console.log("USER TOKEN", token);
    
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }));
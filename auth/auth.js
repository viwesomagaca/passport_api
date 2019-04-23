const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('../model/auth');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

//Passport middleware created
passport.use('register', new localStrategy({
    usernameField: 'email',
    passwordField: 'passwordField'
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
    passwordField: 'password'
}, async (email, password, done) =>{
    try{
        const user = await userModel.findOne({ email});
        if(!user){
            return done(null, false ,{ message: 'User does not exist'})
        }
        const validate = await user.isValidPassword(password);
        if(!validate){
            return done(null, false, {message:'Invalid Credentials'})
        }
        return done(null, user, { message: 'Sucessfuly logged in'})
    } catch(err){
        return done(err);
}
}));

passport.use(new JWTstrategy({
    secretOrKey: 'top_Secret',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done)=>{
    try{
        console.log('USER TOKEN', token);
        return done(null,token.user);
    } catch (err){
        done(err);
}
}));
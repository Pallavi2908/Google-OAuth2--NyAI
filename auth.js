const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    passReqToCallback: true
  },
  function( request, accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
    }
));

passport.serializeUser((user,done)=>{
    done(null,user)
});
passport.deserializeUser((user,done)=>{
    done(null,user);
})
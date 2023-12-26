const express = require('express');
const passport = require('passport');
const path=require('path');
const app = express();
const he = require('he');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); 
const session = require('express-session');
require('./auth');
app.use(express.json());
app.use(express.static (path.join (__dirname, '/')));


app.get('/',(req, res) =>{
    res.sendFile('index.html');
});

function isLoggedIn(req, res, next){
    req.user ? next() : res.sendStatus(401);
}

//setting up Token
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/auth/protected');
  });

app.get ('/auth/google/failure', (req, res)=>{
    res.send('something went wrong');
});

app.get('/auth/protected',isLoggedIn, (req, res)=>{
  const user=req.user;
  res.render('greeting',{user});
  const  data  = req.user; 
  console.log(data);
    // let name = req.user.displayName;
    // res.send(`Hello ${name}`);
    // let userProfile= req.user;
    // console.log(req.user);
    // res.send(`Hello ${userProfile.displayName}<br>Profile: ${JSON.stringify(userProfile)}`);
});
app.use((err, req, res, next) => {
  res.status(500).send();
});

app.listen(3000, ()=>{
    console.log('Server listening to port no 3000');
});


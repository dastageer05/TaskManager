const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser")

const userRoute = require('./routes/user');
const taskRoute = require('./routes/task')

const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const app = express();

mongoose.connect('mongodb://localhost:27017/taskmanager').then((e)=> console.log("mongodb connected") )

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) =>{
    res.render('home', {
      user: req.user,
    })
});

app.use("/user", userRoute);
app.use('/task', taskRoute);

app.listen(1000, ()=>{
    console.log('port listening on 1000');
    
})
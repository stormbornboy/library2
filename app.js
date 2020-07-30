const express = require('express');
const path = require('path');
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const flash = require('connect-flash');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const configDB = require('./config/database.js');

// mongoose.connect(configDB.url);
mongoose.connect('mongodb+srv://admin-mohammad:admin-mohammad@cluster0.w3cwl.mongodb.net/libraryDB?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));
    

    
require('./config/passport')(passport);

app.set('views', path.join(__dirname, 'views'));
app.use('/', express.static('public'));
app.set('view engine', 'ejs');
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: false })); // get information from html forms


app.use(session({ resave: false, saveUninitialized: true, secret: 'secretsession' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

require('./routes')(app, passport); // load our routes and pass in our app and fully configured passport

const port = process.env.PORT || 3000;
app.listen(port);
console.log('Server running on ' + port);
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var morgan = require('morgan');
const methodOverride = require('method-override')
var handlebars = require('express-handlebars');
const port = 3000;
require('./config/db')

const route = require('./routes')

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

// HTTP loger
app.use(morgan('combined'))

var hbs = handlebars.create({
    helpers: {
        sum: (a, b) => a + b,
        value_condition: (value) => {
            if (value === 'black') {
                return value;
            } else {
                return '';
            }
        }
    },
    extname: '.hbs',
    defaultLayout: 'main',
    // partialsDir: ['views/partials/']
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
app.use(methodOverride('_method'))
app.use(morgan('dev'));
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



route(app);


app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
)

module.exports = app;
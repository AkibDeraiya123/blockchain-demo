const http = require('http');
const path = require('path');

const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

// Load dotenv config
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  require('dotenv').load();

  if (!process.env.PORT) {
    console.error('Required environment variable not found. Are you sure you have a ".env" file in your application root?');
    console.error('If not, you can just copy "example.env" and change the defaults as per your need.');
    process.exit(1);
  }
}

const routes = require('./routes');

const app = express();
const server = http.createServer(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(express.bodyParser({uploadDir:'/public/images/profile/'}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// Catch 404 errors
// Forwarded to the error handlers
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development error handler
// Displays stacktrace to the user
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

server.listen(process.env.PORT);
console.log(`Server started on port ${process.env.PORT}`);
module.exports = app;

// var express = require('express');
// var app = express();
// let walletAddress = '';
// let generatedAdd = {};
// bcypher = require('blockcypher');

// var bcapi = new bcypher('btc','main','c5875043667140f08e5478747927a78e');

// function printResponse(err, data) {
//   if (err !== null) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// }

// //get chain info
// bcapi.getChain(function(err, data){})


// app.get('/', function (req, res) {
// 	console.log("hello");
// 	res.send("<h1>Hello</h1>")
// })

// app.get('/createWallet', function(req, res){
// 	// Create a New address
// 	bcapi.genAddr({}, function(err, data){
// 		console.log("err", err);
// 		console.log("data", data);
// 		if (err === null && Object.keys(data).length > 0) {
// 			generatedAdd = data;
// 			walletAddress = data.address;			
// 			bcapi.createWallet({"name": "demo","addresses": [walletAddress]}, function(error, walletRes){
// 				console.log("error", error);
// 				console.log("walletRes", walletRes);
// 			})
// 		} else {
// 			res.send("<h2>Sorry something went wrong. Please try again</h2>")
// 		}
// 	})	
// })

// app.listen(3001)
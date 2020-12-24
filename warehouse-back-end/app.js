var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const mongoose = require('mongoose');
var config = require('./config');


var itemsRouter = require('./routes/items');
var productsRouter = require('./routes/products');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/items', itemsRouter);
app.use('/products',productsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//Mongo DB connection
const url = config.mongoUrl;
const connect = mongoose.connect(url, {useNewUrlParser: true},{ useUnifiedTopology: true } );
connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

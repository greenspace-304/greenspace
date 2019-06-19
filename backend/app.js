var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home')
var usersRouter = require('./routes/users');
var plantsRouter = require('./routes/plantdescription');
var photoRouter = require('./routes/photogallery');
var mapRouter = require('./routes/map');
var collectionRouter = require('./routes/collection')
var questionaireRouter = require('./routes/questionaire');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/home', homeRouter)
app.use('/users', usersRouter);
app.use('/plantdescription', plantsRouter);
app.use('/photo', photoRouter);
app.use('/map', mapRouter);
app.use('/collection', collectionRouter)
app.use('/questionaire', questionaireRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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

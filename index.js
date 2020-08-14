var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var server = require('http').createServer(app)
var io = require('socket.io')(server)

var indexRouter = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css',express.static(path.join(__dirname,'node_modules/bootstrap/dist/css') ))
app.use('/js',express.static(path.join(__dirname,'node_modules/bootstrap/dist/js')))
app.use('/js',express.static(path.join(__dirname,'node_modules/jquery/dist')))
app.use('/js',express.static(path.join(__dirname,'node_modules/@popperjs/core/dist/umd/')))

app.locals.counter = 0;
app.use('/',indexRouter)

io.on("connect",(socket)=>{
    console.log("user has connected")
    socket.on('increment',()=>{
        app.locals.counter = app.locals.counter + 1;
        io.emit("count change", app.locals.counter);
        // console.log("increment button clicked",app.locals.counter)
    })
    socket.on("reset",()=>{
        app.locals.counter = 0;
        io.emit("count change", app.locals.counter);
        // console.log("reset button clicked",app.locals.counter)
    })
})

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

server.listen(3000,()=>{
    console.log("server on port 3000")
});
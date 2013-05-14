/* Modules */
var express = require('express')
  , routes = require('./routes')
  , pkg = require('./package.json') /* NOTE: You will need to use JSON.parse if you are not using node js above 0.8 */
  , http = require('http')
  , path = require('path');

/* Local Stuff */
var app = express(),
    isProd = ('production' == app.get('env')),
    jsPath = isProd ? '/ojs/v' + pkg.version : '/js',
    cssVersion = isProd ? pkg.version : 0;

app.configure(function(){
  app.set('port', process.env.PORT || 3030);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('secret'));

  // expose settings to client
  app.use(function(req, res, next) {
    res.locals.isProd = isProd;
    res.locals.jsPath = jsPath;
    res.locals.cssVersion = cssVersion;
    next();
  });

  app.use(express.favicon());

  
  // setup the router
  app.use(app.router);
  
  // setup less for css
  app.use(require('less-middleware')({ 
    src: __dirname + '/public', 
    compress: isProd, // compress when in production
    optimization: 2,  
    once: isProd // check for changes only once in production
  }));
  
  // finally the static file dir
  app.use(express.static(path.join(__dirname, 'public')));
  
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

// app routes
app.get('/', routes.index);

// Init server
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

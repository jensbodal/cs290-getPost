var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 40000);


app.post('/post-loopback', function(req, res) {
    var qParams = [];
    for (var p in req.body) {
        qParams.push({'name':p, 'value':req.body[p]});
    }
    console.log(qParams);
    console.log(req.body);
    var context = {};
    context.dataList = qParams;
    res.render('post-loopback', context);
});


app.get('/post-loopback', function(req, res) {
    var qParams = [];
    for (var p in req.query) {
        qParams.push({'name':p, 'value': req.query[p]});
    }
    var context = {};
    context.dataList = qParams;
    res.render('show-data', context);
});



app.get('/show-data',function(req, res) {
    var context = {};
    context.sentData = req.query.myData;
    res.render('show-data', context);
});

app.get('/get-loopback-improved', function(req, res) {
    var qParams = [];
    for (var p in req.query){
        qParams.push({'name':p, 'value': req.query[p]})
    }
    var context = {};
    context.dataList = qParams;
    res.render('show-data', context);
});

app.get('/',function(req,res){
  res.render('home');
});

app.get('/other-page',function(req,res){
  res.render('other-page');
});

app.get('/time', function(req, res) {
    res.render('time', genContext());
});

app.get('/random', function(req, res) {
    res.render('random', genRandom());
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

function genContext() {
    var stuffToDisplay = {};
    stuffToDisplay.time = (new Date(Date.now())).toLocaleTimeString('en-US');
    return stuffToDisplay;
}

function genRandom() {
    var asdf = {};
    asdf.jens = Math.floor((Math.random() * 10) + 1);
    return asdf;
}


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

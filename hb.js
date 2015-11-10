var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 40000);

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

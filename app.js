var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('error-handler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();
var router = express.Router();


app.use(bodyParser());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'dist')));
// app.use(express.static(__dirname + '/bower_components'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/', routes.index);
app.get('/:name', routes.partials);

//JSON API
app.get('/api/:item', api.listItems);
app.get('/api/:item/:id', api.item);
app.post('/api/:item', api.addItem);
app.put('/api/:item/:id', api.editItem);
app.delete('/api/:item/:id', api.deleteItem);

//Start Server
// app.listen(5000, 'localhost');
// console.log('Listening on port 5000');
app.set('port', (process.env.PORT || 5000));


// app.get('/cool', function(request, response) {
//   response.send(cool());
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
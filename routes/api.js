var fs = require('fs');
var dataString = fs.readFileSync('data.json').toString();
var data = JSON.parse(dataString);
console.log(data);

//GET

exports.listItems = function(req, res){
  var item = req.params.item;
  if(!data.hasOwnProperty(item)){
    data[item] = [];
  }
  res.json(data[item]);
};

exports.item = function(req, res){
  var item = req.params.item;
  if(!data.hasOwnProperty(item)){
    data[item] = [];
  }
  var id = req.params.id;
  if(id >= 0 && id < data[item].length){
    res.json(data[item][id]);
  }
  else{
    res.json(false);
  }
};

// POST
exports.addItem = function(req, res){
  var item = req.params.item;
  if(!data.hasOwnProperty(item)){
    data[item] = [];
  }
  data[item].push(req.body);
  fs.writeFileSync('data.json', JSON.stringify(data));
  req.body.id = data[item].length - 1;
  res.json(req.body);
  console.log(req.body);
}

//PUT
exports.editItem = function(req, res){
  var item = req.params.item;
  if(!data.hasOwnProperty(item)){
    data[item] = [];
  }
  var id = req.params.id;
  if(id >= 0 && id < data[item].length){
    data[item][id] = req.body;
    fs.writeFileSync('data.json', JSON.stringify(data));
    res.json(req.body);
  }
  else{
    res.json(false);
  }
};

// DELETE
exports.deleteItem = function(req, res){
  var item = req.params.item;
  if(!data.hasOwnProperty(item)){
    data[item] = [];
  }
  var id = req.params.id;
  if(id >= 0 && id < data[item].length){
    data[item].splice(id, 1);
    fs.writeFileSync('data.json', JSON.stringify(data));
    res.json(req.body);
  }
  else{
    res.json(false);
  }
};

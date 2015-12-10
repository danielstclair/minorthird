exports.index = function(req, res){
  res.render('./../dist/index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  // console.log(name)
  res.render('./../dist/' + name);
};
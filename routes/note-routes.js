module.exports = function(app) {
  var baseUrl = '/api/v_0_0_1/notes';

  app.get(baseUrl, function(req,res){
    res.json([{"noteBody" : "my new note"}]);
  });
};

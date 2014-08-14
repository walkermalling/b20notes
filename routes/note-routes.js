module.exports = function(app) {
  var baseUrl = '/api/v_0_0_1/notes';

  app.get(baseUrl, function(req,res){
    res.json([{"noteBody" : "my new note"}]);
  });

    app.post(baseUrl, function(req, res) {
    var note = req.body;
    // db stuff to come
    res.json({"_id" : "1234", "noteBody" : note.noteBody });
  });
};

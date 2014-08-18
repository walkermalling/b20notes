var Note = require('../models/note');

module.exports = function(app) {
  var baseUrl = '/api/v_0_0_1/notes';

  app.get(baseUrl, function(req,res){
    Note.find( {}, function(err, notes){
      handle(res, err, notes);
    });
  });

  app.get(baseUrl + '/:id', function(req,res){
    Note.findOne( {'_id' : req.params.id}, function(err, resNote){
      handle(res, err, resNote);
    });
  });

  app.post(baseUrl, function(req, res) {
    var note = new Note(req.body);
    note.save(function( err, resNote ){
      handle(res, err, resNote);
    });
  });

  app.put(baseUrl + '/:id', function(req, res){
    var note = req.body;
    delete note._id;
    Note.findOneAndUpdate({'_id':req.params.id}, note, function(err, resNote){
      handle(res, err,resNote);
    });
  });

  app.delete(baseUrl + '/:id', function(req, res){
    Note.remove({'_id':req.params.id}, function(err, resNote){
      handle(res, err, {"msg":"deleted"});
    });
  });

  function handle(res, err, data){
    if(err) return res.status(500).json(err);
    return res.status(200).json(data);
  }
  
};

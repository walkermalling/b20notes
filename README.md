# Simple Notes App (FSJE Etude)
================================================

A simple web app to keep notes.  

Runs with node, express.

Steps I ran to get it running, in chronological order:

* `npm install express --save`
* `touch server.js`

*server.js*

```
var http = require('http');
var express = require('express');
var app = express();

require('./routes/note-routes')(app); //

var server = http.createServer(app);

app.set('port', process.env.PORT || 3000 );

server.listen(app.get('port'), function() {
  console.log('Server running on :3000');
});
```

* `mkdir routes`
* `touch routes/note-routes.js`

```
module.exports = function(app) {
  var baseUrl = '/api/v_0_0_1/notes';

  app.get(baseUrl, function(req,res){
    res.json([{"noteBody" : "my new note"}]);
  });
};
```

running `node server.js` at this point will work

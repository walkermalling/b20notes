# Simple Notes App (FSJE Etude)
================================================

A simple web app to keep notes.  

Runs with node, express.

Steps I ran to get it running, in chronological order:

* `touch .gitignore` and ignore node_modules
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

* add basic dev dependencies to package.json and run `npm install`

```
"chai": "^1.9.1",
"chai-http": "^0.4.0",
"grunt": "^0.4.5",
"grunt-browserify": "^2.1.4",
"grunt-casperjs": "^1.5.0",
"grunt-contrib-clean": "^0.6.0",
"grunt-contrib-concat": "^0.5.0",
"grunt-contrib-htmlmin": "^0.3.0",
"grunt-contrib-jshint": "^0.10.0",
"grunt-contrib-sass": "^0.7.4",
"grunt-contrib-uglify": "^0.5.1",
"grunt-express-server": "^0.4.17"
```

* `touch Gruntfile` and make it look like this:

```
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean : ['dist'],

    // JS HINT
    jshint: {
      all: ['Gruntfile.js', 'server.js']
    }

  });

  grunt.registerTask('default', ['jshint','clean']);
};

```

* install chai `npm install chai --save-dev` for testing
* install chai-http `npm install chai-http --save-dev` for testing http requests
* install body-parser `npm stall body-parser --save-dev`

update routes file to handle posts:

```
  app.post(baseUrl, function(req, res) {
    var note = req.body;
    // db stuff to come
    res.json({"_id" : "1234", "noteBody" : note.noteBody });
  });
```

update server.js to require body-parser:

```
var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.json());
require('./routes/note-routes')(app); //

var server = http.createServer(app);

app.set('port', process.env.PORT || 3000 );

server.listen(app.get('port'), function() {
  console.log('Server running on :3000');
});
```

now test:

```
mkdir -p test/mocha
cd test/mocha
touch api-routes-test.js
```

create test:

```
/*jslint node: true */
'use strict';

var server = require('../../server.js');
var chai = require('chai');
var chaithttp = require('chai-http');

chai.use(chaithttp);

var expect = chai.expect;

describe('note routes api', function(){

  it('should be able to get', function(done) {
    chai.request('http://localhost:3000')
      .get('/api/v_0_0_1/notes')
      .res(function(res){
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body)).to.be.true;
        expect(res.body[0]).to.have.property('noteBody');
        done();
      });
  });

  it('creates a new note', function(done) {
    chai.request('http://localhost:3000')
      .post('/api/v_0_0_1/notes')
      .req(function(req) {
        req.send({"noteBody" : "my new note"});
      })
      .res(function(res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id');
        expect(res.body.noteBody).to.eql('my new note');
        done();
      });
  });
});
```

run the test:

* `mocha test/mocha`

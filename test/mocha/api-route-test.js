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

const express = require('express');
const router = express.Router();
const TestModel = require('../Models/TestBuild_model');


router.post('/add/', 
    function (request, response) {
    if(!request.body){
        response.status(204)
        response.send('missing body')
    }
    TestModel.addTest(request, function(err, dbResult) {
      console.log("here")
        if(err){
            response.json(err)
        } else {
            response.status(202);
            response.send('succesfully added')
        }
    })
});

router.get('/verify/',
    function(request, response) {
    if(!request.body){
      response.status(204)
      response.send('missing body')
    }
    TestModel.verifyQuestion(request ,function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

module.exports= router;
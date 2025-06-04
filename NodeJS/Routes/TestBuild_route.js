const express = require('express');
const router = express.Router();
const TestModel = require('../Models/TestBuild_model');


router.post('/add/', 
    function (request, response) {
    if(!request.body){
        response.status(204)
        response.send('missing body')
    }
   TestModel.getId(function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
      console.log(dbResult["TestId"])
      request.body["TestId"] = dbResult[0].TestId;
      console.log(request.body)
      TestModel.addTest(request, function(err) {
        if(err){
            response.json(err)
        } else {
            response.status(202);
            response.send('succesfully added')
        }
    })
    }
   });
});

router.get('/id/',
    function(request, response) {
    TestModel.getId(function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

router.get('/verify/',
    function(request, response) {
    if(!request.body){
      response.status(204)
      response.send('missing body')
    }
    TestModel.verifyQuestion(request.body ,function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

module.exports= router;
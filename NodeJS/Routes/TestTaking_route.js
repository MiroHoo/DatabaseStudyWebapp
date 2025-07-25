const express = require('express');
const router = express.Router();
const TestTaker = require('../Models/TestTaking_model.js');
const TestModel = require('../Models/TestBuild_model');

router.post('/com',
     function (request,response) {
        var id = request.body.QuestionId     
        TestTaker.getById(id, function(err,dbResult){
            if (err) {
              response.json(err);
            
            } else {
              response.json(dbResult);
            }
        
     })
})

router.get('/:id', function(request,response){
    TestTaker.getById(request.params.id, function(err,dbResult){
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
    })
    console.log(dbResult)
    TestModel.verifyQuestion(dbResults,function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
})


module.exports= router;
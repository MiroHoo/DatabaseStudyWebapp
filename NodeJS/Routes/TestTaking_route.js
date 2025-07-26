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
    var correctquery; 
    var stundetanswer;
    var teacheranswer;
    TestTaker.getById(request.params.id, function(err,dbResult){
    if (err) {
      response.json(err);
    } else {
      console.log(dbResult)
      correctquery = dbResult
    }
    })
 console.log("UserQ")
    TestModel.verifyQuestion(request.body.studentQ,function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      stundetanswer = dbResult
    }
  });
  console.log("correct")
  TestModel.verifyQuestion(correctquery,function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      teacheranswer = dbResult
    }
  });
    if(stundetanswer === teacheranswer){
        response.send('correct')
    } else {
        response.send("incorrect")
    }
})


module.exports= router;
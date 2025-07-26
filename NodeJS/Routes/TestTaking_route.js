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
    var error1 = "";
    var error2 = "";
    TestTaker.getById(request.params.id, function(err,dbResult){
        console.log(request.params.id)
    if (err) {
        error1 = err
    } else {
      correctquery = dbResult[0].Answer
    }
    })
    console.log(correctquery)
    TestModel.verifyQuestion(request.body.stundentQ,function(err, dbResult) {
    if (err) {
        error2 = err
    } else {
        console.log(dbResult[0])
      stundetanswer = dbResult[0]
    }
  });
  TestModel.verifyQuestion(correctquery,function(err, dbResult) {
    if (err) {
    } else {
        console.log("here")
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
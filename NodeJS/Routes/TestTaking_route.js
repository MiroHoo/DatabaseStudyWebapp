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
        console.log(request.params.id)
    if (err) {
        error1 = err
    } else {
        console.log("Teacher")
        console.log(dbResult)
        correctquery = dbResult
    }
    })
    TestModel.verifyQuestion(request.body.stundentQ,function(err, dbResult) {
    if (err) {
    } else {
    console.log(request.body.stundentQ)
      console.log("Student")
      console.log(dbResult)
      stundetanswer = dbResult
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
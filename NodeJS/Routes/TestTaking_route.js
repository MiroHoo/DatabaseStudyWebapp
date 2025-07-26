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

function asyncverifyQuestion(question) {
  return new Promise((resolve, reject) => {
    TestModel.verifyQuestion(question, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}
function asyncgetById(id) {
  return new Promise((resolve, reject) => {
    TestTaker.getById(id, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

router.get('/:id', async function(request,response){

    const correctquery = await asyncgetById(request.params.id);
    const studentAnswer = await asyncverifyQuestion(request.body.stundentQ);
    const teacherAnswer = await asyncverifyQuestion(correctquery[0].Answer);
    if(JSON.stringify(studentAnswer[0]) === JSON.stringify(teacherAnswer[0])){
        response.send('correct')
    } else {
        response.send("incorrect")
    }
})


module.exports= router;
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

router.post('/:id', async function(request,response){
  console.log(request.body)
    //Get correct answer
    console.log("here")
    const correctquery = await asyncgetById(request.params.id);
    //Run student query
    const studentAnswer = await asyncverifyQuestion(request.body.studentQ);
    console.log("here")
    //Run teacher query
    console.log("here")
    const teacherAnswer = await asyncverifyQuestion(correctquery[0].Answer);
    //Run serialize the json and compare
    console.log("here")
    if(correctquery.includes("ORDER BY") || correctquery.includes("order by")){
      const teacher_arr = JSON.parse(teacherAnswer[0])
      const student_arr = JSON.parse(studentAnswer[0])
      console.log("Teachers array: " + teacher_arr)
      console.log("Students array: " + student_arr)
      if(JSON.stringify(studentAnswer[0]) === JSON.stringify(teacherAnswer[0])){
        response.json({outcome:true})
      } else {
        response.json({outcome:false})
      } 
    } else {
     if(JSON.stringify(studentAnswer[0]) === JSON.stringify(teacherAnswer[0])){
        response.json({outcome:true})
    } else {
        response.json({outcome:false})
    } 
    }
    
})


module.exports= router;
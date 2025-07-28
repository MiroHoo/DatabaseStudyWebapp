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

router.post('/:id', async function(request,response,cb){
    //Get correct answer
    const correctquery = await asyncgetById(request.params.id);
    console.log(correctquery[0].Answer)
    console.log(request.body.studentQ)

    //compare queries to make sure if they are identical
    if(correctquery[0].Answer === request.body.studentQ){
       response.json({outcome:true, message:"The answers are the same!"})
       return 
    } else if (request.body.studentQ.includes(";") === false){
      response.json({outcome:false, message:"The answer was incorrect since it was missing the `;`"})
      return
    }
    //Run student query
    const studentAnswer = await asyncverifyQuestion(request.body.studentQ);
    //Run teacher query
    const teacherAnswer = await asyncverifyQuestion(correctquery[0].Answer);
    //Run serialize the json and compare
    if(correctquery.includes("ORDER BY") || correctquery.includes("order by")){
      const teacher_arr = JSON.parse(teacherAnswer[0])
      const student_arr = JSON.parse(studentAnswer[0])
      console.log("Teachers array: " + teacher_arr)
      console.log("Students array: " + student_arr)
      if(JSON.stringify(studentAnswer[0]) === JSON.stringify(teacherAnswer[0])){
        response.json({outcome:true, message:"The answers were similar!"})
      } else {
        response.json({outcome:false})
      } 
    } else if (request.body.studentQ.includes("ORDER BY") === false && request.body.studentQ.includes("order by") === false) {
     if(JSON.stringify(studentAnswer[0]) === JSON.stringify(teacherAnswer[0])){
        response.json({outcome:true, message:"The answers are the same!"})
    } else {
        response.json({outcome:false})
    } 
    } else {
       response.json({outcome:false})
    }
    
})


module.exports= router;
const express = require('express');
const router = express.Router();
const TestTaker = require('../Models/TestTaking_model.js');
const TestModel = require('../Models/TestBuild_model');

//list of additional queries to be scored for half points
const ListOfQueries = {
  Queries: [
  "ORDER BY",
  "UPDATE",
  "DELETE",
  "WHERE",
  "DESC",
  "ASC",
  "LIMIT",
  "MAX",
  "AVG",
  "MIN",
]
}
//List of queries which alter database
const ListOfAlteringQueries = {
  Queries: [
    "DROP",
    "DELETE",
    "ALTER",
    "INSERT INTO",
    "UPDATE"
]
}

//adds and calculates average for tests points
router.get('/avg/:id', function (req,res){
    TestTaker.getTestAttempts(req.params.id,function(err,dbResult){
    var temparray = []
    var elemarray = []
    var id = 1
      if(dbResult[0] !== undefined){
          id = dbResult[0].Attempt_id +1
      } 
    var index = 0; 
    //group based on attempt id
    dbResult.forEach((c,i)=>{
        if(c.Attempt_id !== id){
            elemarray.push(temparray)
            id = c.Attempt_id
            index=0;
            temparray=[]
        }
        temparray.push(c)
        index++;  
    })
    elemarray.push(temparray)
    var testlength = 0;
    temparray = []
    var scoreAmount = 0;
    elemarray.forEach((scores,index)=>{
      testlength = testlength + scores.length
      scores.forEach((c,i)=>{
        scoreAmount = scoreAmount + parseInt(c.Score)
      })
    })
    const avg = scoreAmount/testlength
    TestTaker.saveAverage({"id": req.params.id, "avg":avg},function(err,dbResult){
      if(err){
        res.json(err)
      } else{
        res.json("Saved")
      }
    })
    })
})  

//saves points and gets it a new attempt id
router.post('/save/',
  function (request, response) {
    TestTaker.GetLargestid(function(err, dbResult) {
      let ts = Date.now();

      let date_time = new Date(ts);
      let date = date_time.getDate();
      let month = date_time.getMonth() + 1;
      let year = date_time.getFullYear();
      let hours = date_time.getHours();
      let minutes = date_time.getMinutes();
      let seconds = date_time.getSeconds();
      const DateTime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
      console.log(DateTime)
      var id = 1
      if(dbResult[0] !== undefined){
          id = dbResult[0].Attempt_id +1
      } 
      var dbArray = request.body.map((c,i)=>{
        c.unshift(id)
        c.unshift(DateTime)
        return c
      })
      TestTaker.postAnswer(dbArray, function (err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    })
    })  
  }
)

//gets answers for testid
router.get('/saved/:id',
  function (request, response) {
    TestTaker.getAnswersbyid(request.params.id,function (err, dbResult) {
      if (err) {
        response.json(err);
      } else {  
        response.json(dbResult);
      }

    })
    
  }
)

//gets all answers
router.get('/allsaved/',
  function (request, response) {
    TestTaker.getAnswers(function (err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    })
    
  }
)

function asyncverifyQuestion(question) {
  //async way of getting the data so that the other logic has to wait
  return new Promise((resolve, reject) => {
    TestModel.verifyQuestion(question, (err, result) => {
       resolve(result);
    });
  });
}
function asyncgetById(id) {
  //async way of getting the data so that the other logic has to wait
  return new Promise((resolve, reject) => {
    TestTaker.getById(id, (err, result) => {
       resolve(result);
    });
  });
}

function checkquery(StudentQ){
  //check if the queries include anything to do with the altering of the database to make sure they dont progress into the database
  var includes = false
  ListOfAlteringQueries.Queries.forEach(element => {
    if(StudentQ.toLowerCase().includes(element.toLowerCase())){
      includes = true
    }
  });
  return includes
}

//checks for similarities for answer to be scores
function checkforsimilarities(TeachQ){
  var includes = []
  ListOfQueries.Queries.forEach(element => {
    if(TeachQ.toLowerCase().includes(element.toLowerCase())){
      includes.push(element)
    }
  });
  return includes
}
//check if student query has similarities to teacher query from the list of advanced queries
function checkforhalfscore(inc,stundetQ){
  var halfscore = false
    inc.forEach(e => {
       if(stundetQ.toLowerCase().includes(e.toLowerCase())){
        halfscore = true
      }
    })
  return halfscore
}
//checks answer and compares the student query if needed. First it checks for database altering queries and then does the comparing
router.post('/:id', async function (request, response) {

  var varoutcome = false
  //Get correct answer
  const correctquery = await asyncgetById(request.params.id);

  const includes = checkforsimilarities(correctquery[0].Answer);

  if(includes.length > 0){
  varoutcome = checkforhalfscore(includes, request.body.studentQ);
  }

  //check if the queries include anything to do with the altering of the database to make sure they dont progress into the database
  const alteringquery = checkquery(request.body.studentQ);


  //check if the query is the same as the teachers when there's database altering queries like "drop" "delete" "update" etc
  if(alteringquery === true){
    if (correctquery[0].Answer === request.body.studentQ) {
    response.json({ outcome: true, message: "The answers are the same!" })
    return
    } else {
    response.json({ outcome: false, half: varoutcome, message:"includes bad words and not similar" })
    return
    }
  }
  //compare queries to make sure if they are identical
  if (correctquery[0].Answer === request.body.studentQ) {
    response.json({ outcome: true, half: varoutcome, message: "The answers are the same!" })
    return
  } 
  //Run student query
  const studentAnswer = await asyncverifyQuestion(request.body.studentQ);
  //Run teacher query
  const teacherAnswer = await asyncverifyQuestion(correctquery[0].Answer);
  if (correctquery.includes("ORDER BY") || correctquery.includes("order by")) {
    //turn both jsons into arrays for the comparison to compare each index in the array without foreach loops

    if (JSON.stringify(studentAnswer[0]) === JSON.stringify(teacherAnswer[0])) {
      response.json({ outcome: true, message: "The answers were similar!" })
      return
    } else {
      response.json({ outcome: false, half: varoutcome, message: "The answer was incorrect" })
      return
    }

  } else if (request.body.studentQ.includes("ORDER BY") === false && request.body.studentQ.includes("order by") === false) {
    if(studentAnswer){
       //Serialize the jsons and compare the outputs. This compares the database answers efficiently
      if (JSON.stringify(studentAnswer[0]) === JSON.stringify(teacherAnswer[0])) {
        response.json({ outcome: true,  message: "The answers are the same!" })
        return
      } else {
        response.json({ outcome: false, half: varoutcome,message:"incorrect" })
        return
      }
    } else {
      response.json({ outcome: false, half: varoutcome, message:"incorrect" })
    }
    //student query includes order by when teachers answer doesn't
  } else {
    response.json({ outcome: false, half: varoutcome, message:"incorrect" })
  }


})


module.exports = router;

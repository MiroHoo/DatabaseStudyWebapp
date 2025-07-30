const express = require('express');
const router = express.Router();
const TestTaker = require('../Models/TestTaking_model.js');
const TestModel = require('../Models/TestBuild_model');

const ListOfQueries = {
  Queries: [
  "SELECT",
  "INSERT",
  "UPDATE",
  "DELETE",
  "CREATE",
  "ALTER",
  "DROP",
  "TRUNCATE",
  "RENAME",
  "GRANT",
  "REVOKE",
  "COMMIT",
  "ROLLBACK",
  "SAVEPOINT",
  "BEGIN",
  "JOIN",
  "UNION",
  "INTERSECT",
  "EXCEPT",
  "WHERE",
  "GROUP BY",
  "HAVING",
  "ORDER BY",
  "LIMIT",
  "OFFSET",
  "SUBQUERY",
  "AGGREGATE",
  "INDEX",
  "VIEW",
  "TRIGGER",
  "PROCEDURE",
  "FUNCTION",
  "CURSOR",
  "TRANSACTION"
]
}
const ListOfAlteringQueries = {
  Queries: [
    "DROP",
    "DELETE",
    "ALTER",
    "INSERT INTO",
    "UPDATE"
]
}

router.post('/com',
  function (request, response) {
    var id = request.body.QuestionId
    TestTaker.getById(id, function (err, dbResult) {
      if (err) {
        response.json(err);

      } else {
        response.json(dbResult);
      }

    })
  })

function asyncverifyQuestion(question) {
  //async way of getting the data so that the other logic has to wait
  return new Promise((resolve, reject) => {
    TestModel.verifyQuestion(question, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}
function asyncgetById(id) {
  //async way of getting the data so that the other logic has to wait
  return new Promise((resolve, reject) => {
    TestTaker.getById(id, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

function checkquery(StudentQ){
  //check if the queries include anything to do with the altering of the database to make sure they dont progress into the database
  ListOfAlteringQueries.Queries.forEach(element => {
    if(StudentQ.toLowerCase() === element.toLowerCase()){
      return true
    }
  });
  return false
}

router.post('/:id', async function (request, response) {
  //Get correct answer
  const correctquery = await asyncgetById(request.params.id);
  //check if the queries include anything to do with the altering of the database to make sure they dont progress into the database
  const alteringquery = checkquery(request.body.studentQ)
  console.log(alteringquery)
  if(alteringquery){
    if (correctquery[0].Answer === request.body.studentQ) {
    response.json({ outcome: true, message: "The answers are the same!" })
    return
    } else {
    response.json({ outcome: false,message:"incorrect" })
    return
    }
  }
  //compare queries to make sure if they are identical
  if (correctquery[0].Answer === request.body.studentQ) {
    response.json({ outcome: true, message: "The answers are the same!" })
    return
  } else if (request.body.studentQ.includes(";") === false) {
    response.json({ outcome: false, message: "The answer was incorrect since it was missing the `;`" })
    return
  }
  //Run student query
  const studentAnswer = await asyncverifyQuestion(request.body.studentQ);
  //Run teacher query
  const teacherAnswer = await asyncverifyQuestion(correctquery[0].Answer);

  if (correctquery.includes("ORDER BY") || correctquery.includes("order by")) {
    //turn both jsons into arrays for the comparison to compare each index in the array without foreach loops
    const teacher_arr = JSON.parse(teacherAnswer[0])
    const student_arr = JSON.parse(studentAnswer[0])

    console.log("Teachers array: " + teacher_arr)
    console.log("Students array: " + student_arr)

    if (JSON.stringify(studentAnswer[0]) === JSON.stringify(teacherAnswer[0])) {
      response.json({ outcome: true, message: "The answers were similar!" })
      return
    } else {
      response.json({ outcome: false, message: "The answer was incorrect" })
      return
    }

  } else if (request.body.studentQ.includes("ORDER BY") === false && request.body.studentQ.includes("order by") === false) {
    //Run serialize the json and compare
    if (JSON.stringify(studentAnswer[0]) === JSON.stringify(teacherAnswer[0])) {
      response.json({ outcome: true , message: "The answers are the same!" })
      return
    } else {
      response.json({ outcome: false ,message:"incorrect" })
      return
    }
    //student query includes order by when teachers answer doesn't
  } else {
    response.json({ outcome: false , message:"incorrect" })
  }

  //see if student query is similar for partial points

})


module.exports = router;
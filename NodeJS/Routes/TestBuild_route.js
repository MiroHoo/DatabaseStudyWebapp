const express = require('express');
const router = express.Router();
const TestModel = require('../Models/TestBuild_model');

//list of queries which alter database
const ListOfAlteringQueries = {
  Queries: [
    "DROP",
    "DELETE",
    "ALTER",
    "INSERT INTO",
    "UPDATE"
]
}
//adds questions to database
router.post('/add/', 
    async function (request, response) {
    if(!request.body){
        response.status(204)
        response.send('missing body')
    }
    await asyncsettest(request);
    TestModel.getId(function(err, dbResult){
              request.body["TestId"] = dbResult[0].TestId;
              TestModel.insertQuestions(request.body,function(err,dbResult){
                if(err){
                  response.json(err)
                } else {
                  response.json(dbResult)
                }
              })
    })
    
//async way of getting the data so that the other logic has to wait
function asyncsettest(request) {
  return new Promise((resolve, reject) => {
    TestModel.addTest(request, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}
});

//check if the queries include anything to do with the altering of the database to make sure they dont progress into the database
function checkquery(query){
  var includes = false
  ListOfAlteringQueries.Queries.forEach(element => {
    if(query.toLowerCase().includes(element.toLowerCase())){
      includes = true
    }
  });
  return includes
}

//gets gets biggest id and sends it
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

//verifies questions query
router.post('/verify/',
    function(request, response) {
    if(request.body === undefined){
      response.status(204)
      response.send('missing body')
      return;
    }
    const alteringquery = checkquery(request.body.query);
    if(!alteringquery){
    TestModel.verifyQuestion(request.body.query ,function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
    });  
    } else [
      response.json({"Message": "Altering Query"})
    ]
    
});
//verifies multiple queries
router.post('/bulk/', 
  function(request, response){
    console.log(request.body)
    if(request.body !== undefined){
    TestModel.verifyBulk(request.body.array, function(err, res) {
      var State = 0;
      console.log(res)
      if(err){
        response.json(err)
      } else {
        if(res !== "false"){
          res.forEach(element => {
            if(!element){
               response.json({"Message" : "One of the queries is incorrect"})
            } 
          });
          response.json({"Message": "All is fine"})
        } else {
          response.json({"Message": "The array is incorrectly formated!"})
        }
        
      }
    })
  } else {
    response.json({"Message" : "The query is missing array input"})
  }
  });


module.exports= router;
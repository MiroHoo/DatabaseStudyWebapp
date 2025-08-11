const express = require('express');
const router = express.Router();
const TestModel = require('../Models/TestBuild_model');


const ListOfAlteringQueries = {
  Queries: [
    "DROP",
    "DELETE",
    "ALTER",
    "INSERT INTO",
    "UPDATE"
]
}

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
function asyncsettest(request) {
  //async way of getting the data so that the other logic has to wait
  return new Promise((resolve, reject) => {
    TestModel.addTest(request, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}
});


function checkquery(query){
  //check if the queries include anything to do with the altering of the database to make sure they dont progress into the database
  var includes = false
  ListOfAlteringQueries.Queries.forEach(element => {
    if(query.toLowerCase().includes(element.toLowerCase())){
      includes = true
    }
  });
  return includes
}

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
const express = require('express');
const router = express.Router();
const TestModel = require('../Models/TestBuild_model');


router.post('/add/', 
    async function (request, response) {
    if(!request.body){
        response.status(204)
        response.send('missing body')
    }
    await asyncsettest(request);
    TestModel.getId(function(err, dbResult){
              request.body["TestId"] = dbResult[0].TestId;
              console.log(request.body)
              TestModel.insertQuestions(request.body,function(err,dbResult){
                if(err){
                  response.json(err)
                } else {
                  console.log("res sent")
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
    }
    TestModel.verifyQuestion(request.body.query ,function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
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
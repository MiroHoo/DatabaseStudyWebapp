const express = require('express');
const router = express.Router();
const TestModel = require('../models/TestBuild_model.js');


router.post('/add/', 
    function (request, response) {
    TestModel.addTest(request.body, function(err, dbResult) {
        if(err){
            response.json(err)
        } else {
            response.status(202);
            response.send('succesfully added')
        }
    })
});

router.get('/verify/',
    function(request, response) {
    TestModel.verifyQuestion(function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});
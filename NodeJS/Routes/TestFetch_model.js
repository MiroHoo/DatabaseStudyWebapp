const express = require('express');
const router = express.Router();
const TestFetch = require('../Models/TestFetch_model');

router.get('/id/',
    function(request, response) {
    TestFetch.getById(function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});


module.exports= router;
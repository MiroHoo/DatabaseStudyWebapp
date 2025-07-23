const express = require('express');
const router = express.Router();
const TestFetch = require('../Models/TestFetch_model');

router.get('/id/:id',
    function(request, response) {
    TestFetch.getById(request.params.id, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});
router.get('/',
    function(request, response) {
    TestFetch.getAll(function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});


module.exports= router;
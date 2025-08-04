const express = require('express');
const router = express.Router();
const TestFetch = require('../Models/TestManage_model');

router.get('/delete/:id',
    function(request, response) {
    TestFetch.deletequestionbyid(request.params.id)
    TestFetch.deletetestbyid(request.params.id,function(err,dbResult){
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
    })
});
router.post('/update/:id',
    function(request, response) {
    console.log(request.body)
    TestFetch.updateNameByid({name: request.body.name, id: request.params.id},function(err, dbResult) {
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
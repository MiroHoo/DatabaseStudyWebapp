const express = require('express');
const router = express.Router();
const TestFetch = require('../Models/TestManage_model');
const bcrypt = require('bcrypt');


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
router.post('/login', async function(request,response) {
  TestFetch.Login(async function(err,dbResult){
    if(err){
      response.json(err)
    } else{
      const userpass = request.body.Password
      const correctpass = dbResult[0].Password
      const match = await bcrypt.compare(userpass, correctpass)
      if(match){
          response.json({"success":true})
      } else {
          response.json({"success":false})
      }
    }
  })
})
//Used to create an account if need be 
/*router.post('/register', 
  async function(request,response) {
    const passHash = await bcrypt.hash(request.body.Password, 10)
    const body = {"Username":request.body.Username, "Password":passHash}
    console.log(body)
    TestFetch.CreateUser(body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  })
  }
)*/


module.exports= router;
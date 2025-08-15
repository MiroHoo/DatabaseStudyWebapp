const express = require('express');
const router = express.Router();
const TestFetch = require('../Models/TestManage_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

router.get('/delete/:id',
  function (request, response) {
    const jwttok = request.cookies.jwt
    jwt.verify(jwttok, process.env.Secret, (err) => {
      if (err) {
        response.json({ token: "Token Invalid" });
        return;
      }
    })
    TestFetch.deletequestionbyid(request.params.id,)
    TestFetch.deletestudentdatabyid(request.params.id)
    TestFetch.deletetestbyid(request.params.id, function (err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    })
  });

router.get('/fetchscores/:id', async function (req, res) {
     TestFetch.fetchscoresByid(req.params.id, function (err, reslt) {
    if (err) {
      res.json(err)
    } else {
      res.json(reslt)
    }
  })
})
router.post('/update/:id',
  async function (request, response) {
    const jwttok = request.cookies.jwt
    jwt.verify(jwttok, process.env.Secret, (err) => {
      if (err) {
        response.json({ token: "Token Invalid" });
        return;
      } else {
        TestFetch.updateNameByid({ name: request.body.name, id: request.params.id }, function (err, dbResult) {
          if (err) {
            response.json(err);
          } else {
            response.json(dbResult);
          }
        });
      }
    })
  });
router.get('/',
  function (request, response) {
    TestFetch.getAll(function (err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  });
router.post('/login', async function (request, response) {
  TestFetch.Login(async function (err, dbResult) {
    if (err) {
      response.json(err)
    } else {
      const userpass = request.body.Password
      const correctpass = dbResult[0].Password
      const match = await bcrypt.compare(userpass, correctpass)
      if (match) {
        const token = jwt.sign({
          username: 'Admin'
        }, process.env.Secret)
        response.cookie("jwt", token, {
          sameSite: "none",
          secure: true,
        })
        response.send({ outcome: "success" })
      } else {
        response.json({ "success": false })
      }
    }
  })
})
//verifys token
router.get('/verify', async function (req, res) {
  const jwttok = req.cookies.jwt
  jwt.verify(jwttok, process.env.Secret, (err) => {
    if (err) {
      res.json({ token: 0 });
      return; 
    } else {
      res.json({ token: 1 })
    }
  })
})
router.post('/question/:id', function (req,res){
    const jwttok = req.cookies.jwt
    jwt.verify(jwttok, process.env.Secret, (err) => {
      if (err) {
        res.json({ token: "Token Invalid" });
        return;
      } else {
        TestFetch.updateQuestionByid({ name: req.body.name, id: req.params.id }, function (err, dbResult) {
          if (err) {
            res.json(err);
          } else {
            res.json(dbResult);
          }
        });
      }
    })
})
//Used to create an account if need be 
router.post('/register',
  async function (request, response) {
    const passHash = await bcrypt.hash(request.body.Password, 10)
    const body = { "Username": request.body.Username, "Password": passHash }
    TestFetch.CreateUser(body, function (err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    })
  }
)
router.post("/insert", function (req,res){
    
})


module.exports = router;
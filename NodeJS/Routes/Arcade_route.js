const express = require('express');
const router = express.Router();
const ArcadeModel = require('../Models/Arcade_model');
const TestTakingModel = require('../Models/TestTaking_model.js')

//gets and return smallest and largest id in the database for questions
router.get("/", function (req, res){
    ArcadeModel.GetMinMax(function (err, dbResults){
        if(err){
            res.json(err)
        } else {
            res.json(dbResults)
        }
    })

})
//gets question by id 
router.get("/:id", function (req, res){
    TestTakingModel.getById(req.params.id, function (err,dbResult){
        if(err){
            res.json(err)
        }else{
            res.json(dbResult)
        }
    })
})
//fetches question by id to verifies it exists
router.get("/verifyid/:id", function(req,res){
    ArcadeModel.VerifyId(req.params.id, function(err,dbResult){
        if(err){    
            res.json(err)
        }else{
            res.json(dbResult)
        }
    })
})
//Gets top 5 scores 
router.post("/scores", function (req,res){
    ArcadeModel.GetBestScores(function (err,dbResult){
        if(err){
            res.json(err)
        }  else {
            res.json(dbResult)
        }
    })
})
//saves a score
router.post("/insert", function (req,res){
    ArcadeModel.InsertScore(req.body, function (err,dbResult){
        if(err){
            res.json(err)
        }else {
            res.json(dbResult)
        }   
    })
})



module.exports= router;
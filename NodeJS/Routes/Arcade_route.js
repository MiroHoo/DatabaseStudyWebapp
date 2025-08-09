const express = require('express');
const router = express.Router();
const ArcadeModel = require('../Models/Arcade_model');
const TestTakingModel = require('../Models/TestTaking_model.js')
router.get("/", function (req, res)
{
    ArcadeModel.GetMinMax(function (err, dbResults){
        if(err){
            res.json(err)
        } else {
            res.json(dbResults)
        }
    })

})
router.get("/:id", function (req, res)
{
    TestTakingModel.getById(req.params.id, function (err,dbResults){
        if(err){
            res.json(err)
        }else{
            res.json(dbResults)
        }
    })
})



module.exports= router;
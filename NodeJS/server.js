require('dotenv').config();
const cors = require('cors');
const express = require('express');
const TestBuilde_router = require('./Routes/TestBuild_route.js');
const TestFetch_router = require('./Routes/TestFetch_route.js');

var app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use('/build',TestBuilde_router)
app.use('/test',TestFetch_router)

const PORT = process.env.PORT || 3002;

app.listen(PORT, function(){
    console.log("Server is running on port " + PORT)
});

module.exports = app;
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const TestBuild_router = require('./Routes/TestBuild_route.js');
const TestFetch_router = require('./Routes/TestFetch_route.js');
const TestTaking_router = require('./Routes/TestTaking_route.js');
const TestManaging_router = require('./Routes/TestManage_route.js');
const Arcade_router = require('./Routes/Arcade_route.js');
var app = express();
app.use(cookieParser())
app.use(cors({
  origin:process.env.origin,     
  credentials: true            
}));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/build',TestBuild_router)
app.use('/test',TestFetch_router)
app.use('/compare',TestTaking_router)
app.use('/manage',TestManaging_router)
app.use('/arcade',Arcade_router)

const PORT = process.env.PORT || 3002;

app.listen(PORT, function(){
    console.log("Server is running on port " + PORT)
});

module.exports = app;
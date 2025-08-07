
const jwt = require('jsonwebtoken');


function createToken(username){
    return jwt.sign({username: username}, "");
}

module.exports = {createToken};
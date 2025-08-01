const db = require('../Test_database');

 const testtaking = {
    getById: function(id,callback) {
        return db.query('select * from question where QuestionId=?', [id], callback)
    },
    getAll: function(callback) {
       return db.query('select * from question where TestId=?', callback)
    },
  }  
  
  module.exports = testtaking;
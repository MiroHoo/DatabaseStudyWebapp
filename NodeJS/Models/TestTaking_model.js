const db = require('../Test_database');

 const testtaking = {
    getById: function(id,callback) {
        return db.query('select * from question where QuestionId=?', [id], callback)
    },
    getAll: function(callback) {
       return db.query('select * from question where TestId=?', callback)
    },
    postAnswer: function(Score, callback){
      return db.query('insert into student_scores (Test_TestId,Score,Answer) values ?',[Score], callback)
    },
    getAnswersbyid: function(id, callback){
      return db.query('select * from Student_scores where Test_TestId = ?',[id], callback)
    },
    getAnswers: function(callback){
      return db.query('select * from Student_scores', callback)
    },
  }  
  
  module.exports = testtaking;
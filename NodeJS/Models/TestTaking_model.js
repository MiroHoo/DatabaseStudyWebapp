const db = require('../Test_database');

 const testtaking = {
    getById: function(id,callback) {
        return db.query('select * from question where QuestionId=?', [id], callback)
    },
    getAll: function(callback) {
       return db.query('select * from question where TestId=?', callback)
    },
    postAnswer: function(Score, callback){
      return db.query('insert into student_scores (Attempt_id,Test_TestId,Score,Answer) values ?',[Score], callback)
    },
    GetLargestid: function(callback){
      return db.query('SELECT Attempt_id from student_scores ORDER BY Attempt_id DESC LIMIT 1', callback)
    },
    getAnswersbyid: function(id, callback){
      return db.query('select * from Student_scores where Test_TestId = ?',[id], callback)
    },
    getAnswers: function(callback){
      return db.query('select * from Student_scores', callback)
    },
  }  
  
  module.exports = testtaking;
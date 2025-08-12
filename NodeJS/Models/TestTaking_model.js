const db = require('../Test_database');

 const testtaking = {
    getTestAttempts: function(id,callback){
      return db.query('select * from Student_Scores where Test_TestId=?', [id], callback)
    },
    saveAverage: function(id,callback){
      return db.query('update Test set Average_score=? where TestId=?', [id.avg, id.id], callback)
    },
    getById: function(id,callback) {
        return db.query('select * from Question where QuestionId=?', [id], callback)
    },
    getAll: function(callback) {
       return db.query('select * from Question where TestId=?', callback)
    },
    postAnswer: function(Score, callback){
      return db.query('insert into Student_Scores (Attempt_id,Test_TestId,Score,Answer) values ?',[Score], callback)
    },
    GetLargestid: function(callback){
      return db.query('SELECT Attempt_id from Student_Scores ORDER BY Attempt_id DESC LIMIT 1', callback)
    },
    getAnswersbyid: function(id, callback){
      return db.query('select * from Student_Scores where Test_TestId = ?',[id], callback)
    },
    getAnswers: function(callback){
      return db.query('select * from Student_Scores', callback)
    },
  }  
  
  module.exports = testtaking;
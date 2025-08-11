  const db = require('../Test_database');
  
  const Arcade = {
    GetMinMax: function(callback) {
    db.query(
      'select MAX(QuestionId) AS MaxId, MIN(QuestionId) AS MinId from question;', callback
    );
    },
    GetBestScores: function(callback){
        db.query(
        'select * from arcade_scores ORDER BY Score DESC LIMIT 5;', callback)
    },
    InsertScore: function(score, callback){
        db.query("insert into arcade_scores (Score, Name) values (?,?);", [score.Score, score.Name], callback)
    },
    VerifyId: function(id, callback){
      db.query("select * from question WHERE QuestionId=?;",[id], callback)
    },
  }
  module.exports = Arcade;
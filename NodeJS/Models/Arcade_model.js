  const db = require('../Test_database');
  
  const Arcade = {
    GetMinMax: function(callback) {
    db.query(
      'select MAX(QuestionId) AS MaxId, MIN(QuestionId) AS MinId from question;', callback
    );
    },
    GetBestScores: function(callback){
        db.query(
        'select * from arcade_scores ORDER BY Score'
        ,callback)
    },
    InsertScore: function(score, callback){
        db.query("insert into arcade_scores (Score, Name) values (?,?)", [score], callback)
    }
  }
  module.exports = Arcade;
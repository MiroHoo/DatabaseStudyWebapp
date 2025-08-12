  const db = require('../Test_database');
  
  const testbuild = {
    addTest: function(Test, callback) {
    db.query(
      'insert into Test (Name) values(?)',
      [Test.body.Name], callback
    );
    },
    insertQuestions:function(Test, callback){
    const questions = Test.Questions.map((values) => [
      values.Q, 
      values.A,
      Test.TestId
    ])
    db.query(
      'insert into Question (Question, Answer, Test_TestId) values ?',
      [questions],callback
    )
    },
    getId:function(callback) {
      return db.query(
      'select TestId from Test ORDER BY TestId DESC LIMIT 1;'
      ,callback
    );
    },
    verifyQuestion:function(string, callback) {
      return db.query(string, callback) 
    },
    verifyBulk:function(string, callback) {
      return db.query([string], callback)
      }
  }
  module.exports = testbuild;
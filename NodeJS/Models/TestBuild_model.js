  const db = require('../Test_database');
  
  const testbuild = {
    addTest: function(Test, callback) {
      console.log(Test.body.Name)
    db.query(
      'insert into test (Name) values(?)',
      [Test.body.Name], callback
    );
    },
    insertQuestions:function(Test, callback){
      console.log(Test)
    const questions = Test.Questions.map((values) => [
      values.Q, 
      values.A,
      Test.TestId
    ])
    console.log(questions)
    db.query(
      'insert into question (Question, Answer, Test_TestId) values ?',
      [questions],callback
    )
    },
    getId:function(callback) {
      console.log("grift3")
      return db.query(
      'select TestId from test ORDER BY TestId DESC LIMIT 1;'
      ,callback
    );
    },
    verifyQuestion:function(string, callback) {
      return db.query(string, callback) 
    },
    verifyBulk:function(strings, callback) {
      var arrayofanswer = [];
      if(strings[0].query !== undefined){
      strings.forEach(element => {
        arrayofanswer.push(db.query(element))
      });
    } else {
      return ("false", callback)
    }
      return arrayofanswer
    }
  }
  module.exports = testbuild;
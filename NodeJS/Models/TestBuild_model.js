  const db = require('../Test_database');
  
  const testbuild = {
    addTest: function(Test, callback) {
    console.log("add")
    console.log(Test.body.TestId)
    const id = Test.body.TestId +1;
    const questions = Test.body.Questions.map((values) => [
      values.Q, 
      values.A,
      id
    ])
    db.query(
      'insert into test (Name) values(?)',
      [Test.body.Name, Test.body]
    );
    db.query(
      'insert into question (Question, Answer, Test_TestId) values ?',
      [questions]
    )
    },
    getId:function(callback) {
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
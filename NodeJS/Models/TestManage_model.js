  const db = require('../Test_database');


  const testfetch = {
    deletetestbyid: function(id, callback) {
        return db.query('delete from test where TestId=?', [id], callback)
    },
    deletequestionbyid: function(id, callback) {
        return db.query('delete from question where Test_TestId=?', [id], callback)
    },
    deletestudentdatabyid: function(id, callback) {
        return db.query('delete from student_scores where Test_TestId=?', [id], callback)
    },
    updateNameByid: function(Test, callback) {
        return db.query('update test set name=? where TestId=?', [Test.name, Test.id], callback)
    },
    fetchscoresByid:function(Test, callback) {
        return db.query('select * from Student_Scores where TestId=?',[Test.id], callback)
    },
    Login:function(callback){  
        return db.query('select * from Login',callback)
    },
    CreateUser:function(Login, callback){  
        return db.query('insert into login (Username,Password) values (?,?)',[Login.Username, Login.Password],callback)
    },      

  }
  module.exports = testfetch;
  const db = require('../Test_database');


  const testfetch = {
    deletetestbyid: function(id, callback) {
        return db.query('delete from Test where TestId=?', [id], callback)
    },
    deletequestionbyid: function(id, callback) {
        return db.query('delete from Question where Test_TestId=?', [id], callback)
    },
    deletestudentdatabyid: function(id, callback) {
        return db.query('delete from Student_Scores where Test_TestId=?', [id], callback)
    },
    updateNameByid: function(Test, callback) {
        return db.query('update Test set name=? where TestId=?', [Test.name, Test.id], callback)
    },
    updateAvgByid: function(Test, callback) {
        return db.query('update Test set Average_score=? where TestId=?', [Test.score, Test.id], callback)
    },
    fetchscoresByid:function(id, callback) {
        return db.query('select * from Student_Scores where Test_TestId=? ORDER BY Attempt_id DESC LIMIT 200;',id, callback)
    },
    Login:function(callback){  
        return db.query('select * from Login',callback)
    },
    CreateUser:function(Login, callback){  
        return db.query('insert into Login (Username,Password) values (?,?)',[Login.Username, Login.Password],callback)
    },      

  }
  module.exports = testfetch;
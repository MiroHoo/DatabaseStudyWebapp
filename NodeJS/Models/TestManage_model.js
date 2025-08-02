  const db = require('../Test_database');
  
  const testfetch = {
    deletebyid: function(Test, callback) {
        return db.query('delete from test where TestId=?', [Test.id])
    },
    updateNameByid: function(Test, callback) {
        return db.query('update test set name=? where TestId=?', [Test.name, Test.id])
    },
    fetchscoresByid:function(Test, callback) {
        return db.query('select * from Student_Scores where TestId=?' [Test.id])
    },
    Login:function(Details, callback){  
        return db.query('select * from Student_Scores where TestId=?' [Test.id])
    }   

  }
  module.exports = testfetch;
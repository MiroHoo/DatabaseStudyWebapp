  const db = require('../Test_database');
  
  const testfetch = {
    getById: function(id,callback) {
        return db.query('select * from Question where Test_Testid=?', [id], callback)
    },
    getAll: function(callback) {
       return db.query('select * from Test', callback)
    },
  }
  module.exports = testfetch;
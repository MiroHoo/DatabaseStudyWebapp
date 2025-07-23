  const db = require('../Test_database');
  
  const testfetch = {
    getById: function(id,callback) {
        return db.query('select * from question where Testid=?', [id], callback)
    },
    getAll: function(callback) {
       return db.query('select * from test', callback)
    },
  }
  module.exports = testfetch;
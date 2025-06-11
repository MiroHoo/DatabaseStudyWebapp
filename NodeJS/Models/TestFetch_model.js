  const db = require('../Test_database');
  
  const testfetch = {
    getById: function(id,callback) {
        db.query('select * from questions where Testid(?)'),[id], callback
    },
  }
  module.exports = testfetch;
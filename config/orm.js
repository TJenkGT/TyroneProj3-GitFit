const connection = require('../config/connection.js');

const orm = {
    //This will be posting the new user data to the database
    createUser: function(table, vals, cb){
        connection.query('INSERT INTO ?? (email,password) VALUES (?)',[table,vals], function(err,result){
            if (err) throw err
            cb(result)
        });
    },
    //This will be used for cross checking with the DB to confirm if the active status is true or false
    // eVerVal: function (table, id, cb) {
    //     connection.query('SELECT * FROM ?? WHERE id = ?', [table, id], function (err, result) {
    //         if (err) throw err
    //         cb(result)
    //     });
    // },
    //Updates the active status in the DB to true
    eVerUpdate: function(table, id, cb){
        connection.query('UPDATE ?? SET active = 1 WHERE id = ?;',[table,id], function(err,result){
            if (err) throw err
            cb(result)
        })
    },
    // SLC for query matching
    match: function (tableInput, cb) {
        connection.query('SELECT * FROM ?? limit 3', tableInput, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    findzip: function (tableInput, id, cb) {
        connection.query('SELECT * FROM ?? where id = ?', [tableInput, id], function (err, result) {
            if (err) {
                throw err;
            }
              cb(result);
        });
    },


    zipmatch: function (tableInput, id, origin, cb) {
        connection.query('SELECT * FROM ?? where home_zip = ? and id <> ?', [tableInput, id, origin], function (err, result) {
            if (err) {
                throw err;
            }

              cb(result);
        });
    },
    createMatch: function (tableInput, value, cb) {
        connection.query('INSERT INTO ?? (user_id, match_id, approved, type, block) VALUES (?)', [tableInput, value], function (err, result) {
            if (err) {
                throw err;
            }

              cb(result);
        });
    },
    existMatch: function (tableInput, userid, matchid, type, cb) {
        console.log(tableInput, userid, matchid, type)
        connection.query('SELECT * FROM ?? where user_id = ? and match_id = ? and type = ?', [tableInput, userid, matchid, type], function (err, result) {
            if (err) {
                throw err;
            }
              cb(result);
        });
    },
    //Updates the active status in the DB to true
    updateMatch: function (table, approved, userid, matchid, cb){
        connection.query('UPDATE ?? SET approved = ? WHERE user_id = ? and match_id = ?',[table, approved, userid, matchid], function(err,result){
            if (err) throw err
            cb(result)
        });
    }
    ,
    //Updates the active status in the DB to true
    updateBlock: function (table, block, userid, matchid, cb){
        connection.query('UPDATE ?? SET block = ? WHERE user_id = ? and match_id = ?',[table, block, userid, matchid], function(err,result){
            if (err) throw err
            cb(result)
        });
    },
    showOnlineUsers: function(table, JoinTable, vals, cb){
      connection.query('SELECT usercreds.email, profile.first_name, usercreds.logged FROM ?? LEFT JOIN ?? on profile.cred_id = usercreds.id WHERE usercreds.logged = ?', [table, JoinTable, vals], function (err, result) {
        if (err){
          throw err;
        }
          cb(result);
      });
    },
    pullLogin: function(table,val1, cb){
        connection.query('SELECT * FROM ?? WHERE email = ?',[table,val1], function(err, result){
            if (err) throw err
            cb(result)
        })
    },
    activeLoginSession: function(table, id,cb){
        connection.query('UPDATE ?? SET logged = 1 WHERE id = ?',[table,id],function(err,result){
            if (err) throw err
            cb(result)
        })
    },
    createProfile: function(table,cols,vals,cb){
        connection.query('INSERT INTO ?? (??) VALUES (?)',[table,cols,vals,function(err,result){
            if (err) throw err
            cb(result)
        }])
    },
    createsurvey: function (table,cols,vals, cb) {
        connection.query('INSERT INTO ?? (??) VALUES (?)', [table,cols,vals],function(err,result){
            if (err) throw err
            cb(result)
        })
    },
    getsurvey: function (table, cb){
        connection.query('SELECT * FROM ??', [table], function(err, result){
            if (err) throw err
            cb(result)

        })
    },
}

module.exports = orm;

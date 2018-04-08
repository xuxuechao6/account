var mysql = require('mysql');
var db = require('../config/db').sql1;
var pool = mysql.createPool(db);
var sql = require('../lib/sql');

 function clientSchema(name,callback){
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("数据库连接错误")
        } else {
            connection.query(sql.getClientInfo, [name], function (err, result) {
                if (err) {
                    console.log("错误：" + err.message);
                    return callback(err);
                }else {
                     callback(result[0]);
                }
            })

        }
    });
}

exports.getClientInfo = function(name){
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql.getClientInfo,[name], ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        console.log("getUserInfo:",rows)
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
};


var ClientInfo = function(name) {
    var that =this;
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("数据库连接错误")
        } else {
            connection.query(sql.getClientInfo, [name], function (err, result) {
                if (err) {
                    console.log("错误：" + err.message);
                    return false
                    //退出query方法，后面的代码不执行了；
                }else {
                    that.client_id = result[0].client_id;
                    that.client_secret = result[0].client_secret;
                    that.redirect_uri = result[0].redirect_uri;
                    that.grant_types = result[0].grant_types;
                    that.scope = result[0].scope;
                }
            })

        }
    });
}

exports.ClientInfo = ClientInfo;
exports.clientSchema = clientSchema;
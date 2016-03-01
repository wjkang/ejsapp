/**
 * Created by Administrator on 2016/3/1.
 */
var mysql=require("mysql");
var mysqlPool=null;
var config=require("../config").initConfig();

function initMysqlPool()
{
    mysqlPool=mysql.createPool(config.mysqlConfig);
}

exports.query=function(sqlReq,callback){
      if(!mysqlPool)
      {
          initMysqlPool();
      }
      if(!sqlReq)
      {
          throw new Error("the sqlReq is null");
      }
      var sql_pattern=sqlReq.sql||'';
      if(sql_pattern.length===0)
      {
          throw new Error("sql is empty");
      }
      mysqlPool.getConnection(function(err,connection){
         if(err){
             throw err;
         }
          connection.config.queryFormat = function (query, values) {
              if (!values) return query;
              return query.replace(/\:(\w+)/g, function (txt, key) {
                  if (values.hasOwnProperty(key)) {//key来自匹配(\w+)
                      return this.escape(values[key]);
                  }
                  return txt;
              }.bind(this));
          };

          connection.query(sql_pattern, sqlReq.params, function (err, rows) {
              connection.release();
              return callback(err, rows);
          });
      });
};
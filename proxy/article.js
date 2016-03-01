/**
 * Created by Administrator on 2016/3/1.
 */
var mysqlClient=require("../libs/mysqlUtil");

exports.GetArticleById=function(id,callback){

};

exports.GetArticles=function(callback){
    mysqlClient.query({
        sql:"select * from article",
        params:{}
    },function(err,rows){
        if(err)
        {
            callback(err,null);
        }
        if (rows && rows.length > 0) {
            callback(null, rows);
        } else {
            callback("no data", null);
        }
    });
};
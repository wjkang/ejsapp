/**
 * Created by Administrator on 2016/3/1.
 */
var Article=require("../proxy/article");

exports.GetArticles=function(req,res){
    Article.GetArticles(function(err,rows){
        if(err){
            res.send(err);
        }
        res.render("index",{rows:rows});
    });
};
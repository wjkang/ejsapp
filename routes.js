/**
 * Created by Administrator on 2016/3/1.
 */

var article=require("./controllers/article");

module.exports = function (app) {
    app.get("/", article.GetArticles);
}

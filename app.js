const Koa = require("koa");
const Router = require("koa-router");
config = require("./config");
var md5 = require("md5");
var randomHour = new Date().getTime();
var app = new Koa();
var router = new Router();
var mysql = require("mysql");
// 中间件
app.use(async (ctx, next) => {
    ctx.body = "这是中间件";
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
    ctx.set('Access-Control-Allow-Credentials', true);
    ctx.set('Access-Control-Max-Age', 3600 * 24);
    await next();
})

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
})

router.get("/api/v1", async (ctx, next) => {

    // 数据库池

    const sql = "select*from users";
    await pool.query(sql, (err, res, fields) => {
        if (err) {
            console.log(err);
            return;
        } else {
          ctx.body=res;
         
        }
    })


})




app.listen(3000);
console.log("start runing ..... http://localhost:3000")
app.use(router.routes()).use(router.allowedMethods())
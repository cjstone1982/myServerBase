var compression  = require('compression'); //gzip静态页面压缩
var express      = require('express')
var path         = require('path')
var favicon      = require('serve-favicon')
var logger       = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser   = require('body-parser')
var session      = require('express-session')
var multer       = require('multer')
var fs           = require('fs')
var routes       = require('./server/router')
var http         = require('http');
var settings     = require('./settings')
// var mongoose  = require('mongoose')
// mongoose.connect("mongodb://localhost:27017/myTestDB")
//连接数据库
db = require('./server/db')
db.connect()

var app = express()


app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(compression()) 
var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm','html','css','png','gif','jpg','js','tpl'],
    index: false,
    maxAge: '604801000', //24小时*7
    redirect: true,
    expires:'604801000',
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
}
app.use(express.static(path.join(__dirname, 'app'),options))
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(session({
    secret: 'stone-secret',
    // key: 'stone-dogs', //cookie的名称 不设置就是id随机
    cookie: {
        path: '/', 
        httpOnly: true, 
        secure: false, //https-enabled   必须要启用https
        maxAge: 2*604800000, //14天
        expires:new Date(Date.now() + 2*604800000)
    },
    // store: new MongoStore({ //把session保存到数据库里 db:数据库名称
    //     host:settings.host, 
    //     port:settings.dbport, 
    //     db:settings.db
    // }),
    resave: false, //使每次请求都重写cookie
    saveUninitialized: false, //必须关闭才能使用缓存
}))
app.use('/', routes)

http.createServer(app).listen(settings.serverPort,function(){
	console.log('server start at '+settings.serverPort+'')
})












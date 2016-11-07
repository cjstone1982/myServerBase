var express = require('express')
var crypto  = require('crypto')
var http    = require('http')
var qs      = require('querystring')
var fs      = require('fs')
var multer  = require('multer')
var upload  = multer({dest: './app/uploads/',})
// var needle  = require('needle')
// var storage  = multer.memoryStorage()
// var upload   = multer({ storage: storage })
var app = express.Router()

var db      = require("./db")
var Concern = db.model("Concern")
var Remind  = db.model("Remind")
var Post    = db.model("Post")
var User    = db.model("User")

//开启跨域
// app.all('*', function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     next()
// })

app.get('/api/article',function(req,res){
	console.log('获取文章');
	Post.find({}).skip(20).limit(10).exec(function(err, result){
		console.log(result);
		res.json(result)
	})
	// res.json({
	// 	'title':'新闻标题',
	// 	'date':'2016-10-10',
	// 	'content':'获取GET新闻内容',
	// })
})

app.post('/api/article',function(req,res){
	console.log(req.body);
	console.log('接受客户端请求2');
	var post=new Post({
		title:'标题',
        content:'正文',
        stats:{
            votes:0,
            favs:0,
        },
        createAt:new Date(),
	})
	post.save(function(err,result){
		console.log(result);
		if(err){
			res.json({
				'code':2001,
				'state':'error',
				'message':'添加新闻失败',
				'data':{},
			})
			return false
		}
		res.json({
			'code':0,
			'state':'success',
			'message':'添加新闻成功',
			'data':{},
		})
	})
})

app.put('/api/article',function(req,res){
	res.json({
		'title':'新闻标题',
		'date':'2016-10-10',
		'content':'修改PUT新闻',
	})
})

app.delete('/api/article',function(req,res){
	res.json({
		'title':'新闻标题',
		'date':'2016-10-10',
		'content':'删除DELETE新闻',
	})
})

module.exports = app
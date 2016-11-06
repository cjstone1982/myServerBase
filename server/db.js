var mongoose=require('mongoose')
var models=require('./schema')
var settings=require('../settings')
var Schema=mongoose.Schema

for( var name in models ){
	mongoose.model( name , new Schema( models[ name ] ))
}

exports.model = function(name) {
    return mongoose.model( name )
}

exports.connect = function() {
    // return mongoose.connect("mongodb://localhost:27017/myBase")
    return mongoose.connect('mongodb://'+settings.dbhost+':'+settings.dbport+'/'+settings.dbname+'')
}
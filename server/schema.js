var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId=Schema.Types.ObjectId

module.exports = {
    User: {
        email:        { type: String, unique: true, required: true },
        password:     { type: String },
        nickname:     { type: String },
        createAt:     { type: Date, default: Date.now },
        profile:{
            name:     { type: String },
            nickname: { type: String },  
            age:      { type: String },  
            sex:      { type: String },
            face:     { type: String },
            city:     { type: String },
            intro:    { type: String },
        },
        stats:{
            votes:    { type: Number },
            favs:     { type: Number },
        }
    },
    Post2: {
        title:        { type: String },
        content:      { type: String },
        stats:{
            votes:    { type: Number },
            favs:     { type: Number },
        },
        createAt:     { type: Date, default: Date.now },
        author:       { type: ObjectId , ref: 'user'},
    },
    Post: {
        title:        { type: String },
        content:      { type: String },
        stats:{
            votes:    { type: Number },
            favs:     { type: Number },
        },
        createAt:     { type: Date, default: Date.now },
        author:       { type: ObjectId , ref: 'user'},
    },
    Collection:{ 
        title:        { type: String },
        intro:        { type: String },
        face:         { type: String },
        createAt:     { type: Date, default: Date.now },
        tags:         { type: Array },
        adminer:      { type: Array },
        stats:{
            up:       { type: Number },
            follow:   { type: Number },
            articles: { type: Number },
        },
        followed:     { type: Boolean },
        iscontribute: { type: Boolean },         
        ischeck:      { type: Boolean },
        author:       { type:ObjectId, ref: 'User'},
        contain:     [{ type:ObjectId, ref: 'Post'}],
    },
    Relation:{
        _id:          { type: ObjectId, ref: 'User'},
        followUser:  [{ type: ObjectId, ref: 'User'}],
        followZT:    [{ type: ObjectId, ref: 'Collection'}],
        followBM:    [{ type: ObjectId, ref: 'Post'}],
        followUP:    [{ type: ObjectId, ref: 'Post'}],
        followWD:    [{ type: ObjectId, ref: 'Question'}],
        followCM:    [{ type: ObjectId, ref: 'Comment'}],
        followAN:    [{ type: ObjectId, ref: 'Answer'}],
    },
    Concern:{ //关系
               _id:  {type: ObjectId, ref: 'User'},
        followUser: [{type: ObjectId, ref: 'User'}],
        followZT  : [{type: ObjectId, ref: 'Collection'}],
        followBM  : [{type: ObjectId, ref: 'Post'}],
        followUP  : [{type: ObjectId, ref: 'Post'}],
        followCM  : [{type: ObjectId, ref: 'Comment'}],
    },
    Remind:{ //关系
        _id           : {type:ObjectId, ref: 'User'},
        list          : Array,
        listall       : Array,
        isRead        : Boolean,
        createAt      : String,
        remindID      : {type:ObjectId, ref: 'User'},
        userID        : {type:ObjectId, ref: 'User'},
        collectionID  : {type:ObjectId, ref: 'Collection'},
        postID        : {type:ObjectId, ref: 'Post'},
    }
}
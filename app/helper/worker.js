/*
users newsifys better delivery api to grab lots of news hourly here
*/
var NETWORKs= require("../helper/network");
var articleRelatedNet= new NETWORKs.ArticlesRelated()
//needed to request data from the api
onmessage=function(msg){
    switch(msg.data){
        case "recent":
        postMessage("grabbing recent news");
        articleRelatedNet.grabRecentArticles().then(d=>{
            postMessage(d);
        })
        break;
        default:
        postMessage("hi whats up")
        break;
    }
}
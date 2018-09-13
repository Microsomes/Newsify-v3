/*
Helper module to help with database related activities
*/
var Sqlite = require("nativescript-sqlite");



//opens the database connection within the constructor
var db_promise = new Sqlite("mainDBmV", function(err, db) {
    if (err) {
        console.error("We failed to open database", err);
    } else {
        // This should ALWAYS be true, db object is open in the "Callback" if no errors occurred
        console.log("Are we open yet (Inside Callback)? ", db.isOpen() ? "Yes" : "No"); // Yes
    }
});

//TODO FIX THE articles table integrity


//create the savedSearches table
db_promise.then(function(db) {

    //creates all the tables needed

    db.execSQL("CREATE TABLE IF NOT EXISTS savedSearches (id INTEGER PRIMARY KEY AUTOINCREMENT, search TEXT)").then(id=>{
        console.log(id);
    },error=>{
        console.log(error);
    })

    
    db.execSQL("CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT, Description TEXT, CrawlDate TEXT, Source TEXT, Author TEXT, Url TEXT, UrlToImage TEXT, tag TEXT, souceImageUrl TEXT, postType TEXT, newsType TEXT, latLng TEXT )").then(id=>{
        console.log(id);
    },error=>{
        console.log(error);
    })

});



//this class is all search related
class SearchRelated {



    constructor() {

    }


    addSearchHistory(query) {
        //add to search history

        db_promise.then(function(db) {

            //adds saved search to the database
            db.execSQL("INSERT INTO savedSearches (search) VALUES (?)", [
                query
            ]).then(id => {
                console.log(id)
            }, error => {
                console.log("insert error", error);
            })

        })
    }

    getSearchHistory() {
        //returns the whole recent search history
        return new Promise((resolve, reject) => {
            db_promise.then(function(db) {
                db.all("SELECT DISTINCT(search)  FROM savedSearches ORDER BY id DESC").then(rows => {
                    resolve(rows);
                })
            })
        })
    }


    addSavedSearch() {
        //inserts a saved search
    }

    getSavedSearches() {
        //returns the whole saved searches
    }

}


//handles saving getting and deleting articles
class ArticlesRelated{
    
    saveArticle(articleData){
        //saves an article to the articles table

 
        db_promise.then(function(db) {

            //adds saved search to the database
            db.execSQL("INSERT INTO articles (Title,Description,CrawlDate,Source, Author, Url ,UrlToImage, tag, souceImageUrl, postType, newsType, latLng  ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [
                articleData.Title,
                articleData.Description,
                articleData.CrawlDate,
                articleData.Source,
                articleData.Author,
                articleData.Url,
                articleData.UrlToImage,
                articleData.tag,
                articleData.souceImageUrl,
                articleData.postType,
                articleData.newsType,
                articleData.latLng
            ]).then(id => {
                console.log("index:",id)
            }, error => {
                console.log("insert error", error);
            })

        })
    }

    getRecentArticles(){
        return new Promise((resolve,reject)=>{
            //grabs all recent article 
            db_promise.then(function(db) {
                db.all("SELECT  DISTINCT(title) id, Title,Description,CrawlDate,Source, Author,Url,UrlToImage, tag, souceImageUrl, postType, newsType, latLng  FROM articles").then(rows=>{
 
                     resolve(rows);
                },error=>{
                    console.log(error);
                })
            })
        })
         
    }

    getArticlesBySource(source){
        //filter articles by source
        db_promise.then(function(db) {
        //     db.all("SELECT  DISTINCT(title) id, Title,Description,CrawlDate,Source, Author,Url,UrlToImage, tag, souceImageUrl, postType, newsType, latLng  FROM articles WHERE").then(rows=>{
 
        //         resolve(rows);
        //    },error=>{
        //        console.log(error);
        //    })
        })
    }

    searchArticle(query){
        //search articles from all sources
    }

    searchArticlesBySource(query,source){
        //grab articles by source
    }

    getAllSources(){
        return new Promise((resolve,reject)=>{
                //grabs all sources
                db_promise.then(function(db) {
                     db.all("SELECT DISTINCT(Source) , souceImageUrl FROM articles  ").then(rows=>{
                         resolve(rows);
                    })
                })
        })
    
    }    
}

//handles saving favourite articles
class Fav{

    saveFav(articleData){
        //saves an article to the favourite section
    }
    getFav(article_id){
        //grab favourite 
    }
    getRecentFav(){
        //grabs all recent favourited articles
    }
}




module.exports = {
    SearchRelated,
    ArticlesRelated
}
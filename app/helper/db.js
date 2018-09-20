/*
Helper module to help with database related activities
*/
var Sqlite = require("nativescript-sqlite");



//opens the database connection within the constructor
var db_promise = new Sqlite("mainDBmVAa", function(err, db) {
    if (err) {
        console.error("We failed to open database", err);
    } else {
        // This should ALWAYS be true, db object is open in the "Callback" if no errors occurred
     }
});

//TODO FIX THE articles table integrity


//create the savedSearches table
db_promise.then(function(db) {

    //creates all the tables needed

    db.execSQL("CREATE TABLE IF NOT EXISTS savedSearches (id INTEGER PRIMARY KEY AUTOINCREMENT, search TEXT)").then(id=>{
     },error=>{
     })

    
    db.execSQL("CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT, Description TEXT, CrawlDate TEXT, Source TEXT, Author TEXT, Url TEXT, UrlToImage TEXT, tag TEXT, souceImageUrl TEXT, postType TEXT, newsType TEXT, latLng TEXT, originalID TEXT )").then(id=>{
     },error=>{
     })
     db.execSQL("CREATE TABLE IF NOT EXISTS articles_fav (id INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT, Description TEXT, CrawlDate TEXT, Source TEXT, Author TEXT, Url TEXT, UrlToImage TEXT, tag TEXT, souceImageUrl TEXT, postType TEXT, newsType TEXT, latLng TEXT, originalID TEXT)").then(id=>{
    },error=>{
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
             }, error => {
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
            db.execSQL("INSERT INTO articles (Title,Description,CrawlDate,Source, Author, Url ,UrlToImage, tag, souceImageUrl, postType, newsType, latLng,originalID  ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", [
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
                articleData.latLng,
                articleData.originalID
            ]).then(id => {
             }, error => {
             })

        })
    }

    getRecentArticles(){
        return new Promise((resolve,reject)=>{
            //grabs all recent article 
            db_promise.then(function(db) {
                db.all("SELECT DISTINCT(Title) id, Title,Description,CrawlDate,Source, Author,Url,UrlToImage, tag, souceImageUrl, postType, newsType, latLng, originalID FROM articles ORDER BY CrawlDate DESC").then(rows=>{
                    
                     resolve(rows);
                },error=>{
                 })
            })
        })
         
    }

    getArticlesBySource(source){
         return new Promise((resolve,reject)=>{
            //filter articles by source
            db_promise.then(function(db) {
                db.all("SELECT  DISTINCT(Title) id, Title,Description,CrawlDate,Source, Author,Url,UrlToImage, tag, souceImageUrl, postType, newsType, latLng  FROM articles  WHERE  Source=? ORDER BY CrawlDate DESC",[source]).then(rows=>{
                    resolve(rows);
            },error=>{
             })
            })
        })
       
    }

    searchArticle(query){
        //search articles from all sources
        return new Promise((resolve,reject)=>{
            //filter articles by source
            db_promise.then(function(db) {
                db.all("SELECT  DISTINCT(Title) id, Title,Description,CrawlDate,Source, Author,Url,UrlToImage, tag, souceImageUrl, postType, newsType, latLng  FROM articles  WHERE  Title LIKE ? ORDER BY CrawlDate DESC",["%"+query+"%"]).then(rows=>{
                    resolve(rows);
            },error=>{
             })
            })
        })

    }

    searchArticlesBySource(query,source){
        //grab articles by source
    }

    getAllSources(){
        return new Promise((resolve,reject)=>{
                //grabs all sources
                db_promise.then(function(db) {
                     db.all("SELECT DISTINCT(Source), souceImageUrl FROM articles ").then(rows=>{
                         resolve(rows);
                    })
                })
        })
    
    } 
    
    getTotalLocal(){
        return new Promise((resolve,reject)=>{
            //grabs all sources
            db_promise.then(function(db) {
                 db.all("SELECT COUNT(id) FROM articles ").then(rows=>{
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
        console.log("saving favourite articles");

        db_promise.then(function(db) {

            //adds saved search to the database
            db.execSQL("INSERT INTO articles_fav (Title,Description,CrawlDate,Source, Author, Url ,UrlToImage, tag, souceImageUrl, postType, newsType, latLng,originalID  ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", [
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
                articleData.latLng,
                articleData.originalID
            ]).then(id => {
                console.log("insert id",id);
             }, error => {
                 console.log(error);
             })

        })

    }
    getFav(article_id){
        //grab favourite 
        return new Promise((resolve,reject)=>{
            //filter articles by source
            db_promise.then(function(db) {
                db.all("SELECT  DISTINCT(Title) id, Title,Description,CrawlDate,Source, Author,Url,UrlToImage, tag, souceImageUrl, postType, newsType, latLng, originalID  FROM articles_fav  WHERE  id=? ORDER BY id DESC",[article_id]).then(rows=>{
                    resolve(rows);
            },error=>{
                console.log(error);
             })
            })
        })
    }
    getRecentFav(){
        console.log("recent fav..123");
        //grabs all recent favourited articles
        return new Promise((resolve,reject)=>{
            //grabs all recent article 
            db_promise.then(function(db) {
                db.all("SELECT DISTINCT(Title) id, Title,Description,CrawlDate,Source, Author,Url,UrlToImage, tag, souceImageUrl, postType, newsType, latLng, originalID FROM articles_fav ORDER BY id DESC").then(rows=>{
                    
                     resolve(rows);
                     console.log(rows);
                },error=>{
                    reject(error);
                    console.log(error);
                 })
            })
        })
    }
}




module.exports = {
    SearchRelated,
    ArticlesRelated,
    Fav
}
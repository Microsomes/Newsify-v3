/*
Module is responsible for all network activities within this app
*/

const httpModule = require("http");
var DEFINITIONS= require("./../definitions/definitions")

require( "nativescript-localstorage" );

const connectivityModule = require("tns-core-modules/connectivity");


function checkConnection(){
    // result is ConnectionType enumeration (none, wifi or mobile)
const connectionType = connectivityModule.getConnectionType();

switch (connectionType) {
    case connectivityModule.connectionType.none:
        // Denotes no Internet connection.
         return("no connection");
        break;
    case connectivityModule.connectionType.wifi:
        // Denotes a WiFi connection.
         return("connection");
        break;
    case connectivityModule.connectionType.mobile:
        // Denotes a mobile connection, i.e. cellular network or WAN.
         return("mobile connection");
        break;
    default:
    return("none");
        break;
}
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const moment= require("moment");


var MicrosomesDB= require("../helper/db");
//requires the MicrosomesDB local database to handle all
//offline database operations
var mb= new MicrosomesDB.ArticlesRelated();
//create an object instance out of ArticlesRelated class to handle
//saving grabbing articles


 
function helper_grab_recent_from_local_database(resolve){
    //param is a function
    //helper method for articles related

       //query the offline database instead
       mb.getRecentArticles().then(rows=>{

 
        var toResolve=[]

         rows.forEach(row=>{
             toResolve.push({
                id: row[0],
                Title: row[1],
                Description: row[2],
                CrawlDate: row[3],
                Source: row[4],
                Author: row[5],
                Url: row[6],
                UrlToImage:row[7],
                tag:row[8],
                souceImageUrl:row[9],
                postType:row[10],
                newsType:row[11],
                latLng:row[12],
                
            })
         })

        
         



         toResolve.forEach(e=>{
            var fromNow= moment(e.CrawlDate).fromNow()
            e.now=fromNow;

            e.sourceCap= capitalizeFirstLetter(e.Source)

        })
         resolve(toResolve);
    })
}

class ArticlesRelated{


    //grabs recent articles by source
    getRecentArticlesBySource(source){
        return new Promise((resolve,reject)=>{
            var isOnline= checkConnection()==="connection";
            //determines if the user is online
            isOnline=false;
            if(isOnline){
                //connect to the net to grab data
    
                httpModule.getJSON("https://socialstation.info/newsv2/source/"+source).then((r) => {
                    var d= r["data"];
    
                    d.forEach(e=>{
                        e.cap= e.Source.toUpperCase();
                        e.now= moment(e.CrawlDate).fromNow()
                        
                        e.sourceCap= capitalizeFirstLetter(e.Source)
                    })
                    console.log("accesssed from network.js");
                    resolve(d)
                }, (e) => {
                });
    
            }else{
                //connect to local database since the user is not connected
                console.log("connecting to localdatabase");
                //query the offline database instead
                    mb.getArticlesBySource(source).then(rows=>{
                        var toResolve=[]
                        rows.forEach(row=>{
                            toResolve.push({
                                id: row[0],
                                Title: row[1],
                                Description: row[2],
                                CrawlDate: row[3],
                                Source: row[4],
                                Author: row[5],
                                Url: row[6],
                                UrlToImage:row[7],
                                tag:row[8],
                                souceImageUrl:row[9],
                                postType:row[10],
                                newsType:row[11],
                                latLng:row[12],
                                
                            })
                        })
 
         toResolve.forEach(e=>{
            var fromNow= moment(e.CrawlDate).fromNow()
            e.now=fromNow;

            e.sourceCap= capitalizeFirstLetter(e.Source)

        })
        toResolve.unshift({
            id: 99999,
            Title: "Important: You are using the Offline Feature of this app, you may carry on using the App as normal however clicking on articles will not load an article. Enjoy reading highlights.",
            Description:"",
            CrawlDate: moment().format(),
            Source: "Newsify-Offline",
            Author: "Newsify Offline",
            Url: "",
            UrlToImage:"",
            tag:"",
            souceImageUrl:"",
            postType:"",
            newsType:"",
            latLng:"",
         })
          resolve(toResolve);

        })

    }
        })
        
    }//end of grabarticlesbysource method

    //grabs all recent articles
    grabRecentArticles(){
        return new Promise((resolve,reject)=>{
            //connect to the api or if offline query the local database and return the data
 
            

            
       


            //check connection 
 

            var isOnline= checkConnection()==="connection";
            //determines if the user is online
            
              
            if(isOnline){
                //the user is connected but we need to check when he last got an update from the server

                var lastGrabbed= localStorage.getItem("lastGrabbedRecent");

                if(lastGrabbed!=null){
                    var now= moment()
                    var exp= moment(lastGrabbed)
                    console.log("diff",now.diff(exp,'minutes'))
                     if(now.diff(exp,'minutes')>100){
                        //expired continue
                    }else{
                        //data was freshly recieved within 100 minutes must be still up to date use local database instead

                           //query the offline database instead
                        helper_grab_recent_from_local_database(resolve);
                        //passing the resolve function for the helper to
                        return;
                     }

  
                }

                   
                httpModule.getJSON(DEFINITIONS.GRAB_RECENT).then((r) => {
                         localStorage.setItem('lastGrabbedRecent', moment().format());
                        //store last  grabbed
                    var dataArr= r["data"];
            
                    dataArr.forEach(e=>{

                        console.log(e);
                        mb.saveArticle({
                            Title:e.Title,
                            Description:e.Description,
                            CrawlDate:e.CrawlDate,
                            Source:e.Source,
                            Author:e.Author,
                            Url:e.Url,
                            UrlToImage:e.UrlToImage,
                            tag:e.tag,
                            souceImageUrl:e.souceImageUrl,
                            postType: e.postType,
                            newsType: e.newsType,
                            latLng :e.latLng
                        })


                        var fromNow= moment(e.CrawlDate).fromNow()
                        e.now=fromNow;
            
                        e.sourceCap= capitalizeFirstLetter(e.Source)
            
                    })
 


                resolve(dataArr);

                }, (e) => {
                    reject(e);
                });
            }else{
                 //query the offline database instead
                mb.getRecentArticles().then(rows=>{

 
                    var toResolve=[]

                     rows.forEach(row=>{
                         toResolve.push({
                            id: row[0],
                            Title: row[1],
                            Description: row[2],
                            CrawlDate: row[3],
                            Source: row[4],
                            Author: row[5],
                            Url: row[6],
                            UrlToImage:row[7],
                            tag:row[8],
                            souceImageUrl:row[9],
                            postType:row[10],
                            newsType:row[11],
                            latLng:row[12],
                            
                        })
                     })

 
                     toResolve.unshift({
                        id: 99999,
                        Title: "Important: You are using the Offline Feature of this app, you may carry on using the App as normal however clicking on articles will not load an article. Enjoy reading highlights.",
                        Description:"",
                        CrawlDate: moment().format(),
                        Source: "Newsify-Offline",
                        Author: "Newsify Offline",
                        Url: "",
                        UrlToImage:"",
                        tag:"",
                        souceImageUrl:"",
                        postType:"",
                        newsType:"",
                        latLng:"",
                     })
            
                     toResolve.forEach(e=>{
                        var fromNow= moment(e.CrawlDate).fromNow()
                        e.now=fromNow;
            
                        e.sourceCap= capitalizeFirstLetter(e.Source)
            
                    })
                     resolve(toResolve);
                })
            }
        })
       

    }

    //grabs all sources
    grabAllSouces(){
        return new Promise((resolve,reject)=>{
            
            var isOnline= checkConnection()==="connection";
            //determines if the user is online          
             if(isOnline){
                //the user is online
                httpModule.getJSON(DEFINITIONS.GRAB_SOURCES).then((r) => {
                    var sources= r["sources"];
                    //extract source data

                    
                    //loops through all elements in the sources array and assigns a new object
                    sources.forEach(e=>{
                        e.cap= e.Source.toUpperCase();
                    })
                    resolve(sources);

                    console.log("network");
                 }, (e) => {
                    reject(e);
                });
            }else{
                //grab the data from the local database instead
                mb.getAllSources().then(rows=>{

                    console.log("grab offline sources")
 
                    var toResolve=[]

                     rows.forEach(row=>{
                         toResolve.push({
                            Source: row[0],
                            souceImageUrl: row[1],
                            cap:row[0].toUpperCase()
                        })
                     })

 
                     toResolve.unshift({
                        Source: "Some Sources may be missing in offline mode",
                        souceImageUrl: "",
                        cap: "Some Sources may be missing in offline mode",
                     })
            
                 
                     resolve(toResolve);
                })
                
            }
        })
         
    }

    //search article
    searchArticle(query){
        return new Promise((resolve,reject)=>{
             httpModule.getJSON(DEFINITIONS.GRAB_SEARCH+"/"+query).then((r) => {
                var d= r["data"];
    
                d.forEach(e=>{
                    var fromNow= moment(e.CrawlDate).fromNow()
                    e.now=fromNow;
        
                    e.sourceCap= capitalizeFirstLetter(e.Source)
        
                })
    
                resolve(r);
     
            }, (e) => {
               reject(e);
            });
        })
      
    }



}

module.exports={
    ArticlesRelated
}
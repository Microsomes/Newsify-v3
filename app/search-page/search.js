const app = require("application");



const searchBarModule = require("tns-core-modules/ui/search-bar");

var DEFINITIONS= require("./../definitions/definitions");

const httpModule = require("http");

var moment= require("moment");

const SearchViewModel = require("./searching-view-model");

var MicrosomesDB= require("../helper/db");

var SearchRelatedDB= new MicrosomesDB.SearchRelated();


 
var NETWORKs= require("../helper/network");
var articleRelatedNet= new NETWORKs.ArticlesRelated()
//needed to request data from the api
 

var svm=null;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new SearchViewModel();
    svm=page.bindingContext;
    console.log("page---");

    var nc= page.navigationContext;
    if(nc.status==="param"){
        //load the search query from param
        console.log("pre load search term")

        var searchTerm= nc["st"].searchTerm;

        onSubmitAlone(searchTerm);


    }
   
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

var onClear=function(){
    //when user clears the search bar
    console.log("cleared")
}

function onSubmitAlone(query){
    //stand alone version of onsubmit

    console.log("onsubmit alone")

    svm.set("searchResults",[]);
    

    //grab search results
    articleRelatedNet.searchArticle(query).then(d=>{
         svm.set("searchResults",d["data"]);
    })

     

    SearchRelatedDB.addSearchHistory(query);
    //add this search query to the history

    svm.set("searchQuery",query);
}

var onSubmit=function(args){
    //when user submits a query
    console.log("submit query");
    var SearchBar= args.object;

    svm.set("searchResults",[]);

    articleRelatedNet.searchArticle(SearchBar.text).then(d=>{
        svm.set("searchResults",d["data"]);
   })
   SearchRelatedDB.addSearchHistory(SearchBar.text);
}

exports.onClear=onClear;
exports.onSubmit=onSubmit;


exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;

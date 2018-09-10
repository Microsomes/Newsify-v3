const app = require("application");



const searchBarModule = require("tns-core-modules/ui/search-bar");

var DEFINITIONS= require("./../definitions/definitions");

const httpModule = require("http");


const SearchViewModel = require("./searching-view-model");

var svm=null;

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new SearchViewModel();
    svm=page.bindingContext;
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

var onClear=function(){
    //when user clears the search bar
    console.log("cleared")
}
var onSubmit=function(args){
    //when user submits a query
    console.log("submit query");
    var SearchBar= args.object;

    svm.set("searchResults",[]);
 
    httpModule.getJSON(DEFINITIONS.GRAB_SEARCH+"/"+SearchBar.text).then((r) => {
        var d= r["data"];
       svm.set("searchResults",d);


    }, (e) => {
        console.log(e);
    });
    
     
}

exports.onClear=onClear;
exports.onSubmit=onSubmit;


exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;

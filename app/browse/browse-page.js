const app = require("application");

const BrowseViewModel = require("./browse-view-model");


var NETWORKs= require("../helper/network");
var articleRelatedNet= new NETWORKs.ArticlesRelated()
//needed to request data from the api
 

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new BrowseViewModel();

    //load source data
    articleRelatedNet.grabAllSouces().then(d=>{
        page.bindingContext.set("sources",[])
        //empty current sources
        page.bindingContext.set("sources",d)
    })
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;

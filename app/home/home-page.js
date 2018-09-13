const app = require("application");

const fromObject = require("data/observable").fromObject;

 
const HomeViewModel = require("./home-view-model");


var NETWORKs= require("../helper/network");
var articleRelatedNet= new NETWORKs.ArticlesRelated()
//needed to request data from the api
 

const source = fromObject({
    textSource: "Text set via twoWay binding"
});
 
function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new HomeViewModel(page);

    console.log("navigated to the home page");

    //load recent news


    var MicrosomesDB= require("../helper/db");

    var mb= new MicrosomesDB.ArticlesRelated();

    // mb.saveArticle({           
    //      "Title": "Trump Adviser Threatens Syria With 'Much Stronger' Military Assault If It Uses Chemical Weapons",
    //     "Description": "President Donald Trump’s national security adviser warned the Syrian government against using chemical weapons in the impending battle for Idlib Province, the last remaining rebel stronghold populated by more than 2 million people. If chemical weapons are used, National Security Adviser John Bolton promised the U.S. would deliver a counterattack that’s more severe than the two previous assaults authorized by Trump. “We’ve tried to convey the message in recent days that if there’s a third use of chemical weapons, the response will be much stronger,” Bolton said in a speech on Monday in Washington.",
    //     "CrawlDate": "2018-09-12T21:02:24.000Z",
    //     "Source": "Yahoo",
    //     "Author": "Bill Cosbey",
    //     "Url": "https://www.yahoo.com/news/trump-adviser-threatens-syria-apos-205725528.html",
    //     "UrlToImage": "https://s.yimg.com/uu/api/res/1.2/r6CUUD0ufsZzb3xwzD0X8w--~B/Zmk9c3RyaW07aD0xOTM7cHlvZmY9MDtxPTgwO3c9MjIwO3NtPTE7YXBwaWQ9eXRhY2h5b24-/http://media.zenfs.com/en-US/homerun/time_72/6818e7d161a00a9bd25dbe562441484d",
    //     "tag": "headlines",
    //     "souceImageUrl": "https://vignette.wikia.nocookie.net/logopedia/images/8/84/Yahoo%21_18_Favicon.png/revision/latest?cb=20130825034903",
    //     "postType": "standard",
    //     "newsType": "crawled",
    //     "latLng": null
    // })

    mb.getAllSources();
    
 
    page.bindingContext.set("countries",[]);

 
    articleRelatedNet.grabRecentArticles().then(d=>{
        //grabs all recent articles
        page.bindingContext.set("countries",d);
        pullRefresh.refreshing =false;
    })



}


 


 
function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;

exports.textSource=source;

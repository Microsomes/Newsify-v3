const app = require("application");

const FeaturedViewModel = require("./featured-view-model");


var MicrosomesDB= require("../helper/db");
var fav= new MicrosomesDB.Fav();

var moment= require("moment");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new FeaturedViewModel();
    onLoadNow(page);

}
 
function onLoadNow(page){
    /* 
    code here will be auto called on start
    */
    fav.getRecentFav().then(d=>{
        var toProcess=[];
        d.forEach(row=>{
            toProcess.push({
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
                originalID:row[13],
            })
         
        })
         toProcess.forEach(e=>{
            e.cap= e.Source.toUpperCase();
            e.now= moment(e.CrawlDate).fromNow()
            
            e.sourceCap= e.Source.toUpperCase()
        })

        page.bindingContext.set("articleData",toProcess);

    })
    console.log("favourites news")
}


function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;

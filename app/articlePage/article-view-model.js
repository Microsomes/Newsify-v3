const observableModule = require("data/observable");

const SelectedPageService = require("../shared/selected-page-service");
var nstoasts = require("nativescript-toasts");

var MicrosomesDB= require("../helper/db");
var favDB= new MicrosomesDB.Fav();

function BrowseViewModel(page) {
    SelectedPageService.getInstance().updateSelectedPage("Browse");

    var grabLink= page.link.Url;

    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */

        castTo:function(){
            console.log("casting to big screen...")
        },
        link:grabLink,
        onWebViewLoaded:function(args){
            console.log("article has loaded");
        },
        goBack:function(args){
          console.log("go back ");  
          const topmost = require("ui/frame").topmost;
            topmost().goBack();
        },
        favourite:function(args){
            console.log("fav");
            var options = {
                text: "Favourited",
                duration : nstoasts.DURATION.SHORT,
                position : nstoasts.POSITION.BOTTOM //optional
            }
            nstoasts.show(options);
            console.log(page.link);

            var a=page.link;

            console.log(a);

            favDB.saveFav({
                Title:a.Title,
                Description:a.Description,
                CrawlDate:a.CrawlDate,
                Source:a.Source,
                Author:a.Author,
                Url:a.Url,
                UrlToImage:a.UrlToImage,
                tag:a.tag,
                souceImageUrl:a.souceImageUrl,
                postType:a.postType,
                newsType:a.newsType,
                latLng:a.latLng,
                originalID:a.originalID
            })
        }
    });

    return viewModel;
}

module.exports = BrowseViewModel;

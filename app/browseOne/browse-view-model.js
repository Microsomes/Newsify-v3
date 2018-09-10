const observableModule = require("data/observable");

const SelectedPageService = require("../shared/selected-page-service");

const   DEFINITIONS= require("../definitions/definitions");
//needed to get all api end points data

const frameModule = require("ui/frame");


const moment= require("moment");

const httpModule = require("http");


var sources= []
//all sources grabbed from the server will be stored here

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function BrowseViewModel(page) {
    SelectedPageService.getInstance().updateSelectedPage("Browse");

 
    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */

        refreshList:function(args){
            viewModel.set("searchResults",[]);
            //empty the articles

            var pullRefresh= args.object;

            //refresh articles here
            httpModule.getJSON("https://socialstation.info/newsv2/source/"+viewModel.get("currentSource")).then((r) => {
                var d= r["data"];

                d.forEach(e=>{
                    e.cap= e.Source.toUpperCase();
                    e.now= moment(e.CrawlDate).fromNow()
                    
                    e.sourceCap= capitalizeFirstLetter(e.Source)
                })

                viewModel.set("searchResults",d);

                
                var lw= page.getViewById("browse_list");
                lw.refresh();
                pullRefresh.refreshing =false;

                
                

            }, (e) => {
            });



        },
        onItemTap:function(args){
            var index= args.index;

            var sr= viewModel.get("searchResults");

            frameModule.topmost().navigate({
                moduleName: "articlePage/article-page",
                context:{link:sr[args.index].Url},
                transition: {
                    name: "fade"
                }
            });


        },

        currentSource:"...",
        
        searchResults:[{          
            "id": 46139,
            "Title": "Is Meghan Markle Pregnant? 'Date Night' Photo Has the Internet Buzzing About a Royal Baby",
            "Description": "Rumors are swirling that Meghan Markle is pregnant after she wore a dress with ruffles across its midsection. The Duchess of Sussex wore the blue, custom-made Jason Wu dress during a date night with Prince Harry on Thursday. \"I have a feeling Meghan Markle is pregnant,\" went one tweet.",
            "CrawlDate": "2018-09-08T15:02:07.000Z",
            "Source": "Yahoo",
            "Author": "Chris Mahatman",
            "Url": "https://www.yahoo.com/news/meghan-markle-pregnant-apos-date-191215999.html",
            "UrlToImage": "https://s.yimg.com/uu/api/res/1.2/c1SOrC0GF981oUdh5HJW5Q--~B/Zmk9c3RyaW07aD0xOTM7cHlvZmY9MDtxPTgwO3c9MjIwO3NtPTE7YXBwaWQ9eXRhY2h5b24-/http://media.zenfs.com/en-US/homerun/inside_edition/157c1ad732b4b795d5952055af04fe1d",
            "tag": "headlines",
            "souceImageUrl": "https://vignette.wikia.nocookie.net/logopedia/images/8/84/Yahoo%21_18_Favicon.png/revision/latest?cb=20130825034903",
            "postType": "standard",
            "newsType": "crawled",
            "latLng": null
            }],
        
        startLoad:function(args){
            //first called on load to load all source articles
            
            console.log("processing the start");
            
            console.log(args);
            httpModule.getJSON("https://socialstation.info/newsv2/source/"+args).then((r) => {
                var d= r["data"];

                d.forEach(e=>{
                    e.cap= e.Source.toUpperCase();
                    e.now= moment(e.CrawlDate).fromNow()
                    
                    e.sourceCap= capitalizeFirstLetter(e.Source)
                })

                viewModel.set("searchResults",d);
            }, (e) => {
            });
        } 
    });

 

    return viewModel;
}

module.exports = BrowseViewModel;

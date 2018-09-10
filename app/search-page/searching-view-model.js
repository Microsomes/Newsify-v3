const observableModule = require("data/observable");

const SelectedPageService = require("../shared/selected-page-service");
const frameModule = require("ui/frame");

function SearchViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Search");

    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */

        searchQuery:"",

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

        goBack:function(){
            //navigates back to previous frame
            console.log("going back now");
            const topmost = require("ui/frame").topmost;
            topmost().goBack();
        },
        onItemTap:function(args){
            console.log('Item with index: ' + args.index + ' tapped');

            var sr= viewModel.get("searchResults");

 
            console.log("opening articles page");

            frameModule.topmost().navigate({
                moduleName: "articlePage/article-page",
                context:{link:sr[args.index].Url},
                transition: {
                    name: "fade"
                }
            });
        }
    });

    return viewModel;
}

module.exports = SearchViewModel;

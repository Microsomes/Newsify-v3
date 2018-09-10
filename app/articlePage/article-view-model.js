const observableModule = require("data/observable");

const SelectedPageService = require("../shared/selected-page-service");
var nstoasts = require("nativescript-toasts");

function BrowseViewModel(page) {
    SelectedPageService.getInstance().updateSelectedPage("Browse");

    var grabLink= page.link;

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
        }
    });

    return viewModel;
}

module.exports = BrowseViewModel;

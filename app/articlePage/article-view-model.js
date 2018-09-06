const observableModule = require("data/observable");

const SelectedPageService = require("../shared/selected-page-service");

function BrowseViewModel(page) {
    SelectedPageService.getInstance().updateSelectedPage("Browse");

    var grabLink= page.link;

    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
        link:grabLink,
        onWebViewLoaded:function(args){
            console.log("article has loaded");
        },
        goBack:function(args){
          console.log("go back ");  
          const topmost = require("ui/frame").topmost;
            topmost().goBack();
        }
    });

    return viewModel;
}

module.exports = BrowseViewModel;

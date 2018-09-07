const observableModule = require("data/observable");

const SelectedPageService = require("../shared/selected-page-service");

const frameModule = require("ui/frame");


function SearchViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Search");

    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */

        openSearch:function(){
            //open search
            console.log("open search activity");

            frameModule.topmost().navigate({
                moduleName: "search-page/search",
                context:{},
                transition: {
                    name: "flipRight",
                    duration:500,
                    curve:"easeIn"
                }
            });
            
        }
    });

    return viewModel;
}

module.exports = SearchViewModel;

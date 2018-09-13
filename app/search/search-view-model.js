const observableModule = require("data/observable");

const SelectedPageService = require("../shared/selected-page-service");

const frameModule = require("ui/frame");


function SearchViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Search");

    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */

        openSearchWithContext:function(args){
            console.log(args.index);

            var st= viewModel.get("pastSearches")[args.index];
            console.log(st);

            frameModule.topmost().navigate({
                moduleName: "search-page/search",
                context:{status:"param",st},
                transition: {
                    name: "flipRight",
                    duration:500,
                    curve:"easeIn"
                }
            });

        },

        pastSearches:[{
            searchTerm:"Batman",
            fLetter:"B",
            timeStamp:"1 hour ago"
        }],

        openSearch:function(){
            //open search
            console.log("open search activity");

            frameModule.topmost().navigate({
                moduleName: "search-page/search",
                context:{status:"noparam"},
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

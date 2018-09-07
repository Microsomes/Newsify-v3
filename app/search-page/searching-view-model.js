const observableModule = require("data/observable");

const SelectedPageService = require("../shared/selected-page-service");

function SearchViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Search");

    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */

        searchQuery:"",

        goBack:function(){
            //navigates back to previous frame
            console.log("going back now");
            const topmost = require("ui/frame").topmost;
            topmost().goBack();
        },

        onClear:function(){
            //when user clears the search bar
            console.log("cleared")
        },
        onSubmit:function(){
            //when user submits a query
            console.log("submit query");
            console.log(viewModel.get("searchQuery"))
        }
    });

    return viewModel;
}

module.exports = SearchViewModel;

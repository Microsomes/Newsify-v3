const observableModule = require("data/observable");

const SelectedPageService = require("../shared/selected-page-service");


const httpModule = require("http");

const DEFINITIONS= require("../definitions/definitions");

function AppRootViewModel() {
    const viewModel = observableModule.fromObject({
        selectedPage: "",
        totalArticles:1000
    });

    SelectedPageService.getInstance().selectedPage$
    .subscribe((selectedPage) => { viewModel.selectedPage = selectedPage; });


    httpModule.getJSON(DEFINITIONS.GRAB_TOTAL).then((r) => {
        
        var total= r["data"][0].totalArticlesCached;
        viewModel.set("totalArticles","Total Articles: "+total);
        
    }, (e) => {
    });


    return viewModel;
}

module.exports = AppRootViewModel;

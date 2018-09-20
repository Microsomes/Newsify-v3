const observableModule = require("data/observable");

const SelectedPageService = require("../shared/selected-page-service");

const frameModule = require("ui/frame");


function FeaturedViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Featured");

    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */

        articleData:[],
        onItemTap: function (args) {
            frameModule.topmost().navigate({
                moduleName: "articlePage/article-page",
                context:{link:viewModel.get("articleData")[args.index]},
                transition: {
                    name: "slideTop"
                }
            });

          },
    });

    return viewModel;
}

module.exports = FeaturedViewModel;

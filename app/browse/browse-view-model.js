const observableModule = require("data/observable");

const SelectedPageService = require("../shared/selected-page-service");

const   DEFINITIONS= require("../definitions/definitions");
//needed to get all api end points data
const frameModule = require("ui/frame");


const httpModule = require("http");


 

 

function BrowseViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Browse");

 
    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */

        sources:[
           
        ],
        onItemTap:function(args){
            //user clicked on a source
             var source= viewModel.get("sources")[args.index].Source;
            frameModule.topmost().navigate({
                moduleName: "browseOne/browse-page_one",
                context:{source:source},
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

module.exports = BrowseViewModel;

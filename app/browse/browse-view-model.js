const observableModule = require("data/observable");

const SelectedPageService = require("../shared/selected-page-service");

const   DEFINITIONS= require("../definitions/definitions");
//needed to get all api end points data
const frameModule = require("ui/frame");


const httpModule = require("http");


 
var NETWORKs= require("../helper/network");
var articleRelatedNet= new NETWORKs.ArticlesRelated()
//needed to request data from the api

 

function BrowseViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Browse");

 
    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
        refreshList:function(args){
            //refresh the sources list
            var pullRefresh= args.object;

            articleRelatedNet.grabAllSouces().then(d=>{
                viewModel.set("sources",[])
                //empty current sources
                viewModel.set("sources",d);
                pullRefresh.refreshing=false;
            })

        }
        ,
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

const observableModule = require("data/observable");

const SelectedPageService = require("../shared/selected-page-service");

const   DEFINITIONS= require("../definitions/definitions");
//needed to get all api end points data
const frameModule = require("ui/frame");


const httpModule = require("http");


var sources= []
//all sources grabbed from the server will be stored here


function loadSources(vm){
    //method will grab source data from the server and store them
    //in the sources array

    var apiLinkToAccessSources= DEFINITIONS.GRAB_SOURCES;

    httpModule.getJSON(apiLinkToAccessSources).then((r) => {
        var dataArr= r["sources"];

        
        dataArr.forEach(e=>{
            e.cap= e.Source.toUpperCase();
        })

        //console.log(dataArr);

        sources=dataArr;
        
        vm.set("sources",dataArr);
        
    }, (e) => {
    });

}

function BrowseViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Browse");

 
    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */

        sources:[
           
        ],
        onItemTap:function(args){
            //user clicked on a source
            console.log("sources"+sources[args.index].Source);
            var source= sources[args.index].Source;
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

    loadSources(viewModel);


    return viewModel;
}

module.exports = BrowseViewModel;

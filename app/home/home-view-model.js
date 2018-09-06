const observableModule = require("data/observable");

var moment= require("moment");

const httpModule = require("http");

const frameModule = require("ui/frame");

var DEFINITIONS= require("../definitions/definitions")


const SelectedPageService = require("../shared/selected-page-service");

const recent_api_grabber_url_link= DEFINITIONS.GRAB_RECENT;
//api link to grab recent news posts
onLoadNow();

var countries= [];

 function onLoadNow(){
    /* 
    code here will be auto called on start
    */
 

    httpModule.getJSON(recent_api_grabber_url_link).then((r) => {
        var dataArr= r["data"];

        dataArr.forEach(e=>{
            var fromNow= moment(e.CrawlDate).fromNow()
            e.now=fromNow;
        })

        console.log(dataArr);

        countries=dataArr;
        

        
    }, (e) => {
    });



    console.log("recent news")
}

  countries= [
    
  ]

  var isBasic=true;

function HomeViewModel(page) {
    SelectedPageService.getInstance().updateSelectedPage("Home");

    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
        
        toggleView:function(){
            console.log("toggle view");
            

            viewModel.set("isBasic",!isBasic)
            isBasic=!isBasic;
             
        },

 
        isBasic:isBasic,

        refreshList:function(args){
            viewModel.set("countries",[])
            //reset countries (articles array) to commence a full reload

            var pullRefresh= args.object;

            httpModule.getJSON(recent_api_grabber_url_link).then((r) => {
                var dataArr= r["data"];
        
                dataArr.forEach(e=>{
                    var fromNow= moment(e.CrawlDate).fromNow()
                    e.now=fromNow;
                })

                viewModel.set("countries",dataArr);
        
              
                
                pullRefresh.refreshing =false;
        
                
            }, (e) => {

            });


        },

        countries:countries,
          onItemTap: function (args) {
            console.log('Item with index: ' + args.index + ' tapped');

            console.log(countries[args.index]);

            console.log("opening articles page");

            frameModule.topmost().navigate({
                moduleName: "articlePage/article-page",
                context:{link:countries[args.index].Url},
                transition: {
                    name: "fade"
                }
            });

          },
    });

    const bindingUI_layout={
        sourceProperty: "isBasic",
        targetProperty: "visibility",
        twoWay: true,
        expression:"isBasic ? 'visible': 'collapse'"
    }

    var basic_ui= page.getViewById("basic_artilce_viewing");
    //grabs the basic ui view by id
    basic_ui.bind(bindingUI_layout,viewModel)
    //binds the basic uis visibility to a propery within a viewmodel

    //the above binds the basic ui listview
    

    const bindingUI_layout_advanced={
        sourceProperty:"isBasic",
        targetProperty:"visibility",
        twoWay:true,
        expression:"isBasic ? 'collapse' : 'visible' "
    }

    var advanced_ui= page.getViewById("advanced_artilce_viewing");
    //grabs the advanced listview

    advanced_ui.bind(bindingUI_layout_advanced,viewModel);
    //binds ui to a view model
    

    return viewModel;
}


 

 

module.exports = HomeViewModel;

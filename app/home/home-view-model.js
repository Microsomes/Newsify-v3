const observableModule = require("data/observable");

var moment= require("moment");

const httpModule = require("http");

const frameModule = require("ui/frame");

var DEFINITIONS= require("../definitions/definitions")

var NETWORKs= require("../helper/network");
var articleRelatedNet= new NETWORKs.ArticlesRelated()
//needed to request data from the api

 
const SelectedPageService = require("../shared/selected-page-service");

const recent_api_grabber_url_link= DEFINITIONS.GRAB_RECENT;
//api link to grab recent news posts
 


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



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

            articleRelatedNet.grabRecentArticles().then(d=>{
                //grabs all recent articles
                viewModel.set("countries",[]);
                setTimeout(()=>{
                    viewModel.set("countries",d);
                    pullRefresh.refreshing =false;
                },100)
               
            })


        },

        openArticleMenu:function(args){
        console.log(args);
        },

        countries:[],

          onItemTap: function (args) {
            frameModule.topmost().navigate({
                moduleName: "articlePage/article-page",
                context:{link:viewModel.get("countries")[args.index].Url},
                transition: {
                    name: "slideTop"
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

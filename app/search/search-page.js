const app = require("application");

const SearchViewModel = require("./search-view-model");

var MicrosomesDB= require("../helper/db");

var SearchRelatedDB= new MicrosomesDB.SearchRelated();

 
 
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new SearchViewModel();


    page.bindingContext.set("pastSearches",[]);

    //load the pased searches from the database

    SearchRelatedDB.getSearchHistory().then(d=>{

        var result=[];

 
        d.forEach((data)=>{
            var st= capitalizeFirstLetter(data[0])
            //capitalizes the first letter of the search term
            result.push({
                searchTerm:st,
                fLetter:"B",
                timeStamp:"1 hour ago"
            })
        })

        console.log("result");
        console.log(result);
        page.bindingContext.set("pastSearches",result);

    })
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;

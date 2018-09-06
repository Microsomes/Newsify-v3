const app = require("application");

const FeaturedViewModel = require("./featured-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new FeaturedViewModel();
}
onLoadNow();

function onLoadNow(){
    /* 
    code here will be auto called on start
    */

    console.log("favourites news")
}


function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;

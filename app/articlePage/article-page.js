const app = require("application");

const BrowseViewModel = require("./article-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    const context = page.navigationContext;
    console.log(context);

    page.bindingContext = new BrowseViewModel(context);

  

}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;

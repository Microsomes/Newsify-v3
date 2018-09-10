const app = require("application");

const BrowseViewModel = require("./browse-view-model");

function onNavigatingTo(args) {
    const page = args.object;

    const context = page.navigationContext;
    var source= context.source;

    page.bindingContext = new BrowseViewModel(page);

    page.bindingContext.set("currentSource",source);
    //contact nativescript and tell it to update the ui of title since the data has arrived

    page.bindingContext.get("startLoad")(source);

}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;

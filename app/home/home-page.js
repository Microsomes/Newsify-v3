const app = require("application");

const fromObject = require("data/observable").fromObject;

 
const HomeViewModel = require("./home-view-model");


 

const source = fromObject({
    textSource: "Text set via twoWay binding"
});

 
function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new HomeViewModel(page);

    console.log("navigated to the home page")

}


 


 
function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;

exports.textSource=source;

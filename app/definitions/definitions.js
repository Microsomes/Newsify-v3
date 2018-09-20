


var isDevelopment=false;
//determines if the app should connect to the development server or the main production server

var DOMAIN=null;
//default i set the domain to null


if(isDevelopment){
    DOMAIN="http://192.168.0.21:4000/newsv2/"
}else{
    DOMAIN="https://socialstation.info/newsv2/"
}

 const GRAB_RECENT=DOMAIN+"betterdelivery";
//exposes the recent api link 

const GRAB_SOURCES= DOMAIN+"sources"

const GRAB_TOTAL=DOMAIN+"total";

const GRAB_SEARCH=DOMAIN+"search";

const GRAB_NEWS_BY_SOURCE=DOMAIN+"source";


module.exports={
    GRAB_RECENT,
    GRAB_SOURCES,
    GRAB_TOTAL,
    GRAB_SEARCH,
    GRAB_NEWS_BY_SOURCE
}
//exports all the constant api endpoint links
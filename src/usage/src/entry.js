/**
 * Created by Administrator on 2016/5/16.
 */
import Patches from './patch';
require('./assets/bootstrap/css/bootstrap.min.css');
require('./assets/css/main.css');
require('bootstrap');
var parseURL = function(url){
    var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-_A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
    var result = parse_url.exec(url)||[];
    return {
        "url":result[0],
        "scheme":result[1],
        "slash":result[2],
        "host":result[3],
        "port":result[4],
        "path":result[5],
        "query":result[6],
        "hash":result[7]
    }
}

$(document).on("click","a",function(){
    console.log(123)
    var link = parseURL($(this).attr("href"));
    var isMainTarget = !this.target || (this.target==="#container");
    var target = this.target||"";
    target = target?$(target):undefined;

    switch(link.scheme){
        case "route":
            var route = link.host||"";

            route = route.replace(new RegExp("/","g"),"");

            var data = link.query;

            Patches.load(route,$("#container"))

            return false;
    }

});

/**
 * Created by Administrator on 2016/5/16.
 */
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
};
$(function(){

    $(document).on("click","a",function(){

        var link = parseURL($(this).attr("href"));
        var isMainTarget = !this.target || (this.target==="#container");
        var target = this.target||"";
        target = target?$(target):undefined;

        switch(link.scheme){
            case "route":
                var route = link.host||"";

                route = route.replace(new RegExp("/","g"),"");

                var data = link.query;

                Router.load(route,$("#container"));

                return false;
        }
    });
});
const Modules = require('../modules/alias');
const Patches = require('../custom_modules/alias');
const Components = require('../dependencies/components/alias');
const API = require('../custom_modules/API');

const Router = {
    /**
     * 加载模块，页面与脚本自动解析执行
     * @param alia [string] 需要加载的模块名称
     * @param container [string|$_] 模块加载位置
     */
    load: function (alia,container) {

        var $patch = (Patches[alia]||Modules[alia]).init({
            Components,API
        })
        $(container).empty().html($patch)
        console.log($patch)
    }
};

module.exports = Router;
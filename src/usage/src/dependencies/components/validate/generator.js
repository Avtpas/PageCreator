'use strict';
let html = require('./generator.coffee')
module.exports = {
    init:function(old_rules){
        var $div = $("<div>");

        var $html = $(html.html);
        var v = old_rules;
        if((typeof old_rules)==="object"){
            v = JSON.stringify(old_rules)
        }
        $html.find("textarea").val(v)

        $div.append($html);

        var obj = Object.create(this);
        obj.view = $div;
        return obj;
    },
    result:function(){
        var $view = this.view
            ,val = $view.find("textarea").val() //粗糙写法，需要改动
            ,rs = {};

        rs = (function(){
            try{
                return JSON.stringify(JSON.parse(val||"{}"));
            }catch(e){
                return false;
            }
        })();
        return rs
    }
}
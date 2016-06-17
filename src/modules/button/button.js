/**
 * Created by Administrator on 2016/3/14.
 */
'use strict';
const html = require('./html.coffee')
import BaseModule from '../BaseModule'

class Button extends BaseModule {
    constructor(element={},creator,key){
        super();
        [this.element,this.creator,this.key] = [element,creator,key];
        this.configs = html.config;
    }
    edit() {
        var $dom_edit = $(html.html(this.element));
        //var $dom_edit = $("<div>");
        var obj = this;
        obj.title = "button";
        obj.$dom = $dom_edit;
        return obj;
    }
    view() {
        var [element,creator,key] = [this.element,this.creator,this.key];
        var obj = this.edit();

        obj.menu = false;
        obj.isView = true;

        if(element.ID || (element.param && element.param["code-onclick"])){
            var API = creator.API;
            creator.done(function(){
                obj.$dom.on("click",function(){
                    obj.exec(element.param["code-onclick"],API)
                })
            },{
                key,element
            });

        }
        return obj;
    }
}
module.exports = Button;


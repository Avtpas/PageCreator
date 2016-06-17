/**
 * Created by Administrator on 2016/3/14.
 */
'use strict';
const html = require('./html.coffee');
import BaseModule from '../BaseModule'
class Button extends BaseModule {
    constructor(element = {}, creator, key) {
        super();
        [this.element, this.creator, this.key] = [element, creator, key];

        //mock 假数据
        this.element.param = {
            "tabs": [{
                tab: "tab1",
                id: "tab_"+(element.ID||"no_id")+"_tab1"
            }, {
                tab: "tab2",
                id: "tab_"+(element.ID||"no_id")+"_tab2"
            }, {
                tab: "tab3",
                id: "tab_"+(element.ID||"no_id")+"_tab3"
            }],
            activeIndex: 0
        };

        this.configs = html.config;
    }

    edit() {
        var $dom_edit = $(html.html(this.element));
        //var $dom_edit = $("<div>");
        var obj = this;
        obj.title = "button";
        obj.$dom = $dom_edit;

        this.creator.done(function () {
            obj.$dom.on("click", ".tab-nav", function () {
                $(this).tab("show")
            })
        }, {
            key: this.key,
            element: this.element
        })
        return obj;
    }

    view() {
        var [element,creator,key] = [this.element, this.creator, this.key];
        var obj = this.edit();

        obj.menu = false;
        obj.isView = true;

        if (element.param && element.param["code-onclick"]) {
            var API = creator.API;
            creator.done(function () {
                obj.$dom.on("click", function () {
                    obj.exec(element.param["code-onclick"], API)
                })
            }, {
                key, element
            });
        }
        return obj;
    }

    fields(deferred, param){
        var $html = this.superFields(deferred,param);
        $html.on("click","a.fn-config-delete-tab",function(){

        }).on("click","a.fn-config-add-tab",function(){

        })
        deferred.resolve($html);
    }
}
module.exports = Button


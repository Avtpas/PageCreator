/**
 * Created by Administrator on 2016/3/14.
 */
'use strict';
let html = require('./input.coffee')
import BaseModule from '../BaseModule'
class Input extends BaseModule {
    constructor(element = {}, creator, key) {
        super();
        [this.element, this.creator, this.key] = [element, creator, key];
        this.configs = html.config;
        this.exports = {
            val: function () {
                return this.$dom.find('input').val()
            }
        };
        //调用基类bindExports方法绑定exports的上下文
        //this.bindExports(this);
    }

    edit() {

        var $dom_edit = $(html.html(this.element || {}));
        //var $dom_edit = $("<div>");
        var obj = this;
        obj.title = "text";
        obj.$dom = $dom_edit;
        return obj;
    }

    view() {

        var [element,creator,key] = [this.element, this.creator, this.key];

        var obj = this.edit();
        obj.menu = false;
        obj.isView = true;

        //注册
        if (!!element.ID) {
            creator.done(undefined, {
                key
                , element
                , self: this
            })
        }
        return obj;

    }
}
module.exports = Input;


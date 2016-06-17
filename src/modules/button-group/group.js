/**
 * Created by Administrator on 2016/3/14.
 */
'use strict';
let html = require('./html.coffee')
import BaseModule from '../BaseModule'
class Button extends BaseModule {
    constructor(){
        super()
    }
    edit() {
        var $dom_edit = $(html.group);
        //var $dom_edit = $("<div>");
        var obj = this;
        obj.title = "button-group";
        obj.$dom = $dom_edit;
        obj.menu = true;
        return obj;
    }
    view() {

        var obj = this.edit();

        obj.menu = false;
        obj.isView = true;

        return obj;
    }
}
module.exports = Button


/**
 * Created by Administrator on 2016/3/14.
 */
'use strict';
let html = require('./html.coffee')
require('./css/grid.css')
import BaseModule from '../BaseModule'
class GridTree extends BaseModule {
    constructor(element={},creator,key){
        super();
        [this.element,this.creator,this.key] = [element,creator,key];
        this.configs = html.config
    }
    edit() {
        var $dom_edit = $(html.base);
        var obj = this;
        obj.title = "grid-tree";
        obj.$dom = $dom_edit;
        return obj;
    }
    //element 名字不能变
    view() {

        var [element,creator,key] = [this.element,this.creator,this.key];

        var obj = this.edit();
        obj.menu = false;
        obj.isView = true;

        creator.done(undefined,{
            key,element,self:this
        });
        return obj;
    }
}
module.exports = GridTree
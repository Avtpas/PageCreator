/**
 * Created by Administrator on 2016/3/14.
 */
'use strict';
import BaseModule from '../BaseModule'
class Separator extends BaseModule {
    edit() {
        var $dom_edit = $('<div class="clearfix row"><hr/></div>');
        var obj = this;
        obj.title = "separator";
        obj.$dom = $dom_edit;
        obj.menu = true;
        return obj;
    }
    view() {
        var obj = this.edit();
        obj.menu = false;
        obj.isView = true;
        //修改部分dom的只是那时
        obj.$dom = obj.$dom.children();
        return obj;
    }
}
module.exports = Separator

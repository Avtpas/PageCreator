/**
 * Created by Administrator on 2016/3/14.
 */
'use strict';
import Components from '../../components/alias'
import BaseModule from '../BaseModule'
class Layout extends BaseModule {
    constructor(element,creator,key){
        super(arguments);
        [this.element,this.creator,this.key] = [element,creator,key];

    }
    edit() {
        var args = this.element.args || [];
        //var creator = require('page-creator');
        var validator = Components.validate;
        //处理arguments，确保全是合法参数

        var validArgs = [];
        var sum = 0;
        [].map.call(args, function (n, i) {
            var result = validator.check(n, [{
                regexp: "1|2|3|4|5|6|8|9|10|12"
            }]);
            if (result.result) {
                if ((sum += n) <= 12) {
                    validArgs.push(n)
                }
            }
        });

        var $dom_edit = $("<div>").addClass("container-fluid");

        validArgs.forEach(function (n, i) {
            $dom_edit.append('<div class="dcr-page-creator-container col-xs-' + n + '"></div>')
        });

        var obj = this;
        obj.$dom = $dom_edit;
        obj.menu = true;
        obj.title = "layout-" + validArgs.join("-");
        return obj;
    }

    view() {
        var obj = this.edit();
        obj.menu = false;
        obj.isView = true;
        return obj;
    }
}
module.exports = Layout
/**
 * Created by Administrator on 2016/3/14.
 */
'use strict';
let html = require('./html.coffee');
const Components = require('../../components/alias');
import BaseModule from '../BaseModule'
/**
 * 数据表格
 */
class Table extends BaseModule {
    constructor(element = {}, creator, key) {
        super();
        [this.element, this.creator, this.key] = [element, creator, key];
        this.element.param = this.element.param || {
                canSelect: "1",
                page: false,
                columns: [{
                    "headText": "姓名"
                }, {
                    "headText": "年龄"
                }, {
                    "headText": "性别"
                }, {
                    "headText": "生日"
                }, {
                    "headText": "操作"
                }]
            };
        this.configs = html.config;
        this.exports = {
            update(itemList = []){
                this.table.update(itemList)
            },
            getSelectedItem(){

            }
        }
    }

    edit() {

        if (typeof this.element.param.columns === 'string') {
            //如果是字符串，说明是base64压缩的对象，要还原
            this.element.param.columns = eval(Base64.decode(this.element.param.columns))
        }

        var $dom_edit = $(html.html(this.element));
        console.log("console.log(this.element)", this.element)
        var obj = this;
        obj.title = "table";
        obj.$dom = $dom_edit;
        return obj;
    }

    //element 名字不能变
    view() {
        var obj = this.edit();
        var [element,creator,key] = [this.element, this.creator, this.key];
        obj.menu = false;
        obj.isView = true;

        creator.done(function () {
            const table = Components.table;
            const columns = element.param.columns;
            let response = {};

            if (element.param.canSelect == "1") {
                response["columns_x"] = function(){
                    return "<input type='checkbox'>"
                }
            }
            for (let i = 0, len = columns.length; i < len; i++) {
                response["columns_" + i] = columns[i].response || ""
            }
            console.log(response)
            obj.table = table.create(obj.$dom.children("table"), {
                response
            })
        }, {
            key, element, self: this
        });
        return obj;
    }

    //所有可编辑、配置的项
    fields(deferred, param) {
        var $html = this.superFields(param)
        var dialog = Components.dialog;
        var table = Components.table;
        var context = this;

        $html.on("click", "[data-fn=column]", function () {
            var $div = $('<div class="container-fluid" >正在载入...</div>');
            //generator 组件实例
            var result = void 0;
            dialog.dialog({
                "title": "列设置",
                "styles": "modal-lg",
                "content": $div,
                "buttons": [
                    {
                        text: "确定",
                        styles: "btn btn-primary",
                        events: {
                            "click": function (d) {
                                $html.find("[data-name=columns]").val(Base64.encode(result.result()));
                                d.close();
                            }
                        }
                    }
                ]
            });
            //使用Components中的table设置器
            $div.empty().append(
                (result = table.generator(
                    Base64.decode($html.find("[data-name=columns]").val() || context.element.param.columns)
                )).view
            )
        });
        //重写field情况下需要手动resolve一下
        deferred.resolve($html);
    }
}
module.exports = Table;
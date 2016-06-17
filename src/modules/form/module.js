/**
 * Created by Administrator on 2016/3/14.
 */
const Components = require('../../components/alias')
import BaseModule from '../BaseModule'
let html = require('./html.coffee')
class Form extends BaseModule {
    /**
     * param element :结构json对象
     * param creator :创建者,Creator实例
     * param key:路径key，用来标识与寻找dom
     */
    constructor(element={},creator,key){
        super();
        [this.element,this.creator,this.key] = [element,creator,key];
        this.configs = html.config;
        this.exports = {
            submit:function(){
                this.form.submit()
            }
        }
        //this.bindExports(this)
    }
    edit() {
        var $dom_edit = $("<div>").addClass("clearfix row");
        //var $dom_edit = $("<div>");
        $dom_edit.append($("<form>").addClass("form-horizontal")
            .append($("<div>").addClass("dcr-page-creator-container container-fluid")));
        var obj = this;
        obj.title = "form";
        obj.$dom = $dom_edit;
        obj.menu = true;
        return obj;
    }
    view() {

        var [element,creator,key] = [this.element,this.creator,this.key];

        var obj = this.edit();
        obj.menu = false;
        obj.isView = true;

        creator.done(function () {
            var ep = element.param||{};
            var form = Components.form
            obj.form = form.create(obj.$dom.find("form"), {
                url: ep.url,
                autoCheck: true,
                submitType: ep.type,
                validate: (function () {
                    return JSON.parse(ep.validate||"{}")
                })()
            }, function (promise) {
                promise.done(function (data) {
                    console.log(data)
                }).always(function (data) {
                    console.log(data)
                })
            });
        },{
            key
            ,element
            ,self:this
        });

        return obj;
    }

    //所有可编辑、配置的项
    fields(deferred, param) {

        var $html = this.superFields(param)

        var dialog = Components.dialog;
        var validate = Components.validate;

        $html.on("click", "[data-fn=validate]", function () {
            var $div = $('<div class="container-fluid" >正在载入...</div>');
            //generator 组件实例
            var vg = {};
            dialog.dialog({
                "title": "配置校验",
                "content": $div,
                "buttons": [
                    {
                        text: "确定",
                        styles: "btn btn-primary",
                        events: {
                            "click": function (d) {
                                var rs = vg.result();
                                if (rs === false) {
                                    dialog.alert("不是正确的json格式，请重新检查")
                                } else {
                                    $html.find("[data-name=validate]").val(rs);
                                    d.close()
                                }
                            }
                        }
                    }
                ]
            });

            //如果直接使用generator组件，可以改为同步写法
            $div.empty().append((vg = validate.generator($html.find("[data-name=validate]").val())).view)
        });
        //重写field情况下需要手动resolve一下
        deferred.resolve($html)
    }

}
module.exports = Form;
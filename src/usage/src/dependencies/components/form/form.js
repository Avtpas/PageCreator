/**
 * 1.1更新
 *  - 添加对查询排序字段的支持
 *      - option.order = {
 *          name:"orderby" //排序字段参数
 *          order:"order"        //识别码参数名
 *          keys:{
 *              "desc":1, //配置倒序识别码
 *              "asc":-1  //配置顺序识别码
 *          }
 *      }
 * 2.0 更新
 *  - 简化编写form时候的html结构，使复杂重复部分可以自动填充
 * 2.1 更新
 *  - 增加afterValidation配置
 *  - 修改onSubmit事件为延迟事件，需要被resolve
 */

require("bootstrap");
let validate = require('../validate/validate')
let page = require('../page/page');
var styleMap = {
    "success": "has-success"
    , "error": "has-error"
};

//校验
var check = function ($form, $field, validations) {

    var rs = false;
    var checkResult = validate.check($field.val(), validations);

    var fieldname = $field.attr("name");
    //获取对应的error_box以及给input 添加相应样式
    var $style_set = $form.find("[comp-form-styleset=" + fieldname + "]").removeClass(styleMap.success).removeClass(styleMap.error)
    var $error_box = $form.find("[comp-form-errorbox=" + fieldname + "]").empty();

    var $feed_back;
    if ($style_set.hasClass("has-feedback")) {
        $feed_back = $style_set.find(".form-control-feedback");
    }

    if (checkResult.result) {
        $style_set.addClass(styleMap.success);
        if ($feed_back) {
            $feed_back.removeClass("glyphicon-remove").addClass("glyphicon-ok").show();
        }
        rs = true;
    } else {
        $style_set.addClass(styleMap.error);
        if ($feed_back) {
            $feed_back.removeClass("glyphicon-ok").addClass("glyphicon-remove").show();
        }
        $error_box.html(checkResult.message);
        rs = false;
    }

    return rs;
}
module.exports = {
    /**
     * 创建组件
     * $form:传进来的经jQuery封装的form对象
     * options:部分配置参数
     * promiseFunction:ajax延迟对象
     */
    "create": function ($form, options, promisedFunction) {
        //检查是否已经被初始化，如果是，则不创建新对象
        var compObject = $form.data("comp-object");
        if (compObject) {
            return compObject;
        }
        var obj = Object.create(this);
        obj.form = $form;
        obj.options = {
            "page": undefined,//分页组件
            "onSubmit": function () {
                return true;
            }
            , "order": undefined
            , "autoCheck": false
            , "submitType": "form"//提交类型:ajax,form
            , "dataType": undefined
            , "type": $form.attr("method") || "post"//提交方式:post,get
            , "url": $form.attr("action")
            , "validate": {}
        };

        $.extend(true, obj.options, options);

        var config = obj.options;

        if (config.page) {
            config.page.page.data("form", obj);

        }

        //2.0新增:遍历validate将需要校验的表单项，添加校验提示组件

        (function () {
            try {
                for (var v in config.validate) {
                    var $item = $form.find("[name=" + v + "]");
                    var $parent = $item.parent();
                    if ($parent.is(".input-group")) {
                        $parent = $parent.parent();
                    }
                    $parent.parent().addClass("has-feedback").attr("comp-form-styleset", v);
                    var $help_block = $parent.parent().find("[comp-form-errorbox=" + v + "]");
                    var $feed_back = $parent.find(".form-control-feedback");

                    $feed_back = $feed_back.size() === 0 ? $('<span class="glyphicon form-control-feedback"></span>')
                        .appendTo($parent) : $feed_back;

                    $help_block = $help_block.size() === 0 ? $('<span class="text-danger" comp-form-errorbox="' + v + '"></span>')
                        .appendTo($parent) : $help_block;

                }
            } catch (e) {
            }
        })();


        //是否有排序字段
        var $input_order = undefined;
        var $input_orderby = undefined;
        if (config.order) {
            //排序方式
            $input_order = $('<input type="hidden">').attr("name", config.order.order).appendTo($form);
            //排序字段
            $input_orderby = $('<input type="hidden">').attr("name", config.order.name).appendTo($form);
        }
        if (config.autoCheck) {
            $form.find(":input").map(function () {
                var $i = $(this),
                    _name = $i.attr("name");
                var validates = config.validate[_name];
                if (_name && validates) {
                    var t;
//						$i.on("keyup blur",function(){
                    $i.on("input blur select change", function () {
                        clearTimeout(t);
                        t = setTimeout(function () {
                            check($form, $i, validates);
                        }, 200);
                    });
                }
            })
        }

        $form.on("submit", function () {
            if (arguments[1] && arguments[1].skip === true) {
                return true;
            }
            //修正排序字段识别码
            if ($input_order) {
                var order_keys = config.order.keys || {};
                $input_order.val(order_keys[$input_orderby.data("order")] || $input_orderby.data("order"))
            }
            //封锁按钮

            //console.log($form.serialize());
            //校验
            if (!config.onSubmit())return false;
            var validates = config.validate;//已注册的所有校验规则
            try {
                for (var fieldname in validates) {
                    var $field = $form.find("[name=" + fieldname + "]");
                    var validations = validates[fieldname];
                    var checkResult = check($form, $field, validations);
                    if (!checkResult)return false;
                }
            } catch (ex) {
                return false;
            }

            //新增-提交延迟事件
            var deferred_submit = $.Deferred();

            deferred_submit.done(function () {
                if (config.submitType === "ajax") {
                    var $btn = $form.find(':submit').button('loading');
                    var ajaxOption = {
                        "url": config.url
                        , "type": config.type
                        , "data": $form.serialize()
                    };

                    if (config.dataType) {
                        ajaxOption['dataType'] = config.dataType;
                    }
                    var promise = $.ajax(ajaxOption);
                    if (!!promisedFunction) {
                        promisedFunction(promise);
                    }
                    promise.then(function (data) {
                        //response
                        var response = config.response;
                        if (response && response instanceof Function) {
                            var responseFormat = response(data);

                            var dataCallback = responseFormat.data;
                            //数据更新回调
                            dataCallback();
                            //更新分页
                            var _comp_page = config.page;
                            if (_comp_page) {
                                var pageData = responseFormat.pageData;
                                _comp_page.page.data("curpage", pageData["curpage"]);
                                _comp_page.page.data("total", pageData["total"]);
                                _comp_page.page.data("pagesize", pageData["pagesize"]);
                                config.page.createHtml();
                            }
                        }
                    }, function () {
                    }).always(function () {
                        setTimeout(function () {
                            $btn.button("reset")
                        }, 200)
                    });
                } else {
                    //直接提交form，跳过所有验证
                    obj.submit({"skip": true});
                }
            });
            //判断afterValidation
            if ($.isFunction(config.afterValidation)) {
                //option.afterValidation:function(obj,next,back){
                //  next();//通过
                //  back();//不通过
                //}
                config.afterValidation(obj, function () {
                    deferred_submit.resolve();
                }, function () {
                    deferred_submit.reject();
                });
            } else {
                deferred_submit.resolve();
            }
            //始终会return false
            return false;
        });
        $form.data("comp-object", obj);
        return obj;
    },
    "submit": function (submitData) {
        this.form.trigger('submit', submitData);
    },
    "get": function (field_name) {
        return this.form.find("[name=" + field_name + "]");
    }
}

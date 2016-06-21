
/**
     * Created by Administrator on 2016/5/13.
 */
function __GET_BY_KEY(key, _$fragment) {
    return _$fragment.wrap("<div>").parent().find("[key='" + key + "']");
}

function __Exec_Callback(callback) {
    callback();
}
module.exports = {
    init: function(options) {
        var API = options.API || {};
        API.bind(this); /**指定get方法的参数*/
        var Components = options.Components;
        var $fragment = require("./fragment")();
        var namespace = this.namespace = {}; /** 组件对象内存空间 **/
        (function() {
            var obj = {};
            obj.$dom = __GET_BY_KEY("0.0.0", $fragment);
            obj.exec = __Exec_Callback;
            var element = {
                "type": "table",
                "args": "",
                "sub": "",
                "param": {
                    "canSelect": "1",
                    "columns": [{
                        "headText": "姓名1",
                        "response": function anonymous(item, index, $td) {
                            $td.addClass("bg-primary");
                            return item.name;
                        }
                    }, {
                        "headText": "年龄22",
                        "response": function anonymous(item, index, $td /**/ ) {
                            return 123;
                        }
                    }, {
                        "headText": "性别3",
                        "response": function anonymous(item, index, $td /**/ ) {
                            return undefined;
                        }
                    }, {
                        "headText": "生日4",
                        "response": function anonymous(item, index, $td /**/ ) {
                            return 123;
                        }
                    }, {
                        "headText": "操作5",
                        "response": function anonymous(item, index, $td /**/ ) {
                            return undefined;
                        }
                    }]
                },
                "ID": "tableTest"
            };
            obj.exports = {
                "update": function update() {
                    var itemList = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
                    this.table.update(itemList);
                }.bind(obj),
                "getSelectedItem": function getSelectedItem() {}.bind(obj)
            };
            namespace["tableTest"] = obj.exports; /**接口暴露，通过API.get("tableTest")获取*/
            (function() {
                var table = Components.table;
                var columns = element.param.columns;
                var response = {};
                if (element.param.canSelect == "1") {
                    response["columns_x"] = function() {
                        return "<input type='checkbox'>";
                    };
                }
                for (var i = 0, len = columns.length; i < len; i++) {
                    response["columns_" + i] = columns[i].response || "";
                }
                console.log(response);
                obj.table = table.create(obj.$dom.children("table"), {
                    response: response
                });
            })();
        })();
        (function() {
            var obj = {};
            obj.$dom = __GET_BY_KEY("0.0.1", $fragment);
            obj.exec = __Exec_Callback;
            var element = {
                "type": "form",
                "args": "",
                "sub": "",
                "ID": "form1",
                "param": {
                    "url": "a.json",
                    "method": "get",
                    "type": "ajax",
                    "validate": "{\"username\":[{\"rule\":\"require\",\"message\":\"要填写啊亲\"}]}"
                }
            };
            obj.exports = {
                "submit": function submit() {
                    this.form.submit();
                }.bind(obj)
            };
            namespace["form1"] = obj.exports; /**接口暴露，通过API.get("form1")获取*/
            (function() {
                var ep = element.param || {};
                var form = Components.form;
                obj.form = form.create(obj.$dom.find("form"), {
                    url: ep.url,
                    autoCheck: true,
                    submitType: ep.type,
                    validate: function() {
                        return JSON.parse(ep.validate || "{}");
                    }()
                }, function(promise) {
                    promise.done(function(data) {
                        console.log(data);
                    }).always(function(data) {
                        console.log(data);
                    });
                });
            })();
        })();
        (function() {
            var obj = {};
            obj.$dom = __GET_BY_KEY("0.0.1.0", $fragment);
            obj.exec = __Exec_Callback;
            var element = {
                "type": "input",
                "args": "",
                "sub": "",
                "ID": "input2",
                "param": {
                    "label": "用户名",
                    "name": "username"
                }
            };
            obj.exports = {
                "val": function val() {
                    return this.$dom.find('input').val();
                }.bind(obj)
            };
            namespace["input2"] = obj.exports; /**接口暴露，通过API.get("input2")获取*/
        })();
        (function() {
            var obj = {};
            obj.$dom = __GET_BY_KEY("0.1.3.0", $fragment);
            obj.exec = __Exec_Callback;
            var element = {
                "type": "button",
                "args": "",
                "sub": "",
                "ID": "",
                "param": {
                    "text": "提交form啦",
                    "icon": null,
                    "code-onclick": function anonymous() {
                        API.get('form1').submit();
                        API.alert(API.get('input2').val())
                    }
                }
            };
            (function() {
                obj.$dom.on("click", function() {
                    obj.exec(element.param["code-onclick"], API);
                });
            })();
        })();
        (function() {
            var obj = {};
            obj.$dom = __GET_BY_KEY("0.1.4.0", $fragment);
            obj.exec = __Exec_Callback;
            var element = {
                "type": "button",
                "args": "",
                "sub": "",
                "ID": "",
                "param": {
                    "text": "TABLE测试",
                    "icon": null,
                    "code-onclick": function anonymous() {
                        console.log("TABLE测试");
                        API.get("tableTest").update([{
                            name: "jack"
                        }, {}, {}, {}])
                    }
                }
            };
            (function() {
                obj.$dom.on("click", function() {
                    obj.exec(element.param["code-onclick"], API);
                });
            })();
        })();
        return $fragment;
    }
};
            
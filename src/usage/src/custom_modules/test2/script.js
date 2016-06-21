
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
                    "canSelect": true,
                    "columns": [{
                        "headText": "姓名",
                        "response": function response(item, index, $td) {
                            var name = {
                                text: {
                                    "headText": "年龄",
                                    "response": function response(item, index, $td) {
                                        return item["age"];
                                    }
                                }
                            };
                            return item['name'];
                        }
                    }, {
                        "headText": "年龄",
                        "response": function response(item, index, $td) {
                            return item.age;
                        }
                    }, {
                        "headText": "性别",
                        "response": function response(item, index, $td) {
                            return item.gender;
                        }
                    }, {
                        "headText": "生日",
                        "response": function response(item, index, $td) {
                            return item.birthday;
                        }
                    }, {
                        "headText": "操作",
                        "response": function response(item, index, $td) {
                            return '删除-隐藏-关闭';
                        }
                    }]
                }
            };
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
        return $fragment;
    }
};
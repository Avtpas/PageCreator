var jsbeautify = require('js-beautify');
class Compiler {
    constructor(creator) {
        this.creator = creator
        //let API = "1"
        //console.log(API)
    }
    compile() {
        var html = this.renderHTML();
        var js = this.renderJS().join("\r\n");

        localStorage.setItem("Compiled_HTML",html)
        localStorage.setItem("Compiled_JS",jsbeautify.js(js,{preserve_newlines:false}))
        //console.log(html + "\r\n", jsbeautify(js))
    }

    renderHTML() {
        const creator = this.creator;
        let coffee = [
            "fragment = '\r\n"
            ,jsbeautify.html(creator.render(JSON.parse(creator.serialize()), "view").parent().html())
            ,"';\r\n"
            ,"module.exports =()-> $(fragment).clone();"
        ];
        return coffee.join("");
    }

    renderJS() {
        const creator = this.creator;

        var callbacks_string = [];

        let comment = "/**\r\n* Created by Administrator on 2016/5/13.\r\n*/";

        callbacks_string.push(comment);

        //inject __GET_BY_KEY
        callbacks_string.push('function __GET_BY_KEY(key,_$fragment){' +
                                    'return _$fragment.wrap("<div>").parent().find("[key=\'\"+key+\"\']");' +
                            '}');
        //inject _Exec_Callback
        callbacks_string.push('function __Exec_Callback(callback){callback();}');

        callbacks_string.push('module.exports = {');
        callbacks_string.push('     init:function(options){');
        callbacks_string.push('         var API = options.API||{};');
        callbacks_string.push('         API.bind(this);/**指定get方法的参数*/');
        callbacks_string.push('         var Components = options.Components;');
        callbacks_string.push('         var $fragment = require("./fragment")();');
        callbacks_string.push('         var namespace = this.namespace = {};/** 组件对象内存空间 **/');

        //遍历所有task
        (creator.tasks || []).forEach((obj, idx)=> {
            let [option,task] = [obj[0] || {}, obj[1]];

            let element = option.element || {}


            let task_func_string = task instanceof Function?task.toString():"";

            let bool_need = false;

            task_func_string = ((str)=> {
                bool_need = bool_need||(!!str);
                //通过key获取dom方法
                //insert dom definition
                var def_obj  = 'var obj = {};';
                var def_dom  = 'obj.$dom = __GET_BY_KEY("' + option.key + '",$fragment);';
                //insert exec function
                var def_exec = 'obj.exec = __Exec_Callback;';
                //generate event-codes
                var param = option.element.param;
                //事件一律使用code-开头
                for (let pk in param) {
                    if (param.hasOwnProperty(pk) && pk.match(/^code-/)) {
                        let value = param[pk];
                        param[pk] = new Function(value);
                    }
                }

                //insert element definition

                var str_element = JSON.handleJSONFix(option.element);

                var def_element = 'var element = ' + str_element + ';'
                //insert exports definition
                let _self = option.self||{};

                var def_exports = element.ID?'obj.exports = ' + JSON.handleJSONFix(_self.__exports||{},"obj") + ';':"";
                bool_need = bool_need||(!!_self.__exports);
                //register to namespace
                var def_register = element.ID?'namespace["'+ element.ID +'"] = obj.exports;/**接口暴露，通过API.get("'+element.ID+'")获取*/':"";

                //join codes
                str = ["(function(){",
                    def_obj,
                    def_dom,
                    def_exec,
                    def_element,
                    def_exports,
                    def_register,
                    (str?"("+ str+ ")();":""),
                    "})();"].join("\r\n")

                return str
            })(task_func_string);

            if(bool_need)callbacks_string.push(task_func_string);

        });
        callbacks_string.push("         return $fragment;")
        callbacks_string.push("     }");
        callbacks_string.push("};");
        return callbacks_string
    }
}

module.exports = Compiler;




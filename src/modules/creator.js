import alias from './alias'

import {dialog} from '../components/alias'
import API from './API'

class Creator {
    constructor(namespace = {}, view = [], tasks = [], elements = {}) {
        this.elements = alias
        this.API = API.bind(this);
    }

    /**
     * ID注册到namespace，此ID用来做组件的唯一标识，用于组件间通信
     * @param id
     * @param $dom
     * @returns {boolean}
     */
    register(id, $dom) {
        var namespace = this.namespace || {};

        //如果id为空，需要判断是否是需要删除

        var data = $dom.data("data") || {};
        var old = data.ID || "";
        //如果id为空，删除旧的
        //如果旧ID与新ID相同,不管啦
        //如果不同，有几种情况：
        //                  新ID没在namespace里面，直接删除旧ID，保存新ID，并更新data；
        //                  新ID已存在namespace里面，取出对应DOM，删除data，删除对应namespace，删除旧ID,保存新ID

        if (id === "") {
            delete namespace[old];
            data.ID = id;
            namespace[id] = $dom;
        }
        //if (old !== id ||namespace[id]==undefined) {
        //    if (namespace.hasOwnProperty(id)) {
        //        //var f = namespace[id];
        //        //f.removeData("id")
        //        //delete namespace[id];
        //        return false;
        //    }
        delete namespace[old];
        data.ID = id;
        namespace[id] = $dom;
        //}
        this.namespace = namespace;
        return true;
    }

    create($panel) {
        //let dialog = require('dialog');
        $panel.on("dblclick", ".dcr-page-creator-element", function (e) {
            var $this = $(this)
            dialog.confirm("Are you sure you want to delete this components ?", function () {
                $this.remove();
            })
            e.stopPropagation();
        });
        this.view = $panel;
        //return Object.create(this);
    }

    ready(callback) {
        var context = this;
//    //异步化
        var deferred = $.Deferred();
        setTimeout(function () {
            //use(alias_names, function (ele) {
            //    callback(obj, context.view);
            //    context.elements = obj;
            callback(context.elements, context.view)
            deferred.resolve();
            //});
        }, 0)
        return deferred;
    }

    serialize($container) {
        $container = $container || this.view;

        //寻找容器内部的组件
        var _getContainers = function (p_$element) {
            var key = p_$element.attr("key");
            var res = p_$element.find(".dcr-page-creator-container").filter(function (i, n) {
                if ($(this).attr("c-key") === key) {
                    return true;
                }
            });
            return $.map(res, function (n) {
                return [_getElements($(n))]
            })
        };
        //寻找组件内部的容器
        var _getElements = function (p_$container) {
            var $eles = p_$container.children(".dcr-page-creator-element");
            return $.map($eles, function (ele, i) {
                var eleObj = $(ele).data("data");
                eleObj.sub = _getContainers($(ele));
                return eleObj;
            });
        };
        //TODO:这个变动是否可行等待检测
        //var json_str = JSON.stringify(_getElements($container));
        var json_str = JSON.stringifyFix(_getElements($container));
        //以上
        return json_str;
    }

    getElement(ele, show, key) {
        show = show || "edit";
        try {
            var context = this;
            var elements = context.elements;

            //获取正确的class

            let eleClass = new elements[ele.type](ele, context, key)

            //生成相应的dom
            var _$one = context.add(eleClass[show].call(eleClass));

            //将数据保存在DOM数
            var ele_clone = $.extend({}, ele);

            ele_clone.sub = [];
            _$one.data("data", ele_clone);

            //console.log("eleClass.exports",eleClass.exports)
            if (!!ele_clone.ID) {
                if (show === "view") {
                    //暴露接口
                    _$one.data("exports", eleClass.exports)
                }
                //console.log(ele_clone.ID,_$one)
                context.register(ele_clone.ID, _$one)
            }

            //通过json初始化时候，当前级别的key，继承父级key
            //通过单独添加的时候，取当前索引

            var _key = key || (function () {
                    return "0." + context.view.children().size();
                })();

            _$one.attr("key", _key)
                .find(".dcr-page-creator-container").attr("c-key", _key);
            return _$one;
        } catch (e) {
            console.log(e)
            if (show === "edit") {
                return `<div class="text-danger">错误：组件${ele.type} 获取失败</div>`;
            } else {
                return undefined;
            }
        }
    }

    render(config, show) {
        var startTime = new Date();
        var context = this;
        context.json = config
        context.tasks = [];
        var elements = context.elements;
        if (!$.isArray(config))config = [];
        //默认为编辑模式
        show = show || "edit";
        /**
         * 递归遍历配置数据，调取对应模块生成dom
         */
        var analysis = function (items, p_key) {
            var _$dom = $("<div>")
                , _$one = null
                , _key = "";
            //上级未设置认为是root级，默认0
            p_key = p_key || "0";
            [].forEach.call(items || [], function (ele, idx) {
                if (!ele)return false;

                var _key = p_key + "." + idx;
                var _$one = context.getElement(ele, show, _key);

                [].forEach.call(ele.sub || [[]], function (sub_ele, i) {
                    if (sub_ele.length !== 0) {
                        _$one.find(".dcr-page-creator-container")
                            .filter(function (i, n) {
                                if ($(n).attr("c-key") == _key) {
                                    return true;
                                }
                            }).eq(i)
                            .append(analysis(sub_ele, _key));
                    }
                });
                _$dom.append(_$one);
            });
            return _$dom.children();
        };
        var $dom = analysis(config)
        //载入页面
        //context.view.empty().append($dom);

        //计算render时间
        setTimeout(function () {
            console.log("渲染耗时", new Date() - startTime, "ms")
        }, 0)

        //去除用于edit的类
        if (show !== "edit") {
            $dom.find(".delay-unwrap").children().unwrap();
            $dom.find(".dcr-page-creator-container").removeClass("dcr-page-creator-container");
        }
        return $dom;
    }

    add(obj) {
        //是否需要title
        if (!!obj.menu) {
            var $MENU = $('<div class="container-fluid dcr-page-creator-menu">' + obj.title + '</div>')
            obj.$dom.prepend($MENU)
        }
        //判断是否为view，非编辑界面
        if (!obj.isView) {
            obj.$dom.addClass("dcr-page-creator-element");
        }
        var context = this;
        setTimeout(function () {
            $.each((context.tasks || []), function (i, task) {
                if ($.isFunction(task[1])) {
                    task[1](task[0]);
                }
            });
            context.tasks = []
        }, 1);
        return obj.$dom;
    }

    /** 重置界面 */
    refresh(show) {
        var json = JSON.parse(this.serialize())
        this.view.empty().append(
            this.render(
                json, show
            )
        )
    }

    getFields(ele) {
        var context = this;
        var deferred = $.Deferred();
        let obj = new context.elements[ele.type](ele)

        var fn = obj.fields.bind(obj);

        if ($.isFunction(fn)) {
            fn(deferred, ele.param)
        } else {
            setTimeout(function () {
                deferred.resolve("无配置项");
            }, 1);
        }
        return deferred;
    }

    done(task, key) {
        this.tasks = this.tasks || []
        this.tasks.push([key, task]);
    }

    compile() {
        var context = this;
        this.serialize();
        require.ensure(["./Compiler"], function (require) {
            var Compiler = require('./Compiler')
            var compiler = new Compiler(context);
            compiler.compile();
        })
    }
}

export default Creator;

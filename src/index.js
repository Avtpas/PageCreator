//所有组件

//所有页面
'use strict'

let Creator = require('./modules/creator').default

//import jui from 'jquery-ui'

//import dialog from './module/components/dialog/module'

var $view = $("#view");
var $config = $("#config");

let creator = window.creator = new Creator()

creator.create($view);

$(function () {
    'use strict';
    var sortConfig = {
        connectWith: ".dcr-page-creator-container",
        stop: function (event, ui) {
        }
    };

    $("[name=pc-border]").on("change", function () {
        var $this = $(this);
        if ($this.is(":checked")) {
            $view.addClass($this.val())
        } else {
            $view.removeClass($this.val())
        }
    }).last().trigger("click");
    var ready = creator.ready(function (elements, view) {

        $(document).on("click", ".fn-new-comp", function () {
            //获得一个既定义布局
            var $this = $(this);

            var args = (($this.data("args") + "") || "").split(",").map(function (n) {
                return n - 0
            });

            var type = $this.data("type");

            var v = creator.getElement({
                type: type,
                args: args
            });

            view.append(v);

            v.find(".dcr-page-creator-container").sortable(sortConfig).disableSelection();
            return false;
        }).on("click", ".fn-preview", function () {
            //console.log(creator.serialize())
            localStorage.setItem("InitJson","")
            localStorage.setItem("InitJson",creator.serialize())
            window.open("view.html",'view')
            //$("#config").html(creator.serialize())
        }).on("click", ".fn-compile", function () {
            //console.log(creator.serialize())
            creator.compile();
            window.open("stages/show-code.html",'compile')
            //$("#config").html(creator.serialize())
        }).on("click", ".fn-save", function () {
            //处理ID
            var compId = $("#Comp_Id").val();
            var $target = $config.data('target');
            var r = creator.register(compId, $target);
            if (!r) {
                dialog.alert("ID不可用，请更换");
                return false;
            }
            //得到配置数据
            var json = {};
            $("#config").find("[data-name]").each(function () {
                var $this = $(this);
                //如果val没有就从data中寻找，再没有就算了
                json[$this.data("name")] = $this.val()||$this.data("value");
            });

            var data = $target.data("data");
            data.param = json;
        }).on("click", ".fn-refresh", function () {
            creator.refresh("edit");
        });
    });
    //获取初始化数据
    var promise = $.ajax({
        url: "./mock/data-config.json",
        "dataType": "json"
    });
    $.when(promise, ready).done(function (config) {
        creator.view.empty().append(creator.render(config[0], "edit"))
        $(".dcr-page-creator-container").sortable(sortConfig).disableSelection();
    });

    $view.on("click", ".dcr-page-creator-element", function () {
        $view.find(".dcr-page-creator-element.active").removeClass("active")
        var $this = $(this);
        $this.addClass("active");

        $config.data("target", $this);

        var ele = $this.data("data");
        $("#Comp_Id").val(ele.ID);

        creator.getFields(ele).done(function (html) {

            $config.empty().append(html);
        });

        return false;
    });
});
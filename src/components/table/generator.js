'use strict';
const html = require('./generator.es6');
const dialog = require('../dialog/dialog');
/**
 * table配置参数构造器
 * @type {{init: module.exports.init, result: module.exports.result}}
 */
module.exports = {
    init:function(columns){
        var $config_table = $(html.columns(columns));
        var obj = Object.create(this);
        $config_table.on("click","[data-fn=set-column-data]",function(){
            var $this = $(this).siblings(":hidden");
            var $div = $("<div>");
            let g;
            dialog.dialog({
                title:"设置数据源",
                content:$div,
                styles:"modal-lg",
                buttons:[{
                    text:"确定",
                    styles:"btn btn-primary",
                    events:{
                        click:function(d){
                            $this.val(Base64.encode(g.result()));
                            d.close()
                        }
                    }
                }]
            });
            const code = require('../code/code');
            $div.html((g = code.generator(
                Base64.decode($this.val())||"function(){return undefined;}",
                "js"
            )).view);
        });

        obj.view = $config_table;
        return obj;
    },
    result:function(){
        var $view = this.view;
        let columns = $view.find("tbody>tr").map(function(){
            var $tr = $(this);
            let data = {};
            $tr.find(":input[data-name]").each(function(i,n){
                var $meta = $(n);
                var key = $meta.data("name");
                var value = $meta.val();
                var type = $meta.data("type");
                if(type==="function"){
                    if(!!value){
                        value = eval("["+Base64.decode(value)+"]")[0];
                    }else{
                        value = new Function("item","index","$td","return undefined;");
                    }
                }
                data[key] = value;
            })
            return data;
        }).toArray();
        return columns;
    }
};
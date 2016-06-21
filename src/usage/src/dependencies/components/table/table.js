module.exports = {
    "generator": function (columns) {
        let generator = require('./generator')
        return generator.init(columns)
    },
    "create": function ($table, options) {
        var compObject = $table.data("comp-object");
        if (compObject) {
            return compObject;
        }
        var obj = Object.create(this);
        obj.table = $table;
        obj.options = {
            response: {}
        };
        $.extend(true, obj.options, options);

        $table.data("comp-object", obj);
        return obj;
    },
    "update": function (datalist, extraData) {
        if (!datalist || !datalist instanceof Array)return;
        var obj = this;
        var constData = obj.constData || {};

        var len = datalist.length;
        var perdata;
        var response = obj.options.response;
        //分离tbody处理完再放回去
        var $tbody = obj.table.children("tbody").empty().detach();

        if ($tbody.length === 0) {
            $tbody = $("<tbody>");
        }

        var $thead = obj.table.children("thead");
        var $ths = $thead.find("th");

        for (var i = 0; i < len; i++) {
            var $tr = $("<tr>");
            perdata = datalist[i];
            var callback;
            $ths.each(function(i){
                var $td = $("<td>");
                $tr.append($td);
                var _columnName = $(this).data("column");
                callback = response[_columnName];
                if (callback && callback instanceof Function) {
                    $td.append(callback(perdata,  i, $td, extraData));
                }
            })
            $tbody.append($tr);
        }

        if($tbody.is(":empty")){
            $tbody.html(`<tr><td colspan="${$ths.length}" align="center">无数据</td></tr>`)
        }
        obj.table.children("thead:last").after($tbody);
    }
}

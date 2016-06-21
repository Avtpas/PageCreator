module.exports = {
    columns(_columns){
        let columnsConfig = $.map(_columns, function () {
            return `
                 <tr>
                     <td><input type="text" class="form-control" value="${column.headText}"/></td>
                     <td><select class="form-control"></select></td>
                     <td><a class="btn btn-default" data-fn="set-data">设置数据源</a></td>
                     <td><a class="btn btn-link">删除</a><a class="btn btn-link">上移</a><a class="btn btn-link">下移</a></td>
                 </tr>
                 `
        }).toArray().join("");
        return `
            <table class="table">
                <thead>
                    <tr>
                        <th>列头文字</th>
                        <th>对其方式</th>
                        <th>数据源</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${columnsConfig}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="4">
                            <a class="btn btn-link">添加列</a>
                        </td>
                    </tr>
                </tfoot>
            </table>
             `
    },
    config(element = {}){
        let options = element.param || {}

        options.canSelect = options.canSelect == null ? "0" : "1";

        let _columns = Base64.encode(JSON.stringifyFix(options.columns))

        _columns = typeof options.columns === "string" ? options.columns : _columns;

        let config_html = `
            <div class="container-fluid">
                <div class="form-group">
                    <label class="col-xs-3 control-label">提供选择</label>
                    <div class="col-xs-8">
                        <select class="form-control" data-name="canSelect">
                            <option value="1"  >是</option>
                            <option value="0" ${(options.canSelect === "0") ? "selected" : ""} >否</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="container-fluid">
                <div class="form-group">
                    <label class="col-xs-3 control-label">列设置</label>
                    <div class="col-xs-8">
                        <a class="btn btn-info" data-fn="column" data-name="columns" >详细设置</a>
                    </div>
                </div>
            </div>
        <hr/>`
        //类似这种存储对象的时候，需要使用jquery对象传递data-value来取代直接字符串传递
        return $(config_html).find("[data-fn=column]").data("value", options.columns).end()
    },
    html(element = {}){
        let options = element.param || {};
        let t_head = "";
        let colsLength = options.canSelect === "1" ? options.columns.length + 1 : options.columns.length;
        let t_body = `<td colspan="${colsLength}" align="center">无数据</td>`;

        if (options.canSelect === "1") {
            t_head = '<th style="width:1rem" data-column="columns_x"><input title="全选" type="checkbox"></th>'
        }

        (options.columns || []).forEach(function (column, idx) {
            t_head += `<th data-column="${'columns_' + idx}">${column.headText}</th>`
        });
        return `
             <div class="container-fluid">
                 <table class="table table-hover table-condensed table-bordered">
                     <thead>
                        <tr>${t_head}</tr>
                     </thead>
                     <tbody>
                        <tr>${t_body}</tr>
                     </tbody>
                 </table>
             </div>
        `
    }
}
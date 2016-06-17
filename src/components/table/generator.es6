module.exports = {
    columns (_columns){

        let tempTr = (column)=>{
            return `
                <tr>
                   <td><input type="text" data-name="headText" class="form-control" value="${column.headText}"/></td>
                   <td><select class="form-control"></select></td>
                   <td>
                      <a class="btn btn-default" data-fn="set-column-data">设置数据源</a>
                      <input type="hidden" data-name="response" data-type="function" value="${JSON.encodeFunctionFix(column.response||"")}">
                  </td>
                   <td><a class="btn btn-link">删除</a><a class="btn btn-link">上移</a><a class="btn btn-link">下移</a></td>
                </tr>
              `
        };

        let columnsConfig = $.map(_columns, (column, idx)=> {
            return tempTr(column)
        }).join("");
        let html = `
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
                      <a class="btn btn-link" data-fn="add-column">添加列</a>
                    </td>
                  </tr>
                </tfoot>
            </table>
          `;

        let $html = $(html).on("click","a[data-fn=add-column]",()=>{

        });
        $html.find("[data-name=response]").data("value",'');
        return $html
    }
}
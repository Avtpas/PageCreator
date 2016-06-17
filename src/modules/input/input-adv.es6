module.exports = {
    config(element){
        let options = element.param || {};
        let html = `
            <div class="container-fluid">
                <div class="form-group">
                    <label class="col-xs-3 control-label">标签</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" data-name="label" value=${options.label || "文本"} >
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label" >name</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" data-name="name" value=${options.name || ""} >
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label" >placeholder</label>
                    <div class="col-xs-8">
                        <input type="text" class="form-control" data-name="placeholder" value=${options.placeholder || "选择输入"}  >
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-3 control-label">允许手输</label>
                    <div class="col-xs-8">
                        <select class="form-control" data-name="canWrite" >
                            <option value="0">否</option>
                            <option value="1">是</option>
                        </select>
                    </div>
                </div>
            </div>`;
        return $(html)
    },
    html(element){
        let options = element.param || {}
        return `<div class="form-group clearfix">
                    <label class="col-sm-3 control-label">${options.label||"文本"}</label>
                    <div class="col-sm-8">
                        <div class="input-group">
                          <input type="text" class="form-control" name=${options.name||""} placeholder=${options.placeholder||"输入提示"}>
                          <span class="input-group-addon "><span class="glyphicon glyphicon-edit"></span></span>
                        </div>
                    </div>
                </div>`
    }
}
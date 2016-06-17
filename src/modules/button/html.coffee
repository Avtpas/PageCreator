module.exports = {

  config:(element)->
    options = element?.param||{}
    "<div class='container-fluid'>
        <div class='form-group'>
            <label class='col-xs-3 control-label'>文本</label>
            <div class='col-xs-8'>
                <input type='text' class='form-control' data-name='text' value='#{options?.text||"按钮"}'>
            </div>
        </div>
        <div class='form-group'>
            <label class='col-xs-3 control-label'>图标</label>
            <div class='col-xs-8'>
                <select class='form-control' data-name='icon'></select>
            </div>
        </div>
        <div class='form-group'>
            <label class='col-xs-3 control-label'>点击事件</label>
            <div class='col-xs-8'>
                <textarea class='form-control' data-name='code-onclick'>#{options?['code-onclick']||""}</textarea>
            </div>
        </div>
    </div>"

  html:(element)->
    options = element?.param||{}
    "<a class='btn btn-primary'>#{options?.icon or ''}#{options?.text||'按钮'}</a>"

}
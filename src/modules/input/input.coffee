module.exports = {
  config:(element)->
    options = element?.param||{}
    "<div class='container-fluid'>
        <div class='form-group'>
            <label class='col-xs-3 control-label'>标签</label>
            <div class='col-xs-8'>
                <input type='text' class='form-control' data-name='label' value=#{options.label||'文本'} >
            </div>
        </div>
        <div class='form-group'>
            <label class='col-xs-3 control-label' >name</label>
            <div class='col-xs-8'>
                <input type='text' class='form-control' data-name='name' value=#{options.name||''} >
            </div>
        </div>
        <div class='form-group'>
            <label class='col-xs-3 control-label' >placeholder</label>
            <div class='col-xs-8'>
                <input type='text' class='form-control' data-name='placeholder' value=#{options.placeholder||'输入提示'}  >
            </div>
        </div>
    </div>"
  html:(element)->
    options = element?.param||{}
    "<div class='form-group clearfix'>
        <label class='col-sm-3 control-label'>#{options.label||'文本'}</label>
        <div class='col-sm-8'>
            <input type='text' class='form-control' name=#{options.name||''} placeholder=#{options.placeholder||'输入提示'}>
        </div>
    </div>"

}
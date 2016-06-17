module.exports = {
  config:(element)->
      options = element?.param||{}
      "
      <div class='container-fluid'>
        <div class='form-group'>
          <label class='col-xs-3 control-label'>URL</label>
          <div class='col-xs-8'>
            <input type='text' class='form-control' data-name='url' value=#{options.url} >
          </div>
        </div>
        <div class='form-group'>
          <label class='col-xs-3 control-label'>Method</label>
          <div class='col-xs-8'>
            <select class='form-control' data-name='method'>
              <option value='get'  #{if (options.method is 'get') then 'selected' else ""} >GET</option>
              <option value='post' #{if (options.method is 'post') then 'selected' else ""}>POST</option>
            </select>
          </div>
        </div>
        <div class='form-group'>
          <label class='col-xs-3 control-label'>Type</label>
          <div class='col-xs-8'>
            <select class='form-control' data-name='type'>
              <option value='ajax' #{if (options.type is 'ajax') then 'selected' else ""} >AJAX</option>
              <option value='normal' #{if options.type is 'normal' then 'selected' else ""} >NORMAL</option>
            </select>
          </div>
        </div>
        <div class='form-group'>
          <label class='col-xs-3 control-label'>校验规则</label>
          <div class='col-xs-8'>
            <a class='btn btn-info' data-fn='validate'>配置>></a>
            <input type='hidden' data-name='validate' value=#{options.validate} >
          </div>
        </div>
      </div>
    "
}
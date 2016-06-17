module.exports = {

  config:(element={})->
    options = element?.param||{}
    tabConfig = (for tab in options.tabs
      "
      <div class='container-fluid'>
        <div class='form-group'>
          <label class='col-xs-3 control-label'>标签文本</label>
          <div class='col-xs-8'>
            <input type='text' class='form-control' value=\"#{tab.tab or ''}\"/>
          </div>
        </div>
        <div class='form-group'>
          <label class='col-xs-3 control-label'>标签ID</label>
          <div class='col-xs-8'>
            <input type='text' class='form-control' value=\"#{tab.id or ''}\"/>
          </div>
        </div>
        <div class='form-group'>
          <label class='col-xs-3 control-label'></label>
          <div class='col-xs-8'>
            <a class='fn-config-delete-tab btn-link'>删除</a>
          </div>
        </div>
      </div>
      <hr/>"
    ).join("")

    return "#{tabConfig}
      <input type='hidden' data-name='tabs' value=\"#{options.tabs}\"/>
    "

  html:(element={})->
    options = element?.param||{}

    tabs = (for tab in options.tabs
      "<li class=''><a class='tab-nav' href='##{tab.id}'>#{tab.tab}</a></li>"
    ).join("")
    contents = (for tab,i in options.tabs
      "<div class=\"tab-pane #{if options.activeIndex is i then 'active' else ''}\" id='#{tab.id}'>
        <div class='dcr-page-creator-container delay-unwrap'>#{tab.id}</div>
      </div>"
    ).join("")
    return "<div>
      <ul class='nav nav-tabs' >
        #{tabs}
      </ul>
      <!-- Tab panes -->
      <div class='tab-content'>
          #{contents}
      </div>
    </div>"
}
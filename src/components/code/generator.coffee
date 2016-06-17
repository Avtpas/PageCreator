module.exports = {
  html:(options)->
    "<div class='row'>
      <form class='form-horizontal'>
          <div class='col-sm-6'>
            <textarea class='form-control' rows='10'>#{options.code||''}</textarea>
          </div>
          <div class='col-sm-6'>
            <pre class='container-fluid'>
              <code class='#{options.lang}' id='compiled_js'>#{options.code||''}</code>
            </pre>
          </div>
      </form>
    </div>"

}
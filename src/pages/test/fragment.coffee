fragment = '
            <div class="container-fluid" key="0.0">
                <div class="dcr-page-creator-container col-xs-12" c-key="0.0">
                    <div class="clearfix row" key="0.0.0">
                        <form class="form-horizontal">
                            <div class="dcr-page-creator-container container-fluid" c-key="0.0.0">
                                <div class="form-group" key="0.0.0.0"> <label class="col-sm-3 control-label">用户名</label>
                                    <div class="col-sm-8"> <input type="text" class="form-control" placeholder="text" name="username"> </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div><a class="btn btn-primary" key="0.1">提交</a>'

module.exports = document.createDocumentFragment(fragment)
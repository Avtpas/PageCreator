module.exports = {
  base:'
<div class="container-fluid">
      <table class="table table-hover table-condensed table-bordered ui-grid-tree">
        <thead >
            <tr>
                <th style="width:1rem"><input title="全选" type="checkbox"></th>
                <th>树结构</th>
                <th>column1</th>
                <th>column2</th>
                <th>column3</th>
                <th>column4</th>
            </tr>
        </thead>
        <tbody>
        <tr>
            <td><input title="选择" type="checkbox"></td>
            <td><span class="glyphicon glyphicon glyphicon-triangle-bottom text-primary ui-tree-icon"></span>根目录</td>
            <td>content</td>
            <td>content</td>
            <td>content</td>
            <td>content</td>
        </tr>
        <tr>
            <td><input title="选择" type="checkbox"></td>
            <td>
                <span class=" text-primary ui-tree-icon"></span>
                <span class="glyphicon glyphicon glyphicon-triangle-bottom text-primary ui-tree-icon"></span>一级目录
            </td>
            <td>content</td>
            <td>content</td>
            <td>content</td>
            <td>content</td>
        </tr>
        <tr>
            <td><input title="选择" type="checkbox"></td>
            <td>
                <span class=" text-primary ui-tree-icon"></span>
                <span class=" text-primary ui-tree-icon"></span>
                <span class="glyphicon glyphicon glyphicon-triangle-right text-primary ui-tree-icon"></span>二级目录
            </td>
            <td>content</td>
            <td>content</td>
            <td>content</td>
            <td>content</td>
        </tr>
        <tr>
            <td><input title="选择" type="checkbox"></td>
            <td>
                <span class=" text-primary ui-tree-icon"></span>
                <span class=" text-primary ui-tree-icon"></span>
                <span class="glyphicon glyphicon glyphicon-triangle-right text-primary ui-tree-icon"></span>二级目录
            </td>
            <td>content</td>
            <td>content</td>
            <td>content</td>
            <td>content</td>
        </tr>
        <tr>
            <td><input title="选择" type="checkbox"></td>
            <td><span class="glyphicon glyphicon glyphicon-triangle-right text-primary ui-tree-icon"></span>根目录</td>
            <td>content</td>
            <td>content</td>
            <td>content</td>
            <td>content</td>
        </tr>
        <tr>
            <td><input title="选择" type="checkbox"></td>
            <td><span class="glyphicon glyphicon glyphicon-triangle-right text-primary ui-tree-icon"></span>根目录</td>
            <td>content</td>
            <td>content</td>
            <td>content</td>
            <td>content</td>
        </tr><tr>
            <td><input title="选择" type="checkbox"></td>
            <td><span class="glyphicon glyphicon glyphicon-triangle-right text-primary ui-tree-icon"></span>根目录</td>
            <td>content</td>
            <td>content</td>
            <td>content</td>
            <td>content</td>
        </tr>

        </tbody>
    </table>
</div>
'
  config:'<div class="container-fluid">
        <div class="form-group">
            <label class="col-xs-3 control-label">树结构来源</label>
            <div class="col-xs-8">
                <input type="text" class="form-control" data-name="source"/>
            </div>
        </div>
        <div class="form-group">
            <label class="col-xs-3 control-label" >默认展开</label>
            <div class="col-xs-8">
                <select name="radio_grid_tree_config_open" data-name="open" class="form-control">
                    <option value="0">否</option>
                    <option value="1">是</option>
                </select>
            </div>
        </div>
    </div>'
}

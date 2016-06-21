/**
 * Created by Administrator on 2016/5/16.
 */

const Modules = require('./modules/alias');
const Patches = require('./custom_modules/alias');
const Components = require('./dependencies/components/alias');
const API = require('./custom_modules/API');
module.exports = {
    /**
     * 加载模块，页面与脚本自动解析执行
     * @param alia [string] 需要加载的模块名称
     * @param container [string|$_] 模块加载位置
     */
    load: function (alia,container) {
        $(container).html(
            (Patches[alia]||Modules[alia]).init({
                Components,API
            })
        )
    }
};
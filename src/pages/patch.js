/**
 * Created by Administrator on 2016/5/16.
 */

const Patches = {
    test: {script: require('./test/script')}
}
const Components = require('./alias');


module.exports = {
    load: function (patch,container) {
        const options = {Components,container}
        typeof Patches.patch === "function" ? Patches.patch(options) : void 0;
    }
}
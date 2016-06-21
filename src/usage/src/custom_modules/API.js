/**
 * Created by Administrator on 2016/5/18.
 */

var Components = require('../dependencies/components/alias')
module.exports = {
    bind: function(context) {
        this.context = context;
        return this;
    },
    context: undefined,
    get: function(id) {
        return this.context.namespace[id]||{};
    },
    alert:(message)=>{
        let dialog = Components.dialog
        dialog.alert(message)
    }
}
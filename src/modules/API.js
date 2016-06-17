
module.exports = {
    bind: function(context) {
        this.context = context;
        return this;
    },
    context: undefined,
    get: function(name) {
        var module = this.context.namespace[name]
        if (module == void 0) {

        }
        return module.data("exports")||{};
    },
    alert:(message)=>{
        require.ensure(['../components/dialog/dialog'],(require)=>{
            let dialog = require('../components/dialog/dialog')
            dialog.alert(message)
        })
    },
    GET_BY_KEY:(key,fragment)=>{
        fragment = (fragment instanceof HTMLElement) ? fragment:document.body
        return fragment.querySelector("[key="+key+"]")
    }
}
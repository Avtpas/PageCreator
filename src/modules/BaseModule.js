/**
 * 所有组件的基类
 */
class BaseModule {
    constructor() {
        //this.__exp 接口引用,使用实例绑定上下文,不直接使用
        //this.__exports 接口引用，未绑定上下文，不直接使用
        //this.exports 提供设置和获取暴露接口的get、set，
    }

    get exports() {
        return this.__exp;
    }
    set exports(exp_s) {
        var context = this;
        //用于编译时候的原始方法备份，防止编译出[native code]
        var __exports = context.__exports = {};
        var es = this.__exp = exp_s;

        for(var exp in es){
            if(es.hasOwnProperty(exp) && es[exp] instanceof Function){
                __exports[exp] = es[exp];
                es[exp] = es[exp].bind(context)
            }
        }
        return context
    }
    //bindExports(context){
    //    //用于编译时候的原始方法备份，防止编译出[native code]
    //    var __exports = context.__exports = {};
    //    var es = context.exports
    //
    //    for(var exp in es){
    //        if(es.hasOwnProperty(exp)){
    //            __exports[exp] = es[exp];
    //            es[exp] = es[exp].bind(context)
    //        }
    //    }
    //    return context
    //}
    //获取所有可编辑、配置的项，默认写法，可被重写
    superFields() {
        if(!this.element){
            return undefined
        }
        //var param = this.element.param || {}
        var $html;
        if(this.configs instanceof Function){
            $html = $(this.configs(this.element))
        }else{
            $html = $(this.configs)
        }

        //$html.find("[data-name]").each(function (i, n) {
        //    var $this = $(n)
        //    $this.val(param[$this.data("name")]);
        //});
        return $html;
    }

    fields(deferred, param) {
        deferred.resolve(this.superFields())
    }

    config(key, value) {
        var data = this.$dom.data("data")

        if (arguments.length === 1) {
            return data.param[key]
        } else if (arguments.length > 1) {
            return data.param[key] = value;
        }
    }
    exec(code,api){
        try{
            var fun = new Function("api","" +
                "var API = api;"
                +code)
            fun(api)
        }catch(e){
            console.log(e)
        }
    }
}
module.exports = BaseModule

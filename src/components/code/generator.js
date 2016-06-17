'use strict';
let html = require('./generator.coffee')
module.exports = {
    init:function(old_code,lang,comment){
        var $div = $("<div>");

        var $html = $(html.html({
            code:old_code,
            lang
        }));
        var v = old_code;
        let timer;
        $html.find("textarea").val(v)
            .on("input",function(){
                var $this = $(this)
                clearTimeout(timer);
                timer = setTimeout(function(){
                    //var h = Prism.highlight($this.val(),Prism.languages[lang])
                    $html.find("code").text("/**代码预览:*/"+(comment||"")+"\r\n"+$this.val())
                    Prism.highlightAll();
                },100);
            }).trigger("input");


        $div.append($html);

        var obj = Object.create(this);
        obj.view = $div;
        return obj;
    },
    result:function(){
        var $view = this.view;
        return $view.find("textarea").val() //粗糙写法，需要改动
    }
}
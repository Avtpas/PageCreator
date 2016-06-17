//所有组件

//所有页面
'use strict'

let Creator = require('./modules/creator').default;

var $view = $("#view");
var $json = $("#json");
var $show = $("#show");
var $compile = $("#compile");
let creator = window.creator = new Creator();
creator.create($view);
$(function () {
    'use strict';
    $show.on("click",function(){
        creator.view.empty().append(
            creator.render(
                JSON.parse(
                    $json.val()
                ), "view"
            )
        );
    });
    $compile.on("click",function(){
        creator.compile();
    });

    var value = localStorage.getItem("InitJson");
    $json.val(value);
    $show.click();

    window.addEventListener("storage",(e)=>{
        let key = e.key;
        let value = e.newValue;

        if(key==="InitJson" && value!==""){
            $json.val(value);
            creator.render(JSON.parse(value), "view")
        }
    })
});
/**
 * Created by Administrator on 2016/5/16.
 */

require('../../assets/bootstrap/css/bootstrap.min.css');
require('./css/k8ms.css');
require("../../util/router");

$(function(){
    var $menu = $("#menu");
    $menu.on("click",".menuItem>a",function(){
        var $this = $(this);

        var $parent = $this.parent();
        if($this.is(".header")){
            $parent.children(".subMenu").slideToggle()
        }else{
            $(".menuItem").removeClass('active');
            $parent.addClass("active")
                .children(".subMenu").slideToggle()
                .end().parentsUntil("#menu")
                .filter(".menuItem").addClass("active");
        }
        $this.children(".subMenu").slideToggle();
    });
});
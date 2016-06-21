require('bootstrap')
module.exports = {
    "create": function (options) {
        var obj = Object.create(this);
        obj.options = {
            styles: "",
            onOpen: function () {
            },
            onClose: function () {
            }
        };
        $.extend(true, obj.options, options);

        var config = obj.options;

        var $dialog = $('<div>').addClass('modal-content')
            .appendTo($('<div>').addClass('modal-dialog').addClass(config.styles)
                .appendTo($('<div>').addClass('modal fade'))).css("overflow", "hidden");
        var $header = $('<div>').addClass('modal-header')
            .append($('<button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>'))
            .append($('<h4>').html(config.title).addClass('modal-title'));

        var $body = $('<div>').addClass('modal-body').append(config.content);

        var $footer = $('<div>').addClass('modal-footer');

        !(function () {
            $.each(config.buttons || [], function (i, btn) {
                var $btn = $('<button type="button"></button>').addClass(btn.styles).html(btn.text);
                $.each(btn.events || [], function (ei, evt) {
                    $btn.on(ei, function () {
                        evt(obj);
                    });
                });
                $btn.appendTo($footer);
            });
        })();

        var $box = $dialog.parent().parent();

        $dialog.append($header, $body, $footer);

        $('body').append($box);

        obj.dialog = $box;

        if (config.url) {
            $body.html("<p><span class='icon-spinner icon-spin'></span> Loading...</p>").load(config.url, function () {
                if (obj.onOpen && obj.onOpen instanceof Function) {
                    setTimeout(function () {
                        config.onOpen(obj);
                    }, 1)
                }
            })
        } else {
            if (obj.onOpen && obj.onOpen instanceof Function) {
                setTimeout(function () {
                    config.onOpen(obj);
                }, 1)
            }
        }
        $box.data('dialog', obj);
        $box.on('hidden.bs.modal', function () {
            config.onClose(obj);
            $(this).remove();
        });

        return obj;
    },
    "show": function (op) {
        this.dialog.modal(op);
    },
    "close": function (op) {
        var obj = this;
        obj.dialog.modal("hide")
        //delete this;
    },
    "dialog": function (options, modal_options) {
        var dialog = this.create(options);
        // var opt = {}
        // if(options.url){
        // 	opt.remote = options.url
        // }
        dialog.show(modal_options || {});

        return dialog.dialog;
    },
    "alert": function (info, callback) {
        var obj = this;
        var opt = {
            "onClose": function (obj) {
                if (callback && callback instanceof Function) {
                    callback(obj);
                }
            },
            "title": '<span class="glyphicon glyphicon-info-sign"></span>   提示',
            "content": info,
            "styles": "modal-sm",
            buttons: [{
                "text": '<span class="glyphicon glyphicon-ok"></span>   好的',
                "styles": "btn btn-primary",
                "events": {
                    "click": function (_dialog) {
                        if (callback && callback instanceof Function) {
                            callback();
                        }
                        callback = undefined;
                        _dialog.close();
                    }
                }
            }]
        }
        var alert_dialog = obj.create(opt);

        alert_dialog.dialog.find(".modal-header").addClass("bg-primary");

        alert_dialog.show({"backdrop": "static"});

        return alert_dialog.dialog;
    },
    "confirm": function (question, ifyes, ifno) {
        var obj = this;
        var opt = {
            "onClose": function (obj) {
                if (ifno && ifno instanceof Function) {
                    ifno(obj);
                }
            },
            "title": '<span class="glyphicon glyphicon-question-sign"></span>   请确认',
            "content": question,
            "styles": "modal-sm",
            "buttons": [{
                "text": '<span class="glyphicon glyphicon-ok"></span>  确定',
                "styles": "btn btn-primary",
                "events": {
                    "click": function (_dialog) {
                        if (ifyes && ifyes instanceof Function) {
                            ifyes();
                        }
                        _dialog.close();
                    }
                }
            }, {
                "text": '<span class="glyphicon glyphicon-remove"></span>  取消',
                "styles": "btn btn-danger",
                "events": {
                    "click": function (_dialog) {
                        if (ifno && ifno instanceof Function) {
                            ifno();
                        }
                        ifno = undefined;
                        _dialog.close();
                    }
                }
            }]
        }
        var confirm_dialog = obj.create(opt);

        confirm_dialog.dialog.find(".modal-header").addClass("bg-info");

        confirm_dialog.show({"backdrop": "static"});

        return confirm_dialog.dialog;
    }
};

var totFunc = function (value, param, first, callback) {
    var rs;
    rs = [].reduce.call(param, function (memo, crs) {
        if (typeof crs === "string") {
            var func = ruleMap[crs];
            if (func) {
                return callback(func(value), memo);
            }
        } else if (typeof crs === "object") {
            if (!!crs.rule) {
                var func = ruleMap[crs.rule];
                if (func) {
                    return callback(func(value, crs.param), memo);
                }
            } else if (!!crs.regexp) {
                var r = new RegExp(crs.regexp);
                return callback(r.test(value) || false, memo);
            } else {
                return false;
            }
        } else if (typeof crs === "function") {
            return callback(crs(value || ""), memo);
        }
        return false;
    }, first)
    return rs;
}
var ruleMap = {
    //必填校验
    "require": function (value) {
        if (!value)return false;
        return ("" + value).length !== 0;
    },
    //数字最小值
    "min": function (value, param) {
        value = value - 0;
        param = param || [0];
        var min = param[0];
        if (value > min)return true;
        return false;
    },
    //数字最小值
    "max": function (value, param) {
        value = value - 0;
        param = param || [0];
        var max = param[0];
        if (value < max)return true;
        return false;
    },
    "maxmin": function (value, param) {
        value = value - 0;
        param = param || [0, 0];
        return ruleMap["max"](value, [param[0]]) && ruleMap["min"](value, [param[1]])
    },
    //邮政编码
    "zipCode": function (value) {
        return ruleMap["range"](value, [6, 6]) && ruleMap["int"](value)
    },
    //非0开头的整数
    "int": function (value) {
        var reg = /^(-?[1-9]\d*|0)$/;
        return reg.test(value);
    },
    //非0开头的小数
    "float": function (value) {
        var reg = /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/;
        return reg.test(value);
    },
    //长度范围校验
    "range": function (value, param) {
        param = param || [0, 0];
        var min = param[0],
            max = param[1],
            len = ("" + value).length;
        if (len >= min && len <= max) {
            return true;
        } else {
            return false;
        }
    },
    //固话
    "phone": function (value) {
        var reg = /^(0\d{2,3})?-?\d{5,8}$/;
        return reg.test(value)
    },
    //手机
    "mobile": function (value) {
        var reg = /^(1)\d{10}$/i;
        return reg.test(value)
    },
    //email:todo
    "email": function (value) {
        var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        var rs = reg.test(value);
        return rs;
    },
    //equals:todo
    "equals": function (value, param) {
        param = param || [false];
        return param[0] === value;
    },
    //是否为NaN：todo
    "isNaN": function (value) {
        return isNaN(value);
    },
    //聚合校验函数：与
    "AND": function (value, param) {
        return totFunc(value, param, true, function (a, b) {
            return a && b;
        })
    },
    //聚合校验函数：或
    "OR": function (value, param) {
        return totFunc(value, param, false, function (a, b) {
            return a || b;
        })
    },
    //聚合校验函数：非，若多条会自动ALL聚合
    "NOT": function (value, param) {
        return totFunc(value, param, false, function (a, b) {
            return !a;
        })
    },
    "NO": function () {
        return true;
    }
}
module.exports = {
    "generator": function (old) {
        let generator = require('./generator')
        return generator.init(old)
    },
    "check": function (value, rule_list) {
        try {
            var input_value = value;

            var len = rule_list.length;
            for (var i = 0; i < len; i++) {
                var rule = rule_list[i];
                var handler = ruleMap[rule.rule];
                var rs = false;
                //优先判断rule,若未匹配则使用正则，若出现错误则报未通过

                if (handler) {
                    rs = handler(input_value, rule.param);

                } else {
                    var reg = rule.regexp;
                    if (reg) {
                        var r = new RegExp(reg);
                        rs = r.test(input_value);
                    }
                }

                //如果未通过直接停止继续校验，返回错误信息
                if (!rs) {
                    return {
                        "result": false,
                        "message": rule.message
                    }
                } else {
                    //console.log($input_field.attr("name"),"校验正确")
                }
            }
        } catch (e) {
            return {
                "result": false,
                "message": "未知错误"
            }
        }
        return {
            "result": true,
            "message": "填写正确"
        }
    }
}

/**
 * Created by Administrator on 2016/5/13.
 */

const [PREFIX,SUFFIX] = ["__JSON_FUN_PREFIX__", "__JSON_FUN_SUFFIX__"];
const [DQ_FIX,SQ_FIX,DQ_FM_FIX,SQ_FM_FIX] = ["__JSON_DQ_FIX__", "__JSON_SQ_FIX__", "__JSON_DQ_FM_FIX__", "__JSON_SQ_FM_FIX__"];

const Reg_Fun_Prefix = new RegExp('"' + PREFIX, 'g');
const Reg_Fun_Suffix = new RegExp(SUFFIX + '"', 'g');

const Reg_DQ_FIX = new RegExp(DQ_FIX, "g");
const Reg_SQ_FIX = new RegExp(SQ_FIX, 'g');
const Reg_DQ_FM_FIX = new RegExp(DQ_FM_FIX, "g");
const Reg_SQ_FM_FIX = new RegExp(SQ_FM_FIX, 'g');

JSON.handleJSONFix = function (obj, context, ignoreList = ['args', 'sub']) {

    return JSON.stringify(obj, function (key, value) {
        if (typeof value === 'function') {
            return PREFIX +
                (function () {
                    return value.toString()
                            //格式化(\")
                            .replace(new RegExp('\\\\"', "g"), DQ_FM_FIX)
                            //格式化(\')
                            .replace(new RegExp("\\\\'", "g"), SQ_FM_FIX)
                            //格式化双引号
                            .replace(new RegExp('"', "g"), DQ_FIX)
                            //格式化单引号
                            .replace(new RegExp("'", "g"), SQ_FIX)
                            //去除换行符、制表符
                            .replace(new RegExp("\n|\t", "g"), "")
                            //根据需要bind函数执行上下文
                        + (context ? ".bind(" + context + ")" : "")
                })()
                    //函数格式化收尾正则
                + SUFFIX;
        }
        if (ignoreList.indexOf(key) >= 0) {
            return "";
        }

        return value;
    }).replace(Reg_Fun_Prefix, "")
        .replace(Reg_Fun_Suffix, "")
        .replace(Reg_DQ_FM_FIX, '\\"')
        .replace(Reg_SQ_FM_FIX, "\\'")
        .replace(Reg_DQ_FIX, '"')
        .replace(Reg_SQ_FIX, "'")
}

/**
 *
 * @param func 需要编码的函数
 * @param context 需要给函数绑定的上下文
 * @returns {string} 被格式化的字符
 */
JSON.encodeFunctionFix = function (func, context) {
    return Base64.encode(
        func.toString()
        + (context ? ".bind(" + context + ")" : "")
    )
}

JSON.stringifyFix = function (_obj) {
    return JSON.stringify(_obj, function (key, value) {
        if (value instanceof Function) {
            return PREFIX +
                (function () {
                    return value.toString()
                        //格式化(\")
                        .replace(new RegExp('\\\\"', "g"), DQ_FM_FIX)
                        //格式化(\')
                        .replace(new RegExp("\\\\'", "g"), SQ_FM_FIX)
                        //格式化双引号
                        .replace(new RegExp('"', "g"), DQ_FIX)
                        //格式化单引号
                        .replace(new RegExp("'", "g"), SQ_FIX)
                        //去除换行符、制表符
                        .replace(new RegExp("\n|\t", "g"), "")
                })()
                    //函数格式化收尾正则
                + SUFFIX;
        } else {
            return value
        }
    })
}
JSON.parseFix = function (_string) {
    return JSON.parse(_string, function (key, value) {
        if (typeof value === 'string') {

            if(!new RegExp("^("+PREFIX+").*("+SUFFIX+")$").test(value)){
                return value
            }
            value = value.replace(new RegExp(PREFIX, 'g'), "")
                .replace(new RegExp(SUFFIX, 'g'), "")
                .replace(Reg_DQ_FM_FIX, '\\"')
                .replace(Reg_SQ_FM_FIX, "\\'")
                .replace(Reg_DQ_FIX, '"')
                .replace(Reg_SQ_FIX, "'");
            return eval("(" + value + ")");
        } else {
            return value
        }
    })
}
JSON.fix = function(arg){
    if(typeof arg === 'object'){
        return JSON.parseFix(JSON.stringifyFix(arg));
    }else{
        return arg;
    }
}
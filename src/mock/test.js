/**
 * Created by Administrator on 2016/6/3.
 */
var a = [{
    "headText": "姓名", "response": function response(item, index, $td) {
        var name = {
            text: {
                "headText": "年龄", "response": function response(item, index, $td) {
                    return item["age"];
                }
            }
        };
        return item['name'];
    }
}, {
    "headText": "年龄", "response": function response(item, index, $td) {
        return item.age;
    }
}, {
    "headText": "性别", "response": function response(item, index, $td) {
        return item.gender;
    }
}, {
    "headText": "生日", "response": function response(item, index, $td) {
        return item.birthday;
    }
}, {
    "headText": "操作", "response": function response(item, index, $td) {
        return '删除-隐藏-关闭';
    }
}]
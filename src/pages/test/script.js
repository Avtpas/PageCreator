var a = [{
    "response": function response(item, index, $td) {
        var name = {
            text: {
                "headText": "年龄", "response": function response(item, index, $td) {
                    return item["age"];
                }
            }
        };
        return item['name'];
    }
}]
/**
     提炼出Priority类后，我发觉现在Order类上的取值函数命名有点儿误导人了。它确实还是返回了
 优先级信息，但却是一个字符串描述，而不是一个Priority对象。
 于是我立即对它应用了函数改名（124）。

    这里设值函数的名字倒没有使我不满，因为函数的参数能够清晰地表达其意图。

    到此为止，正式的重构手法就结束了。不过当我进一步查看优先级字段的客户端时，我在想让它们直接使
 用Priority对象是否会更好。于是，我着手在订单类上添加一个取值函数，让它直接返回新建的Priority
 对象。
 **/
class Order {
    constructor(data) {
        this._priority = data.priority;
    }
    get priorityString(){
        return this._priority.toString();
    }
    set priority(aString){
         this._priority = new Priority(aString);
    }
}

class Priority {
    constructor(value) {
        this._value = value;
    }
    toString() {
        return this._value;
    }
}


//客户端...
let orders = new Order(data);
highPriorityCount = orders.filter(
    o => "high" === o.priorityString || "rush" === o.priorityString
).length;






















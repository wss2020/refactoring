
/**
    到此为止，正式的重构手法就结束了。不过当我进一步查看优先级字段的客户端时，我在想让它们直接使
 用Priority对象是否会更好。于是，我着手在订单类上添加一个取值函数，让它直接返回新建的Priority
 对象。
 **/
/**
    随着Priority对象在别处也有了用处，我开始支持让Order类的客户端拿着Priority实例
 来调用设值函数，这可以通过调整Priority类的构造函数实现。
 */
class Order {
    constructor(data) {
        this.priority = data.priority;
    }
    get priority() {
        return this._priority;
    }
    get priorityString() {
        return this._priority.toString();
    }
    set priority(aString) {
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
    o => "high" === o.priority.toString()
        || "rush" === o.priority.toString()
).length;





















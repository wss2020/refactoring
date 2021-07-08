/**
 随着Priority对象在别处也有了用处，我开始支持让Order类的客户端拿着Priority实例来调用设值
 函数，这可以通过调整Priority类的构造函数实现。
 这样做的意义在于，现在新的Priority类可以容纳更多业务行为——无论是新的业务代码，还是从别处
 搬移过来的。这里有些例子，它会校验优先级的传入值，支持一些比较逻辑。

 修改的过程中，我发觉它实际上已经担负起值对象（value object）的角色， 因此我又为它添加了一个equals方法，
 并确保它的值不可修改。
 加上这些行为后，我可以让客户端代码读起来含义更清晰。
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
        if (value instanceof Priority) return value;
        if (value instanceof Priority) return value;
        if (Priority.legalValues().includes(value))
            this._value = value;
        else
            throw new Error(`<${value}> is invalid for Priority`);
    }

    toString() {
        return this._value;
    }

    get _index() {
        return Priority.legalValues().findIndex(s => s === this._value);
    }

    static legalValues() {
        return ['low', 'normal', 'high', 'rush'];
    }

    equals(other) {
        return this._index === other._index;
    }

    higherThan(other) {
        return this._index > other._index;
    }

    lowerThan(other) {
        return this._index < other._index;
    }
}

//客户端...
let orders = new Order(data);
highPriorityCount = orders.filter(
    o => o.priority.higherThan(new Priority("normal"))
).length;




















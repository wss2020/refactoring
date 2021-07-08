// 无论何时，当我与一个数据值打交道时，第一件事一定是对它使用封装变量（132）。
class Order {
    constructor(data) {
        this._priority = data.priority;
        // ...
    }

    get priority() {
        return this._priority;
    }

    set priority(aString) {
        this._priority = aString;
    }
}

/**
 现在构造函数中第一行初始化代码就会使用我刚刚创建的设值函数了。
 这使它成了一个自封装的字段，因此我暂可放任原来的引用点不理，先对字段进行处理。
 接下来我为优先级字段创建一个简单的值类（value class）。该类应该有一个构造函数接收值字段，并提供一个
 返回字符串的转换函数。
 */
class Priority {
    constructor(value) {
        this._value = value;
    }

    toString() {
        return this._value;
    }
}

/**
 这里的转换函数我更倾向于使用toString而不用取值函数（value）。对类的客户端而言，一个返回字符串描述的API
 应该更能传达“发生了数据转换”的信息，而使用取值函数取用一个字段就缺乏这方面的感觉。

 然后我要修改访问函数，使其用上新创建的类。
 */

let data = new Order({ priority: 123 });
console.log(data);
console.log(data._priority);
console.log(data.priority);


































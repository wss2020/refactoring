/**
 范例
    我将从一个简单的订单（Order）类开始。该类从一个简单的记录结构里读取所需的数据，这其中有一个订单优先级（priority）字段，
 它是以字符串的形式被读入的。
 */
class Order {
    constructor(data) {
        this._priority = data.priority;
        // ...
    }
}

//客户端代码有些地方是这么用它的：
let orders = new Order(data);
let highPriorityCount = orders.filter(
    o => "high" === o.priority || "rush" === o.priority
).length;


// 无论何时，当我与一个数据值打交道时，第一件事一定是对它使用封装变量（132）。





























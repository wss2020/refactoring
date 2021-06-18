/**
    我将从一个代表“订单”的Order类开始，其实例对象可从一个JSON文件创建。
    用来创建订单的数据中有一个顾客（customer）ID，我们用它来进一步创建Customer对象。
 */
class Order {
    constructor(data) {
        this._number = data.number;
        this._customer = new Customer(data.customer); // load other data
    }
    get customer() {
        return this._customer;
    }
}

class Customer {
    constructor(id) {
        this._id = id;
    }
    get id() {
        return this._id;
    }
}

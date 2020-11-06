// 下面是同样的代码，但这次它位于一个类中：
class Order {
    constructor(aRecord) {
        this._data = aRecord;
    }
    get quantity() {
        return this._data.quantity;
    }
    get itemPrice() {
        return this._data.itemPrice;
    }
    get price() {
        return this.quantity * this.itemPrice -
            Math.max(0, this.quantity - 500) * this.itemPrice * 0.05 + Math.min(this.quantity * this.itemPrice * 0.1, 100);
    }
}


/**
    我要提炼的还是同样的变量，但我意识到：这些变量名所代表的概念，适用于整个Order类，
 而不仅仅是“计算价格”的上下文。既然如此，我更愿意将它们提炼成方法，而不是变量。
 */

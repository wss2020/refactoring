//接下来我对discountFactor重复同样的步骤，先是应用提炼函数（106）。
class Order {
    constructor(quantity, item) {
        this._quantity = quantity;
        this._item = item;
    }
    get price() {
        const discountFactor = this.discountFactor;
        return this.basePrice * discountFactor;
    }
    get discountFactor() {
        let discountFactor = 0.98;
        if (this.basePrice > 1000) discountFactor -= 0.03;
        return discountFactor;
    }
    get basePrice() {
        return this._quantity * this._item.price;
    }
}

/**
    这里我需要将对discountFactor的两处赋值一起搬移到新提炼的函数中，之后就可以将原变量一起声明为const。
然后，内联变量：
*/

// get price() {
//     return this.basePrice * this.discountFactor;
// }


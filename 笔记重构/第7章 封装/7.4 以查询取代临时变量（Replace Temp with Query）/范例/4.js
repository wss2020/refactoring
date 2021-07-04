//测试，然后应用内联变量（123）。
class Order {
    constructor(quantity, item) {
        this._quantity = quantity;
        this._item = item;
    }

    get price() {
        const basePrice = this.basePrice;
        let discountFactor = 0.98;
        if (this.basePrice > 1000) discountFactor -= 0.03;
        return this.basePrice * discountFactor;
    }

    get basePrice() {
        return this._quantity * this._item.price;
    }
}

//接下来我对discountFactor重复同样的步骤，先是应用提炼函数（106）。

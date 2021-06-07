/**
 * 我想要将折扣率（discountRate）字段从Customer类中搬移到CustomerContract里中。
 * 第一件事情是先用封装变量（132）将对_discountRate字段的访问封装起来。
 */
class Customer {
    constructor(name, discountRate) {
        this._name = name;
        this._setDiscountRate(discountRate);
        this._contract = new CustomerContract(dateToday());
    }

    get discountRate() {
        return this._discountRate;
    }

    _setDiscountRate(aNumber) {
        this._discountRate = aNumber;
    }

    becomePreferred() {
        this._setDiscountRate(this.discountRate + 0.03); // other nice things
    }

    applyDiscount(amount) {
        return amount.subtract(amount.multiply(this.discountRate));
    }
}

class CustomerContract {
    constructor(startDate) {
        this._startDate = startDate;
    }
}


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


/**
    我通过定制的applyDiscount方法来更新字段，而不是使用通常的设值函数，这是因为我不想为字段暴露一个public的设值函数。接着我在
CustomerContract中添加一个对应的字段和访问函数。
 */
class CustomerContract {
    constructor(startDate, discountRate) {
        this._startDate = startDate;
        this._discountRate = discountRate;
    }
    get discountRate() {
        return this._discountRate;
    }
    set discountRate(arg) {
        this._discountRate = arg;
    }
}



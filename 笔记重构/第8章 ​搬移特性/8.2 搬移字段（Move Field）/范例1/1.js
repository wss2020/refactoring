/**
 * contract   合同
 * 我将用下面这个例子来介绍这项手法，其中Customer类代表了一位“顾客”，CustomerContract代表与顾客关联的一个“合同”。
 */
class Customer {
    constructor(name, discountRate) {
        this._name = name;
        this._discountRate = discountRate;
        this._contract = new CustomerContract(dateToday());
    }
    get discountRate() {
        return this._discountRate;
    }
    becomePreferred() {
        this._discountRate += 0.03; // other nice things
    }
    applyDiscount(amount) {
        return amount.subtract(amount.multiply(this._discountRate));
    }
}

class CustomerContract {
    constructor(startDate) {
        this._startDate = startDate;
    }
}

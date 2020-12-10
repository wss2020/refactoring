function acquireReading(){
    return  {customer: "ivan", quantity: 10, month: 5, year: 2017};
}

//客户端2...
const aReading2 = acquireReading();
const base = (baseRate(aReading2.month, aReading2.year) * aReading2.quantity);
const taxableCharge = Math.max(0, base - taxThreshold(aReading2.year));

class Reading {
    constructor(data) {
        this._customer = data.customer;
        this._quantity = data.quantity;
        this._month = data.month;
        this._year = data.year;
    }
    get customer() {
        return this._customer;
    }
    get quantity() {
        return this._quantity;
    }
    get month() {
        return this._month;
    }
    get year() {
        return this._year;
    }
    get baseCharge() {
        return baseRate(this.month, this.year) * this.quantity;
    }
}

// 客户端3...
const rawReading3 = acquireReading();
const aReading = new Reading(rawReading3);
const basicChargeAmount = aReading.baseCharge;


/**
   用这个名字，Reading类的客户端将不知道baseCharge究竟是一个字段还是推演计算出的值。
   这是好事，它符合“统一访问原则”（Uniform Access Principle）[mf-ua]。
     现在我可以修改 客户端1 的代码，令其调用新的方法，不要重复计算基础费用。
 */
//客户端1...
const rawReading1 = acquireReading();
const aReading = new Reading(rawReading1);
const baseCharge = aReading.baseCharge;

/**
    很有可能我会顺手用内联变量（123）把baseCharge变量给去掉。
    不过，我们当下介绍的重构手法更关心“计算应税费用”的逻辑。同样，我先将那里的 客户端代码改为使用新建的baseCharge属性。
*/

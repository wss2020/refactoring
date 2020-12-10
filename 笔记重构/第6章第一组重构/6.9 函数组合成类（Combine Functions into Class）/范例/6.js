function taxThreshold(year){}
function acquireReading(){
    return  {customer: "ivan", quantity: 10, month: 5, year: 2017};
}

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

//客户端1...
const rawReading1 = acquireReading();
const aReading = new Reading(rawReading1);
const baseCharge = aReading.baseCharge;

/**
    很有可能我会顺手用内联变量（123）把baseCharge变量给去掉。
    不过，我们当下介绍的重构手法更关心“计算应税费用”的逻辑。同样，我先将那里的 客户端2 代码改为使用新建的baseCharge属性。
*/

//客户端2...
const rawReading2 = acquireReading();
const aReading = new Reading(rawReading2);
const taxableCharge = Math.max(0, aReading.baseCharge - taxThreshold(aReading2.year));


/** 运用提炼函数（106）将计算应税费用（taxable charge）的逻辑提炼成函数： */





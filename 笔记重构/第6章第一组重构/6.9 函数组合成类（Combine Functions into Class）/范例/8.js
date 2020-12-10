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
    get taxableChargeFn() {
        return Math.max(0, this.baseCharge - taxThreshold(this.year));
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


//客户端2...
const rawReading2 = acquireReading();
const aReading = new Reading(rawReading2);
const taxableCharge = aReading.taxableChargeFn;


/**
    由于所有派生数据都是在使用时计算得出的，所以对存储下来的读数进行修改也没问题。
    一般而论，我更倾向于使用不可变的数据；
    但很多时候我们必须得使用可变数据（比如JavaScript整个语言生态在设计时就没有考虑数据的不可变性）。
    如果数据确有可能被更新，那么用类将其封装起来会很有帮助。
 */



reading = {customer: "ivan", quantity: 10, month: 5, year: 2017};

// 客户端1...
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;

//客户端2...
const aReading = acquireReading();
const base = (baseRate(aReading.month, aReading.year) * aReading.quantity);
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));

//客户端3...
const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);
function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
}





// 重构
// 自己写的，不知道实际情况，就是有，也可以移动到类中
function  baseRate() {}
function taxThreshold(){}

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
        // get calculateBaseCharge() {
        return baseRate(this.month, this.year) * this.quantity;
    }
    get taxableCharge() {
        return Math.max(0, this.baseCharge - taxThreshold(this.year));
    }
}

//客户端1...
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const baseCharge = aReading.baseCharge;

//客户端2...
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const taxableCharge = aReading.taxableCharge;

//客户端3...
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const basicChargeAmount = aReading.baseCharge;






































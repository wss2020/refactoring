function acquireReading(){
    return  {customer: "ivan", quantity: 10, month: 5, year: 2017};
}

// 客户端1...
const aReading1 = acquireReading();
const baseCharge = baseRate(aReading1.month, aReading1.year) * aReading1.quantity;

//客户端2...
const aReading2 = acquireReading();
const base = (baseRate(aReading2.month, aReading2.year) * aReading2.quantity);
const taxableCharge = Math.max(0, base - taxThreshold(aReading2.year));


/**  然后我用搬移函数（198）把calculateBaseCharge搬到新类中。  */
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
    get calculateBaseCharge() {
        return baseRate(this.month, this.year) * this.quantity;
    }
}

// 客户端3...
const rawReading3 = acquireReading();
const aReading = new Reading(rawReading3);
const basicChargeAmount = aReading.calculateBaseCharge;


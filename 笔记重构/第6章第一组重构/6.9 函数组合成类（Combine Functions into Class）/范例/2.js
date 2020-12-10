function taxThreshold(year){}
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


/**
    看到这里，我有一种自然的冲动，想把前面两处客户端代码都改为使用这个函数。
 但这样一个顶层函数的问题在于，它通常位于一个文件中，读者不一定能想到来这里寻找它。
 我更愿意对代码多做些修改，让该函数与其处理的数据在空间上有更紧密的联系。为此目的，不妨把数据本身变成一个类。
 我可以运用封装记录（162）将记录变成类。
 */
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
}

/**
 首先，我想把手上已有的函数calculateBaseCharge搬到新建的Reading类中。
 一得到原始的读数数据，我就用Reading类将它包装起来，然后就可以在函数中使用Reading类了。
 */
// 客户端3...
const rawReading3 = acquireReading();
const aReading = new Reading(rawReading3);
const basicChargeAmount = calculateBaseCharge(aReading);
function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
}


/**
 * 然后我用搬移函数（198）把calculateBaseCharge搬到新类中。
 */

/*
范例
   在我长大的国度，茶是生活中的重要部分，以至于我想象了这样一种特别的公共设施，专门给老百姓供应茶水。
   每个月，从这个设备上可以得到读数（reading），从而知道每位顾客取用了多少茶。
*/

reading = {customer: "ivan", quantity: 10, month: 5, year: 2017};

//客户端1...
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




//重构后
function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
}
function enrichReading(original) {
    const result = _.cloneDeep(original);
    result.baseCharge = calculateBaseCharge(result);
    result.taxableCharge = Math.max(0, result.baseCharge - taxThreshold(result.year));
    return result;
}

//客户端1...
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const baseCharge = aReading.baseCharge;

//客户端2...
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const taxableCharge = aReading.taxableCharge;

//客户端3...
const rawReading = acquireReading();
const basicChargeAmount = enrichReading(rawReading).baseCharge;





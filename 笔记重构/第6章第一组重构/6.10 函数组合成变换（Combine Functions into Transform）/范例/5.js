function taxThreshold(year){}
function acquireReading(){
    return  {customer: "ivan", quantity: 10, month: 5, year: 2017};
}


//客户端2...
const aReading = acquireReading();
const base = (baseRate(aReading.month, aReading.year) * aReading.quantity);
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));

function enrichReading(original) {
    const result = _.cloneDeep(original);
    result.baseCharge = calculateBaseCharge(result);
    return result;
}

//客户端3...
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const basicChargeAmount = aReading.baseCharge;


it('check reading unchanged', function() {
    const baseReading = {customer: "ivan", quantity: 15, month: 5, year: 2017};
    const oracle = _.cloneDeep(baseReading);
    enrichReading(baseReading);
    assert.deepEqual(baseReading, oracle);
});


//现在我可以修改客户端1的代码，让它也使用这个新添的字段。
//客户端1...
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const baseCharge = aReading.baseCharge;


// 客户端2
// 此时可以考虑用内联变量（123）去掉baseCharge变量。
// 现在我转头去看“计算应税费用”的逻辑。第一步是把变换函数用起来：




































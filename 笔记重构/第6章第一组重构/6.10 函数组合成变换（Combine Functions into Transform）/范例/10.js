function taxThreshold(year){}
function acquireReading(){
    return  {customer: "ivan", quantity: 10, month: 5, year: 2017};
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


//客户端1...
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const baseCharge = aReading.baseCharge;


//然后把计算逻辑搬移到变换函数中：
function enrichReading(original) {
    const result = _.cloneDeep(original);
    result.baseCharge = calculateBaseCharge(result);
    result.taxableCharge = Math.max(0, result.baseCharge - taxThreshold(result.year));
    return result;
}


// 客户端2
//修改使用方代码，让它使用新添的字段。
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const taxableCharge = aReading.taxableCharge;

//测试。现在我可以再次用内联变量（123）把taxableCharge变量也去掉。

/*
   增强后的读数记录有一个大问题：如果某个客户端修改了一项数据的值，会发生什么？
   比如说，如果某处代码修改了quantity字段的值，就会导致数据不一致。
   在JavaScript中，避免这种情况最好的办法是不要使用本重构手法，改用函数组合成类（144）。
   如果编程语言支持不可变的数据结构，那么就没有这个问题了，那样的语言中会更常用到变换。
   但即便编程语言不支持数据结构不可变，如果数据是在只读的上下文中被使用（例如在网页上显示派生数据），还是可以使用变换。
 */

















































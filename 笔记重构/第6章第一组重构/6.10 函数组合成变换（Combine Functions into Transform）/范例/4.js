function taxThreshold(year){}
function acquireReading(){
    return  {customer: "ivan", quantity: 10, month: 5, year: 2017};
}

//客户端1...
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;

//客户端2...
const aReading = acquireReading();
const base = (baseRate(aReading.month, aReading.year) * aReading.quantity);
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));



/**
    在变换函数内部，我乐得直接修改结果对象，而不是每次都复制一个新对象。
    我喜欢不可变的数据，但在大部分编程语言中，保持数据完全不可变很困难。
    在程序模块的边界处，我做好了心理准备，多花些精力来支持不可变性。
    但在较小的范围内，我可以接受可变的数据。
    另外，我把这里用到的变量命名为aReading，表示它是一个累积变量（accumulating variable）。
    这样当我把更多的逻辑搬移到变换函数enrichReading中时，这个变量名也仍然适用。

    修改客户端代码，令其改用增强后的字段：
 */
function enrichReading(original) {
    const result = _.cloneDeep(original);
    result.baseCharge = calculateBaseCharge(result);
    return result;
}

//客户端3...
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const basicChargeAmount = aReading.baseCharge;


/**
   当所有调用calculateBaseCharge的地方都修改完成后，就可以把这个函数内嵌到enrichReading函数中，
     从而更清楚地表明态度：如果需要“计算基本费用”的逻辑，请使用增强后的记录。

   在这里要当心一个陷阱：在编写enrichReading函数时，我让它返回了增强后的读数记录，
     这背后隐含的意思是原始的读数记录不会被修改。所以我最好为此加个测试。
 */

it('check reading unchanged', function() {
    const baseReading = {customer: "ivan", quantity: 15, month: 5, year: 2017};
    const oracle = _.cloneDeep(baseReading);
    enrichReading(baseReading);
    assert.deepEqual(baseReading, oracle);
});


//现在我可以修改客户端1的代码，让它也使用这个新添的字段。











































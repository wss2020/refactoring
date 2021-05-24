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
   我用了Lodash库的cloneDeep函数来进行深复制。
      这个变换函数返回的本质上仍是原来的对象，只是添加了更多的信息在上面。
   对于这种函数，我喜欢用“enrich”（增强）这个词来给它命名。
   如果它生成的是跟原来完全不同的对象，我就会用“transform”（变换）来命名它。

   然后我挑选一处想要搬移的计算逻辑。首先，我用现在的enrichReading函数来增强“读数”记录，尽管该函数暂时还什么都没做。
 */
function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
}
//客户端3...
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const basicChargeAmount = calculateBaseCharge(aReading);

//然后我运用搬移函数（198）把calculateBaseCharge函数搬移到增强过程中：
function enrichReading(original) {
    const result = _.cloneDeep(original);
    result.baseCharge = calculateBaseCharge(result);
    return result;
}

/**
    在变换函数内部，我乐得直接修改结果对象，而不是每次都复制一个新对象。
    我喜欢不可变的数据，但在大部分编程语言中，保持数据完全不可变很困难。
    在程序模块的边界处，我做好了心理准备，多花些精力来支持不可变性。
    但在较小的范围内，我可以接受可变的数据。
    另外，我把这里用到的变量命名为aReading，表示它是一个累积变量（accumulating variable）。
    这样当我把更多的逻辑搬移到变换函数enrichReading中时，这个变量名也仍然适用。

    修改客户端代码，令其改用增强后的字段：
 */


































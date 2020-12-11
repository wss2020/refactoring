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

//客户端3...
const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);
function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
}


/**
   处理这种情况的一个办法是，把所有这些计算派生数据的逻辑搬移到一个变换函数中，
    该函数接受原始的“读数”作为输入，输出则是增强的“读数”记录，其中包含所有共用的派生数据。
    我先要创建一个变换函数，它要做的事很简单，就是复制输入的对象：
 */
function enrichReading(original) {
    const result = _.cloneDeep(original);
    return result;
}

/**
   我用了Lodash库的cloneDeep函数来进行深复制。
      这个变换函数返回的本质上仍是原来的对象，只是添加了更多的信息在上面。
   对于这种函数，我喜欢用“enrich”（增强）这个词来给它命名。
   如果它生成的是跟原来完全不同的对象，我就会用“transform”（变换）来命名它。

   然后我挑选一处想要搬移的计算逻辑。首先，我用现在的enrichReading函数来增强“读数”记录，尽管该函数暂时还什么都没做。
 */























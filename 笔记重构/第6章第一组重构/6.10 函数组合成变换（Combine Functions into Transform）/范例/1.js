/**
范例
   在我长大的国度，茶是生活中的重要部分，以至于我想象了这样一种特别的公共设施，专门给老百姓供应茶水。
   每个月，从这个设备上可以得到读数（reading），从而知道每位顾客取用了多少茶。
*/
function taxThreshold(year){}
function acquireReading(){
    return  {customer: "ivan", quantity: 10, month: 5, year: 2017};
}

//几个不同地方的代码分别根据茶的用量进行计算。一处是计算应该向顾客收取的基本费用。
//客户端1...
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;

//另一处是计算应该交税的费用—比基本费用要少，因为政府明智地认为，每个市民都有权免税享受一定量的茶水。
//客户端2...
const aReading = acquireReading();
const base = (baseRate(aReading.month, aReading.year) * aReading.quantity);
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));

/**
  浏览处理这些数据记录的代码，我发现有很多地方在做着相似的计算。
  这样的重复代码，一旦需要修改（我打赌这只是早晚的问题），就会造成麻烦。
  我可以用提炼函数（106）来处理这些重复的计算逻辑，但这样提炼出来的函数会散落在程序中，以后的程序员还是很难找到。
  说真的，我还真在另一块代码中找到了一个这样的函数。
 */
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
























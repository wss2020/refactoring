/*
   我在英格兰长大，那是一个热爱喝茶的国度。（个人而言，我不喜欢在英格兰喝到的大部分茶，对中国茶和日本茶倒是情有独钟。）
   所以，我虚构了一种用于向老百姓供给茶水的公共设施。每个月会有软件读取茶水计量器的数据，

   得到类似这样的读数（reading）：
 */

reading = {customer: "ivan", quantity: 10, month: 5, year: 2017};

//浏览处理这些数据记录的代码，我发现有很多地方在做着相似的计算，于是我找到了一处计算“基础费用”（base charge）的逻辑。

// 客户端1...
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;

//在英格兰，一切生活必需品都得交税，茶自然也不例外。不过，按照规定，只要不超出某个必要用量，就不用交税。

//客户端2...
const aReading = acquireReading();
const base = (baseRate(aReading.month, aReading.year) * aReading.quantity);
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));

/*
   我相信你也发现了：计算基础费用的公式被重复了两遍。如果你跟我有一样的习惯，现在大概已经在着手提炼函数（106）了。
   有趣的是，好像别人已经动过这个脑筋了。
 */
//客户端3...
const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);
function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

/*
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
    get baseCharge() {
    // get calculateBaseCharge() {
        return baseRate(this.month, this.year) * this.quantity;
    }
    get taxableCharge() {
        return Math.max(0, this.baseCharge - taxThreshold(this.year));
    }
}

/*  1.
   首先，我想把手上已有的函数calculateBaseCharge搬到新建的Reading类中。
   一得到原始的读数数据，我就用Reading类将它包装起来，然后就可以在函数中使用Reading类了。
 */
// 客户端3...
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const basicChargeAmount = calculateBaseCharge(aReading);

//2. 然后我用搬移函数（198）把calculateBaseCharge搬到新类中。
// class Reading...
/*get calculateBaseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
}
*/
// 客户端3...
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const basicChargeAmount = aReading.baseCharge;
// const basicChargeAmount = aReading.calculateBaseCharge;

//搬移的同时，我会顺便运用函数改名（124），按照我喜欢的风格对这个函数改名。
// get baseCharge() {
//     return baseRate(this.month, this.year) * this.quantity;
// }
/*
   用这个名字，Reading类的客户端将不知道baseCharge究竟是一个字段还是推演计算出的值。
   这是好事，它符合“统一访问原则”（Uniform Access Principle）[mf-ua]。

   现在我可以修改客户端1的代码，令其调用新的方法，不要重复计算基础费用。
 */


//客户端1...
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const baseCharge = aReading.baseCharge;

//很有可能我会顺手用内联变量（123）把baseCharge变量给去掉。
// 不过，我们当下介绍的重构手法更关心“计算应税费用”的逻辑。同样，我先将那里的客户端代码改为使用新建的baseCharge属性。


//客户端2...
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const taxableCharge = taxableChargeFn(aReading);
// const taxableCharge = Math.max(0, aReading.baseCharge - taxThreshold(aReading.year));

//运用提炼函数（106）将计算应税费用（taxable charge）的逻辑提炼成函数：
function taxableChargeFn(aReading) {
    return Math.max(0, aReading.baseCharge - taxThreshold(aReading.year));
}



//客户端2...
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const taxableCharge = aReading.taxableCharge;
// const taxableCharge = taxableChargeFn(aReading);

//然后我运用搬移函数（198）将其移入Reading类：
//class Reading...
/*
    get taxableCharge() {
        return Math.max(0, this.baseCharge - taxThreshold(this.year));
    }
 */

//由于所有派生数据都是在使用时计算得出的，所以对存储下来的读数进行修改也没问题。
// 一般而论，我更倾向于使用不可变的数据；
// 但很多时候我们必须得使用可变数据（比如JavaScript整个语言生态在设计时就没有考虑数据的不可变性）。
// 如果数据确有可能被更新，那么用类将其封装起来会很有帮助。










































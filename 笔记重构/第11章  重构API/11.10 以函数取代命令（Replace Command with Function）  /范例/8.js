/**
 现在我就可以把所有逻辑都内联到顶层的charge函数中。这是内联函数（115）的一种特殊情况，我需要
 把构造函数和执行函数一并内联。
 */


class ChargeCalculator {
    charge(customer, usage, provider) {
        const baseCharge = customer.baseRate * usage;
        return baseCharge + provider.connectionCharge;
    }
}
//顶层作用域...
function charge(customer, usage, provider) {
    const baseCharge = customer.baseRate * usage;
    return baseCharge + provider.connectionCharge;
}
monthCharge = charge(customer, usage, provider);



//现在命令类已经是死代码了，可以用移除死代码（237）给它一个体面的葬礼。

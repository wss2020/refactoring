/**
 现在所有逻辑处理都集中到一个函数了，下一步是把构造函数传入的数据移到主函数。首先用改变函数声明（124）
 把构造函数的参数逐一添加到charge函数上。
 */
class ChargeCalculator {
    constructor(customer, usage, provider) {
        this._customer = customer;
        this._usage = usage;
        this._provider = provider;
    }
    charge(customer, usage, provider) {
        const baseCharge = this._customer.baseRate * this._usage;
        return baseCharge + this._provider.connectionCharge;
    }
}
//顶层作用域...
function charge(customer, usage, provider) {
    return new ChargeCalculator(customer, usage, provider)
        .charge(customer, usage, provider);
}
monthCharge = charge(customer, usage, provider);



//然后修改charge函数的实现，改为使用传入的参数。这个修改可以小步进行，每次使用一个参数。

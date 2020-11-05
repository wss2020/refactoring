/**
    接下来要考虑如何处理支持函数（也就是这里的baseCharge函数）。对于有返回值的函数，我一般会
 先用提炼变量（119）把返回值提炼出来。
 */
class ChargeCalculator {
    constructor (customer, usage, provider){
        this._customer = customer;
        this._usage = usage;
        this._provider = provider;
    }
    get baseCharge() {
        return this._customer.baseRate * this._usage;
    }
    get charge() {
        const baseCharge = this.baseCharge;
        return baseCharge + this._provider.connectionCharge;
    }
}



function charge(customer, usage, provider) {
    return new ChargeCalculator(customer, usage, provider).charge;
}
monthCharge = charge(customer, usage, provider);


//然后对支持函数使用内联函数（115）。

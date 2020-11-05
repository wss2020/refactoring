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
        return this.baseCharge + this._provider.connectionCharge;
    }
}

/**
 命令类足够小、足够简单，变成函数更合适。
 首先，我用提炼函数（106）把命令对象的创建与调用过程包装到一个函数中。
 调用方...
 */
monthCharge = charge(customer, usage, provider);
//顶层作用域...
function charge(customer, usage, provider) {
    return new ChargeCalculator(customer, usage, provider).charge;
}


/**
    接下来要考虑如何处理支持函数（也就是这里的baseCharge函数）。对于有返回值的函数，我一般会
 先用提炼变量（119）把返回值提炼出来。
*/


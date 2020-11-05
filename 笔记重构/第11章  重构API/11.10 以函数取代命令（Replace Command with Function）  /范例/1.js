//假设我有一个很小的命令对象。
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


//使用方的代码如下。调用方...
monthCharge = new ChargeCalculator(customer, usage, provider).charge;




/**
    命令类足够小、足够简单，变成函数更合适。
    首先，我用提炼函数（106）把命令对象的创建与调用过程包装到一个函数中。
    调用方...
 */

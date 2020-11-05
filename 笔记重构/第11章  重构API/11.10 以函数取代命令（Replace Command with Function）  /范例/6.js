//然后修改charge函数的实现，改为使用传入的参数。这个修改可以小步进行，每次使用一个参数。
class ChargeCalculator {
    constructor(customer, usage, provider) {
        this._customer = customer;
        this._usage = usage;
        this._provider = provider;
    }

    charge(customer, usage, provider) {
        const baseCharge = customer.baseRate * this._usage;
        return baseCharge + this._provider.connectionCharge;
    }
}
//顶层作用域...
function charge(customer, usage, provider) {
    return new ChargeCalculator(customer, usage, provider)
        .charge(customer, usage, provider);
}
monthCharge = charge(customer, usage, provider);



/**
    构造函数中对this._customer字段的赋值不删除也没关系，因为反正没人使用这个字段。但我更愿意
 去掉这条赋值语句，因为去掉它以后，如果在函数实现中漏掉了一处对字段的使用没有修改，测试就会失败。
 （如果我真的犯了这个错误而测试没有失败，我就应该考虑增加测试了。）

    其他参数也如法炮制，直到charge函数不再使用任何字段：
*/


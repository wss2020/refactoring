//然后对支持函数使用内联函数（115）。
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
        const baseCharge = this._customer.baseRate * this._usage;
        return baseCharge + this._provider.connectionCharge;
    }
}


function charge(customer, usage, provider) {
    return new ChargeCalculator(customer, usage, provider).charge;
}
monthCharge = charge(customer, usage, provider);




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


/**
    构造函数中对this._customer字段的赋值不删除也没关系，因为反正没人使用这个字段。但我更愿意
 去掉这条赋值语句，因为去掉它以后，如果在函数实现中漏掉了一处对字段的使用没有修改，测试就会失败。
 （如果我真的犯了这个错误而测试没有失败，我就应该考虑增加测试了。）

    其他参数也如法炮制，直到charge函数不再使用任何字段：
*/

class ChargeCalculator {
    charge(customer, usage, provider) {
        const baseCharge = customer.baseRate * usage;
        return baseCharge + provider.connectionCharge;
    }
}


/**
    现在我就可以把所有逻辑都内联到顶层的charge函数中。这是内联函数（115）的一种特殊情况，我需要
 把构造函数和执行函数一并内联。
*/
//顶层作用域...
function charge(customer, usage, provider) {
    const baseCharge = customer.baseRate * usage;
    return baseCharge + provider.connectionCharge;
}


//现在命令类已经是死代码了，可以用移除死代码（237）给它一个体面的葬礼。

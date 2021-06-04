/**
   为了使函数适应这个新家，我必须决定如何处理两个作用范围发生改变的变量。isPremium如今只需要简单地从this上获取，但daysOverdrawn怎么办呢？我是直
接传值，还是把整个account对象传过来？为了方便，我选择先简单传一个值，不过如果后续还需要账户（account）对象上除了daysOverdrawn以外的更多数据，例
如需要根据账户类型（account type）来决定如何从账户（account）对象上取用数据时，那么我很可能会改变主意，转而选择传入整个account对象。
   完成函数复制后，我会将原来的方法代之以一个委托调用。
 */
class Account {
    constructor() {
        this.type = new AccountType();
        // ...
    }
    get bankCharge() {
        let result = 4.5;
        if (this._daysOverdrawn > 0) result += this.overdraftCharge;
        return result;
    }
    get overdraftCharge() {
        return this.type.overdraftCharge(this.daysOverdrawn);
    }
}

class AccountType {
    overdraftCharge(daysOverdrawn) {
        if (this.isPremium) {
            const baseCharge = 10;
            if (daysOverdrawn <= 7)
                return baseCharge;
            else
                return baseCharge + (daysOverdrawn - 7) * 0.85;
        } else
            return daysOverdrawn * 1.75;
    }
}

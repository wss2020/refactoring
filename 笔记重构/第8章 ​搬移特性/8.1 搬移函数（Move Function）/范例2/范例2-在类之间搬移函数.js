//  Premium 保险费、奖金、额外费用         overdrawn 已透支的
// 在类之间搬移函数也是一种常见场景，下面我将用一个表示“账户”的Account类来讲解。
class Account {
    get bankCharge() {
        let result = 4.5;
        if (this._daysOverdrawn > 0) result += this.overdraftCharge;
        return result;
    }
    get overdraftCharge() {
        if (this.type.isPremium) {
            const baseCharge = 10;
            if (this.daysOverdrawn <= 7) return baseCharge;
            else
                return baseCharge + (this.daysOverdrawn - 7) * 0.85;
        } else
            return this.daysOverdrawn * 1.75;
    }
}

/*
   上面的代码会根据账户类型（account type）的不同，决定不同的“透支金额计费”算法。因此，很自然会想到将overdraftCharge函数搬移到AccountType类去。

   第一步要做的是：观察被overdraftCharge使用的每一项特性，考虑是否值得将它们与overdraftCharge函数一起移动。此例中我需要让daysOverdrawn字段
留在Account类中，因为它会随不同种类的账户而变化。
   然后，我将overdraftCharge函数主体复制到AccountType类中，并做相应调整。
 */

class AccountType {
    overdraftCharge(daysOverdrawn) {
        if (this.isPremium) {
            const baseCharge = 10;
            if (daysOverdrawn <= 7)
                return baseCharge; else
                return baseCharge + (daysOverdrawn - 7) * 0.85;
        } else
            return daysOverdrawn * 1.75;
    }
}

/*
   为了使函数适应这个新家，我必须决定如何处理两个作用范围发生改变的变量。isPremium如今只需要简单地从this上获取，但daysOverdrawn怎么办呢？我是直
接传值，还是把整个account对象传过来？为了方便，我选择先简单传一个值，不过如果后续还需要账户（account）对象上除了daysOverdrawn以外的更多数据，例
如需要根据账户类型（account type）来决定如何从账户（account）对象上取用数据时，那么我很可能会改变主意，转而选择传入整个account对象。

   完成函数复制后，我会将原来的方法代之以一个委托调用。
 */
class Account {
    get bankCharge() {
        let result = 4.5;
        if (this._daysOverdrawn > 0) result += this.overdraftCharge;
        return result;
    }
    get overdraftCharge() {
        return this.type.overdraftCharge(this.daysOverdrawn);
    }
}

/*
   然后下一件需要决定的事情是，是保留overdraftCharge这个委托函数，还是直接内联它？内联的话，代码会变成下面这样。
 */
class Account {
    get bankCharge() {
        let result = 4.5;
        if (this._daysOverdrawn > 0)
            result += this.type.overdraftCharge(this.daysOverdrawn);
        return result;
    }
}

/*
   在早先的步骤中，我将daysOverdrawn作为参数直接传递给overdraftCharge函数，但如若账户（account）对象上有很多数据需要传递，那我就比较倾向于
直接将整个对象作为参数传递过去：
 */
class Account {
    get bankCharge() {
        let result = 4.5;
        if (this._daysOverdrawn > 0) result += this.overdraftCharge;
        return result;
    }
    get overdraftCharge() {
        return this.type.overdraftCharge(this);
    }
}

class AccountType {
    overdraftCharge(account) {
        if (this.isPremium) {
            const baseCharge = 10;
            if (account.daysOverdrawn <= 7) return baseCharge;
            else
                return baseCharge + (account.daysOverdrawn - 7) * 0.85;
        } else
            return account.daysOverdrawn * 1.75;
    }
}





























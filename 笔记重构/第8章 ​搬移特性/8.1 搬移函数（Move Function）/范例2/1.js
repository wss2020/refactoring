/**
 * Premium 保险费、奖金、额外费用         overdrawn 已透支的
 * 在类之间搬移函数也是一种常见场景，下面我将用一个表示“账户”的Account类来讲解。
 */
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
            else return baseCharge + (this.daysOverdrawn - 7) * 0.85;
        } else
            return this.daysOverdrawn * 1.75;
    }
}

/**
 上面的代码会根据账户类型（account type）的不同，决定不同的“透支金额计费”算法。因此，很自然会想到将overdraftCharge函数搬移到AccountType类去。

 第一步要做的是：观察被overdraftCharge使用的每一项特性，考虑是否值得将它们与overdraftCharge函数一起移动。此例中我需要让daysOverdrawn字段
 留在Account类中，因为它会随不同种类的账户而变化。
 然后，我将overdraftCharge函数主体复制到AccountType类中，并做相应调整。
 */

class AccountType {
    overdraftCharge(daysOverdrawn) {
        if (this.isPremium) {
            const baseCharge = 10;
            if (daysOverdrawn <= 7) return baseCharge;
            else return baseCharge + (daysOverdrawn - 7) * 0.85;
        } else
            return daysOverdrawn * 1.75;
    }
}


/**
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


/**
   然后下一件需要决定的事情是，是保留overdraftCharge这个委托函数，还是直接内联它？内联的话，代码会变成下面这样。
 */
class Account {
    constructor() {
        this.type = new AccountType();
        // ...
    }
    get bankCharge() {
        let result = 4.5;
        if (this._daysOverdrawn > 0)
            result += this.type.overdraftCharge(this.daysOverdrawn);
        return result;
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

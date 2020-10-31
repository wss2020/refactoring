// 原码
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




//重构
class Account {
    constructor(){
        //这个是自己写的，实际的情况，书中没有说，我也不知道怎么写。
        this.type = new AccountType();
    }
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
        if (account.isPremium) {
            const baseCharge = 10;
            if (account.daysOverdrawn <= 7) return baseCharge;
            else
                return baseCharge + (account.daysOverdrawn - 7) * 0.85;
        } else
            return account.daysOverdrawn * 1.75;
    }
}









































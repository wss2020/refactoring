/**
   现在，让我们看另外一个场景。还是那个代表“账户”的Account类，类上有一个代表“利率”的字段_interestRate。
 */
class Account {
    constructor(number, type, interestRate) {
        this._number = number;
        this._type = type;
        this._interestRate = interestRate;
    }

    get interestRate() {
        return this._interestRate;
    }
}

class AccountType {
    constructor(nameString) {
        this._name = nameString;
    }
}

//原码
/*
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
 */


//重构
class Account {
    constructor(number, type) {
        this._number = number;
        this._type = new AccountType('xxx','xxx');
    }
    get interestRate() {
        return this._type.interestRate;
    }
}
class AccountType {
    constructor(nameString,interestRate) {
        this._name = nameString;
        this._interestRate = interestRate;
    }
    get interestRate() {
        return this._interestRate;
    }
}
















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

/**
 我不希望让每个账户自己维护一个利率字段，利率应该取决于账户本身的类型，因此我想将它搬移到AccountType中去。利率字段已经通过访问函数得到了良好的封
 装，因此我只需要在AccountType上创建对应的字段及访问函数即可。
 */
class AccountType {
    constructor(nameString, interestRate) {
        this._name = nameString;
        this._interestRate = interestRate;
    }
    get interestRate() {
        return this._interestRate;
    }
}

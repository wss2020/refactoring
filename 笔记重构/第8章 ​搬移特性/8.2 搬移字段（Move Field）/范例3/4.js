/**
    我会保留这条断言，让系统先运行一段时间，看看是否会在这捕获到错误。或者，除了添加断言，我还可以将错误记录到日志里。一段时间后，一旦我对代码变得更
加自信，确定它确实没有引起行为变化后，我就可以让Account直接访问AccountType上的interestRate字段，并将原来的字段完全删除了。
 */
class Account {
    constructor(number, type) {
        this._number = number;
        this._type = type;
    }
    get interestRate() {
        return this._type.interestRate;
    }
}

class AccountType {
    constructor(nameString, interestRate) {
        this._name = nameString;
        this._interestRate = interestRate;
    }
    get interestRate() {
        return this._interestRate;
    }
}




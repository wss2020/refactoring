/*
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

/*
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

/*
    接着我应该着手替换Account类的访问函数，但我发现直接替换可能有个潜藏的问题。在重构之前，每个账户都自己维护一份利率数据，而现在我要让所有相同类型
的账户共享同一个利率值。如果当前类型相同的账户确实拥有相同的利率，那么这次重构就能成立，因为这不会引起可观测的行为变化。但只要存在一个特例，即同一类型
的账户可能有不同的利率值，那么这样的修改就不叫重构了，因为它会改变系统的可观测行为。倘若账户的数据保存在数据库中，那我就应该检查一下数据库，确保同一类
型的账户都拥有与其账户类型匹配的利率值。同时，我还可以在Account类引入断言（302），确保出现异常的利率数据时能够及时发现。

 */
class Account {
    constructor(number, type, interestRate) {
        this._number = number;
        this._type = type;
        assert(interestRate === this._type.interestRate);
        this._interestRate = interestRate;
    }
    get interestRate() {
        return this._interestRate;
    }
}

/*
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











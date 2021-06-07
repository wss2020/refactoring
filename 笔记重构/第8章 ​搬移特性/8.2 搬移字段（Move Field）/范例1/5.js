
/**
 * 搬移完语句后运行一下测试。测试通过后，再次修改Customer的访问函数，让它使用_contract对象上的discountRate字段。
 * 我想要将折扣率（discountRate）字段从Customer类中搬移到CustomerContract里中。
 * 第一件事情是先用封装变量（132）将对_discountRate字段的访问封装起来。
 */
class Customer {
    constructor(name, discountRate) {
        this._name = name;
        this._contract = new CustomerContract(dateToday());
        this._setDiscountRate(discountRate);
    }
    get discountRate() {
        return this._contract.discountRate;
    }
    _setDiscountRate(aNumber) {
        this._contract.discountRate = aNumber;
    }
}

class CustomerContract {
    constructor(startDate, discountRate) {
        this._startDate = startDate;
        this._discountRate = discountRate;
    }
    get discountRate() {
        return this._discountRate;
    }
    set discountRate(arg) {
        this._discountRate = arg;
    }
}

//在JavaScript中，使用类的字段无须事先声明，因此替换完访问函数，实际上已经没有其他字段再需要我删除。

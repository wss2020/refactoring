// contract   合同
/*
    我将用下面这个例子来介绍这项手法，其中Customer类代表了一位“顾客”，CustomerContract代表与顾客关联的一个“合同”。
 */
class Customer {
    constructor(name, discountRate) {
        this._name = name;
        this._discountRate = discountRate;
        this._contract = new CustomerContract(dateToday());
    }
    get discountRate() {
        return this._discountRate;
    }
    becomePreferred() {
        this._discountRate += 0.03; // other nice things
    }
    applyDiscount(amount) {
        return amount.subtract(amount.multiply(this._discountRate));
    }
}

class CustomerContract {
    constructor(startDate) {
        this._startDate = startDate;
    }
}
/*
   我想要将折扣率（discountRate）字段从Customer类中搬移到CustomerContract里中。
   第一件事情是先用封装变量（132）将对_discountRate字段的访问封装起来。
 */
class Customer {
    constructor(name, discountRate) {
        this._name = name;
        this._setDiscountRate(discountRate);
        this._contract = new CustomerContract(dateToday());
    }
    get discountRate() {
        return this._discountRate;
    }
    _setDiscountRate(aNumber) {
        this._discountRate = aNumber;
    }
    becomePreferred() {
        this._setDiscountRate(this.discountRate + 0.03); // other nice things
    }
    applyDiscount(amount) {
        return amount.subtract(amount.multiply(this.discountRate));
    }
}

/*
    我通过定制的applyDiscount方法来更新字段，而不是使用通常的设值函数，这是因为我不想为字段暴露一个public的设值函数。接着我在
CustomerContract中添加一个对应的字段和访问函数。
 */
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

/*
   接下来，我可以修改customer对象的访问函数，让它引用CustomerContract这个新添的字段。不过当我这么干时，我收到了一个错误：
“Cannot set property 'discountRate' of undefined”。这是因为我们先调用了_setDiscountRate函数，而此时CustomerContract对象尚未创建出
来。为了修复这个错误，我得先撤销刚刚的代码，回到上一个可工作的状态，然后再应用移动语句（223）手法，将_setDiscountRate函数调用语句挪动到创建对象的
语句之后。
 */
class Customer {
    constructor(name, discountRate) {
        this._name = name;
        this._contract = new CustomerContract(dateToday());
        this._setDiscountRate(discountRate);
    }
}

/*
   搬移完语句后运行一下测试。测试通过后，再次修改Customer的访问函数，让它使用_contract对象上的discountRate字段。
 */

class Customer {
    get discountRate() {
        return this._contract.discountRate;
    }
    _setDiscountRate(aNumber) {
        this._contract.discountRate = aNumber;
    }
}


//在JavaScript中，使用类的字段无须事先声明，因此替换完访问函数，实际上已经没有其他字段再需要我删除。






























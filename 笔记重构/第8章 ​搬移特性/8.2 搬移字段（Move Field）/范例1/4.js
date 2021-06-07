/**
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


/**
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



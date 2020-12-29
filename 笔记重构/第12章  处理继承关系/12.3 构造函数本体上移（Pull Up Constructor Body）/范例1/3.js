/**
    测试。
 之后我将这行公共代码提升至超类的构造函数中。由于其中引用了一个子类构造函数传入的参数name，于是我将该参数一并传给超类构造函数。
 */
class Party {
    constructor(name){
        this._name = name;
    }
}

class Employee extends Party {
    constructor(name, id, monthlyCost) {
        super(name);
        this._id = id;
        this._monthlyCost = monthlyCost;
    }
}

class Department extends Party {
    constructor(name, staff) {
        super(name);
        this._staff = staff;
    }
}


/**
    运行测试。然后大功告成。
    多数时候，一个构造函数的工作原理都是这样：先（通过super调用）初始化共用的数据，再由各个子类完成额外的工作。
 但是，偶尔也需要将共用行为的初始化提升至超类，这时问题便来了。
    请看范例2。
 */



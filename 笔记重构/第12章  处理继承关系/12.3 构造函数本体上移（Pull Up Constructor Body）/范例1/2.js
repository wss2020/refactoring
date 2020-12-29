/**
     Party的两个子类间存在公共代码，也即是对名字（name）的赋值。
 我先用移动语句（223）将Employee中的这行赋值语句移动到super()调用后面：
 */
class Party {}

class Employee extends Party {
    constructor(name, id, monthlyCost) {
        super();
        this._name = name;
        this._id = id;
        this._monthlyCost = monthlyCost;
    }
}

class Department extends Party {
    constructor(name, staff) {
        super();
        this._name = name;
        this._staff = staff;
    }
}


/**
    测试。
    之后我将这行公共代码提升至超类的构造函数中。由于其中引用了一个子类构造函数传入的参数name，于是我将该参数一并传给超类构造函数。
 */



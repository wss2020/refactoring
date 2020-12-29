// 我以下列“雇员”的例子开始：
class Party {}

class Employee extends Party {
    constructor(name, id, monthlyCost) {
        super();
        this._id = id;
        this._name = name;
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
 Party的两个子类间存在公共代码，也即是对名字（name）的赋值。
 我先用移动语句（223）将Employee中的这行赋值语句移动到super()调用后面：
 */


class Employee {
    constructor (name) {
    }
    get isPrivileged() {}
    assignCar() {}
}

class Manager  extends Employee {
    constructor(name, grade) {
        super(name);
        this._grade = grade;
        if (this.isPrivileged)
            this.assignCar();
    }

    get isPrivileged() {
        return this._grade >4;
    }

}

/**
    这里我无法简单地提升isPrivileged函数至超类，因为调用它之前需要先为grade字段赋值，而该字段只能在子类的构造函数中初始化。
 */

/**
   在这种场景下，我可以对这部分公共代码使用提炼函数（106）。
 */




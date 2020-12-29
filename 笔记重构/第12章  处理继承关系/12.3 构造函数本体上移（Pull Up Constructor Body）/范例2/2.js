/**
   在这种场景下，我可以对这部分公共代码使用提炼函数（106）。
 */
class Employee{
    constructor (name) {
    }
    get isPrivileged() {}
    assignCar() {}
}

class Manager  extends Employee {
    constructor(name, grade) {
        super(name);
        this._grade = grade;
        this.finishConstruction();
    }

    finishConstruction(){
        if (this.isPrivileged)  this.assignCar();
    }

    get isPrivileged() {
        return this._grade >4;
    }

}


/**
    然后再使用函数上移（350）将提炼得到的函数提升至超类。
 */



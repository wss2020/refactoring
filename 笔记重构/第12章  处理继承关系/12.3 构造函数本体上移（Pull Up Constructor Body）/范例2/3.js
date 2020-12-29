/**
    然后再使用函数上移（350）将提炼得到的函数提升至超类。
 */
class Employee {
    constructor (name) {

    }
    get isPrivileged() {}
    assignCar() {}
    finishConstruction(){
        if (this.isPrivileged)  this.assignCar();
    }
}

class Manager  extends Employee {
    constructor(name, grade) {
        super(name);
        this._grade = grade;
        this.finishConstruction();
    }

    get isPrivileged() {
        return this._grade >4;
    }

}





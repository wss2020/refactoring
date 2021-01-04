/**
    把数据搬到超类的同时，可以用函数上移（350）把相关的函数也一起搬移。首先是name函数：
 */
class Party {
    constructor(name) {
        this._name = name;
    }
    get name() {  return this._name; }
}

class Employee  extends Party {
    constructor(name, id, monthlyCost) {
        super(name);
        this._id = id;
        this._monthlyCost = monthlyCost;
    }

    get monthlyCost() { return this._monthlyCost; }
    get id() { return this._id; }
    get annualCost() {
        return this.monthlyCost * 12;
    }
}

class Department extends Party  {
    constructor(name, staff) {
        super(name);
        this._staff = staff;
    }

    get staff() { return this._staff.slice(); }
    get totalMonthlyCost() {
        return this.staff
            .map(e => e.monthlyCost)
            .reduce((sum, cost) => sum + cost);
    }
    get headCount() {
        return this.staff.length;
    }
    get totalAnnualCost() {
        return this.totalMonthlyCost * 12;
    }
}


/**
    有两个函数实现非常相似。annualCost 和 totalAnnualCost 两个函数，
    它们各自使用的函数monthlyCost和totalMonthlyCost，名字和实现都不同，但意图却是一致。我可以用改变函数声明（124）将它们的名字统一。
 */



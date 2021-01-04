/**
    在提炼超类时，我喜欢先从数据开始搬移，在JavaScript中就需要修改构造函数。我先用字段上移（353）把name字段搬到超类中。
 */
class Party {
    constructor(name) {
        this._name = name;
    }
}

class Employee  extends Party {
    constructor(name, id, monthlyCost) {
        super(name);
        this._id = id;
        this._monthlyCost = monthlyCost;
    }

    get monthlyCost() { return this._monthlyCost; }
    get name() {  return this._name; }
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
    get name() { return this._name; }
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
    把数据搬到超类的同时，可以用函数上移（350）把相关的函数也一起搬移。首先是name函数：
 */


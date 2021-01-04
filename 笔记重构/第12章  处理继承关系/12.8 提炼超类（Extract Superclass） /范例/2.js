/**
    可以为它们提炼一个共同的超类，更明显地表达出它们之间的共同行为。
    首先创建一个空的超类，让原来的两个类都继承这个新的类。
 */
class Party {}

class Employee  extends Party {
    constructor(name, id, monthlyCost) {
        super();
        this._id = id;
        this._name = name;
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
        super();
        this._name = name;
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
    在提炼超类时，我喜欢先从数据开始搬移，在JavaScript中就需要修改构造函数。我先用字段上移（353）把name字段搬到超类中。
 */


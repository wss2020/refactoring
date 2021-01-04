/**
 下面这两个类，仔细考虑之下，是有一些共同之处的——它们都有名字（name），也都有月度成本（monthly cost）和年度成本（annual cost）的概念：
 */
class Employee {
    constructor(name, id, monthlyCost) {
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

class Department {
    constructor(name, staff) {
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
 可以为它们提炼一个共同的超类，更明显地表达出它们之间的共同行为。
 首先创建一个空的超类，让原来的两个类都继承这个新的类。
 */

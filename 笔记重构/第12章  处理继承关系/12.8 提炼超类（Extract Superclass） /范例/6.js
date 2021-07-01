/**
 然后对计算年度成本的函数也做相似的改名：
 */
class Party {
    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }
}

class Employee extends Party {
    constructor(name, id, monthlyCost) {
        super(name);
        this._id = id;
        this._monthlyCost = monthlyCost;
    }

    get id() {
        return this._id;
    }

    get monthlyCost() {
        return this._monthlyCost;
    }

    get annualCost() {
        return this.monthlyCost * 12;
    }
}

// 把 totalAnnualCost 统一改为 annualCost
class Department extends Party {
    constructor(name, staff) {
        super(name);
        this._staff = staff;
    }

    get staff() {
        return this._staff.slice();
    }

    get headCount() {
        return this.staff.length;
    }

    get MonthlyCost() {
        return this.staff
            .map(e => e.monthlyCost)
            .reduce((sum, cost) => sum + cost);
    }

    get annualCost() {
        return this.MonthlyCost * 12;
    }
}


/**  现在可以用函数上移（350）把这个函数搬到超类了。  */




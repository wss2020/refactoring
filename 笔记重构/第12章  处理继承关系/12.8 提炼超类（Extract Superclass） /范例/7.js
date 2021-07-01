/**  现在可以用函数上移（350）把这个函数搬到超类了。  */
class Party {
    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    get annualCost() {
        return this.MonthlyCost * 12;
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
}

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
}







class SubclassResponsibilityError {

}

class Party {
    constructor(monthlyCost) {
        this._monthlyCost = monthlyCost;
    }

    get annualCost() {
        return this._monthlyCost * 12;
    }

    get monthlyCost() {
        throw new SubclassResponsibilityError();
    }
}

class Employee extends Party {
}

console.log(new Employee(10))
console.log(new Employee(10).monthlyCost)


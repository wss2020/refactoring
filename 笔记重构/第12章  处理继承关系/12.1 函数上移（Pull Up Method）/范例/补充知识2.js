
class SubclassResponsibilityError{

}
class Party{
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
class Employee extends Party{
    get monthlyCost() {
        return this._monthlyCost;
    }
}
class Department extends Party{
}

console.log(new Employee(123).monthlyCost);

console.log(new Department(555).monthlyCost);






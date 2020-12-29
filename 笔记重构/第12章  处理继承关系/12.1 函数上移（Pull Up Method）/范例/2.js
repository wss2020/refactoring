/**
 两个函数各有不同的名字，因此第一步是用改变函数声明（124）统一它们的函数名
 */


class Party{}
class Employee extends Party{
    constructor(monthlyCost) {
        super();
        this.monthlyCost = monthlyCost;
    }
    get annualCost() {
        return this.monthlyCost * 12;
    }
}
class Department extends Party{
    constructor(monthlyCost) {
        super();
        this.monthlyCost = monthlyCost;
    }
    get annualCost() {
        return this.monthlyCost * 12;
    }
}

// 然后，我从其中一个子类中将annualCost函数复制到超类。

/**
    我手上有两个子类，它们之中各有一个函数做了相同的事情：
    检查两个类的函数时我发现，两个函数都引用了monthlyCost属性，但后者并未在超类中定义，而是在两个子类中各自定义了一份实现。
 因为JavaScript是动态语言，这样做没有问题；但如果是在一门静态语言里，我就必须将monthlyCost声明为Party类上的抽象函数，
 否则编译器就会报错。
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
    get totalAnnualCost() {
        return this.monthlyCost * 12;
    }
}

/**
    两个函数各有不同的名字，因此第一步是用改变函数声明（124）统一它们的函数名
 */

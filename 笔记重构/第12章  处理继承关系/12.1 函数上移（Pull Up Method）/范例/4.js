/**
 在静态语言里，做完这一步我就可以编译一次，确保超类函数的所有引用都能正常工作。但这是在JavaScript里，编译显然帮不上什么忙，因此我直接先从
 Employee中移除annualCost函数，测试，接着移除Department类中的annualCost函数。

 这项重构手法至此即告完成，但还有一个遗留问题需要解决：annualCost函数中调用了monthlyCost，但后者并未在Party类中显式声明。当然代码仍能正常
 工作，这得益于JavaScript是动态语言，它能自动帮你调用子类上的同名函数。但若能明确传达出“继承Party类的子类需要提供一个monthlyCost实现”这个信息，
 无疑也有很大的价值，特别是对日后需要添加子类的后来者。其中一种好的传达方式是添加一个如下的陷阱（trap）函数。

 我称上述抛出的错误为一个“子类未履行职责错误”，这是从Smalltalk借鉴来的名字。
 */
class SubclassResponsibilityError{

}
class Party{
    constructor(monthlyCost) {
        this.monthlyCost = monthlyCost;
    }
    get annualCost() {
        return this.monthlyCost * 12;
    }
    get monthlyCost() {
        throw new SubclassResponsibilityError();
    }
}
class Employee extends Party{}
class Department extends Party{}



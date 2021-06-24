/*
我们在上面处理的其实是一些很简单的值，却要创建一个这样的类，未免有点儿大动干戈。
   但在上面这个例子中，我必须创建这样一个类，因为Customer类是允许使用者更新其内容的。
       但如果面对一个只读的数据结构，我就可以改用字面量对象（literal object）。

   还是前面这个例子——几乎完全一样，除了一件事：这次没有客户端对Customer对象做更新操作：
 */
class Site {
    get customer() {
        //3.
        return (this._customer === "unknown") ? createUnknownCustomer() : this._customer;
        // return this._customer;
    }
}
//代表“顾客”的Customer类有多个属性，我只考虑其中3个。
class Customer {
    constructor() {}
    get name() {}
    get billingPlan() {}
    set billingPlan(arg) {}
    get paymentHistory() {}

    //1.
    get isUnknown() {
        return false;
    }
}


//1. 顶层作用域...
function createUnknownCustomer() {
    return {
        isUnknown: true,
    };
}
//2.然后我对检查特例的条件逻辑运用提炼函数（106）。
function isUnknown(arg) {
    //3
    return arg.isUnknown;
    // return (arg === "unknown");
}

//客户端1...
const aCustomer = site.customer;
let customerName;
if ( isUnknown(aCustomer) ) customerName = "occupant";
else customerName = aCustomer.name;

//客户端2...
const plan = ( isUnknown(aCustomer) ) ? registry.billingPlans.basic : aCustomer.billingPlan;

//客户端3...
const weeksDelinquent = ( isUnknown(aCustomer) ) ? 0 : aCustomer.paymentHistory.weeksDelinquentInLastYear;


//1.和前面的例子一样，我首先在Customer中添加isUnknown属性，并创建一个包含同名字段的特例对象。这次的区别在于，特例对象是一个字面量。

//3.修改Site类和做条件判断的isUnknown函数，开始使用特例对象。

//4.然后把“以标准方式应对特例”的地方都替换成使用特例字面量的值。首先从“名字”开始：
function createUnknownCustomer() {
    return {
        isUnknown: true,
        name: "occupant",
    };
}

//客户端1...
const customerName = aCustomer.name;


//接着是“计价套餐”：
function createUnknownCustomer() {
    return {
        isUnknown: true,
        name: "occupant",
        billingPlan: registry.billingPlans.basic,
    };
}
//客户端2...
const plan = aCustomer.billingPlan;



//同样，我可以在字面量对象中创建一个嵌套的空支付记录对象：
function createUnknownCustomer() {
    return {
        isUnknown: true,
        name: "occupant",
        billingPlan: registry.billingPlans.basic,
        paymentHistory: {
            weeksDelinquentInLastYear: 0,
        },
    };
}
//客户端3...
const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;


// 如果使用了这样的字面量，应该使用诸如Object.freeze的方法将其冻结，使其不可变。通常，我还是喜欢用类多一点。






















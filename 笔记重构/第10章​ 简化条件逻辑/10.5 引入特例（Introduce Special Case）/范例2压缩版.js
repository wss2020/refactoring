// Site  位置, 场所, 地点          occupant   (房屋等的)居住者, 占有人
//原码
class Site {
    get customer() {
        return this._customer;
    }
}
//代表“顾客”的Customer类有多个属性，我只考虑其中3个。
class Customer {
    constructor() {}
    get name() {}
    get billingPlan() {}
    set billingPlan(arg) {}
    get paymentHistory() {}
}
//客户端1...
const aCustomer = site.customer;
let customerName;
if (aCustomer === "unknown") customerName = "occupant";
else customerName = aCustomer.name;

//客户端2...
const plan = (aCustomer === "unknown") ? registry.billingPlans.basic : aCustomer.billingPlan;

//客户端3...
const weeksDelinquent = (aCustomer === "unknown") ? 0 : aCustomer.paymentHistory.weeksDelinquentInLastYear;









//重构后
class Site {
    get customer() {
        return (this._customer === "unknown") ? createUnknownCustomer() : this._customer;
    }
}
//代表“顾客”的Customer类有多个属性，我只考虑其中3个。
class Customer {
    constructor() {}
    get name() {}
    get billingPlan() {}
    set billingPlan(arg) {}
    get paymentHistory() {}

    get isUnknown() {
        return false;
    }
}

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

const aCustomer = (new Site).customer;
//客户端1...
const customerName = aCustomer.name;

//客户端2...
const plan = aCustomer.billingPlan;

//客户端3...
const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;


//如果使用了这样的字面量，应该使用诸如Object.freeze的方法将其冻结，使其不可变。通常，我还是喜欢用类多一点。































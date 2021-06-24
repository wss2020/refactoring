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
if (aCustomer !== "unknown") aCustomer.billingPlan = newPlan;

//客户端4...
const weeksDelinquent = (aCustomer === "unknown") ? 0 : aCustomer.paymentHistory.weeksDelinquentInLastYear;





//重构后
class Site {
    get customer() {
        return (this._customer === "unknown") ? new UnknownCustomer() : this._customer;
    }
}

//代表“顾客”的Customer类有多个属性，我只考虑其中3个。
// 给Customer添加一个函数，用于指示“这个顾客是否未知
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

//给“未知的顾客”专门创建一个类。
class UnknownCustomer {

    get isUnknown() {
        return true;
    }

    get name() {
        return "occupant";
    }

    get billingPlan() {
        return registry.billingPlans.basic;
    }
    set billingPlan(arg) { /*ignore */  }

    get paymentHistory() {
        return new NullPaymentHistory();
    }
}


class NullPaymentHistory{
    get weeksDelinquentInLastYear() {
        return 0;
    }
}

// function isUnknown(arg) {
//     if (!(arg instanceof Customer || arg instanceof UnknownCustomer)) throw new Error(`investigate bad value: <${arg}>`);
//     return arg.isUnknown;
// }

//客户端1...
const aCustomer = site.customer;
const customerName = aCustomer.name;

//客户端2...
const plan = aCustomer.billingPlan;

//客户端3...
aCustomer.billingPlan = newPlan;

//客户端4...
const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;

//客户端5  新添加的客户端
const name = aCustomer.isUnknown ? "unknown occupant" : aCustomer.name;
// const name = ! isUnknown(aCustomer) ? aCustomer.name : "unknown occupant";













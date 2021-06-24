/*
 测试通过之后，我可能会用内联变量（123）把customerName变量也消除掉。
    接下来处理代表“计价套餐”的billingPlan属性。
*/

//客户端2...
const plan = (isUnknown(aCustomer)) ? registry.billingPlans.basic : aCustomer.billingPlan;

//客户端3...
if (!isUnknown(aCustomer)) aCustomer.billingPlan = newPlan;

/*
   对于读取该属性的行为，我的处理方法跟前面处理name属性一样——找到通用的应对方式，并在UnknownCustomer中使用之。
      至于对该属性的写操作，当前的代码没有对未知顾客调用过设值函数，所以在特例对象中，我会保留设值函数，但其中什么都不做。
*/


class Site {
  get customer() {
    return (this._customer === "unknown") ? new UnknownCustomer() : this._customer;
  }
}

class Customer {
  get isUnknown() { return false; }
  get name() { }
  get billingPlan() { }
  set billingPlan(arg) { }
  get paymentHistory() { }
}

class UnknownCustomer {
  get isUnknown() { return true; }
  get name() { return "occupant"; }
  get billingPlan() { return registry.billingPlans.basic; }
  set billingPlan(arg) {
    //ignore 
  }
}

// 客户端2... 读取的例子...
const plan = aCustomer.billingPlan;

//客户端3...  更新的例子...
aCustomer.billingPlan = newPlan;
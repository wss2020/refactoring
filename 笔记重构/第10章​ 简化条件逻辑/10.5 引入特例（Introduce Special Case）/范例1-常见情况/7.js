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




/*
   特例对象是值对象，因此应该始终是不可变的，即便它们替代的原对象本身是可变的。

   最后一个例子则更麻烦一些，因为特例对象需要返回另一个对象，后者又有其自己的属性。
 */
//客户端...
const weeksDelinquent = isUnknown(aCustomer) ? 0 : aCustomer.paymentHistory.weeksDelinquentInLastYear;


/*
   一般的原则是：如果特例对象需要返回关联对象，被返回的通常也是特例对象。
       所以，我需要创建一个代表“空支付记录”的特例类NullPaymentHistory
*/

class UnknownCustomer {
  get isUnknown() { return true; }
  get name() { return "occupant"; }
  get billingPlan() { return registry.billingPlans.basic; }
  set billingPlan(arg) {
    //ignore 
  }

  get paymentHistory() { return new NullPaymentHistory(); }
}


class NullPaymentHistory {
  get weeksDelinquentInLastYear() { return 0; }
}

//客户端...
const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;


/*
   我继续查看客户端代码，寻找是否有能用多态行为取代的地方。
      但也会有例外情况——客户端不想使用特例对象提供的逻辑，而是想做一些别的处理。
         我可能有 2 3处客户端代码用"occupant"作为未知顾客的名字，但还有一处用了别的值。
 */
//客户端...
const name = !isUnknown(aCustomer) ? aCustomer.name : "unknown occupant";
/*
   这种情况下，我只能在客户端保留特例检查的逻辑。我会对其做些修改，让它使用aCustomer对象身上的isUnknown函数，
      也就是对全局的isUnknown函数使用内联函数（115）。
 */

//客户端...
const name = aCustomer.isUnknown ? "unknown occupant" : aCustomer.name;

//处理完所有客户端代码后，全局的isUnknown函数应该没人再调用了，可以用移除死代码（237）将其移除。











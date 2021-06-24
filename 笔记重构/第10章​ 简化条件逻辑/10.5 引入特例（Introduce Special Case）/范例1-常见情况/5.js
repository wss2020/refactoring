/*
  测试，以确保一切运转如常。

  现在，有趣的部分开始了。我可以逐一查看客户端检查特例的代码，看它们处理特例的逻辑，并考虑是否能用函数组合成类（144）将其替换为一个共同的、符合预期的值。
      此刻，有多处客户端代码用字符串"occupant"来作为未知顾客的名字，就像下面这样。
*/
// 客户端1...
let customerName;
if (isUnknown(aCustomer)) customerName = "occupant";
else customerName = aCustomer.name;




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

//我可以在UnknownCustomer类中添加一个合适的函数。
class UnknownCustomer {
  get isUnknown() {
    return true;
  }

  get name() {
    return "occupant";
  }
}
//然后我就可以去掉所有条件代码。

//客户端1...
const customerName = aCustomer.name;

/*
 测试通过之后，我可能会用内联变量（123）把customerName变量也消除掉。
    接下来处理代表“计价套餐”的billingPlan属性。
*/

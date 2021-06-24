
/*
  下面就是麻烦之处了。我必须在所有期望得到"unknown"值的地方返回这个新的特例对象，并修改所有检查"unknown"值的地方，令其使用新的isUnknown函数。
     一般而言，我总是希望细心安排修改过程，使我可以每次做一点小修改，然后马上测试。
       但如果我修改了Customer类，使其返回UnknownCustomer对象（而非"unknown"字符串），
         那么就必须同时修改所有客户端，让它们不要检查"unknown"字符串，而是调用isUnknown函数——这两个修改必须一次完成。
          我感觉这一大步修改就像一大块难吃的食物一样难以下咽。

  还好，遇到这种困境时，有一个常用的技巧可以帮忙。
    如果有一段代码需要在很多地方做修改（例如我们这里的“与特例做比对”的代码），我会先对其使用提炼函数（106）。
 */
function isUnknown(arg) {
  if (!((arg instanceof Customer) || (arg === "unknown")))
    throw new Error(`investigate bad value: <${arg}>`);
  return (arg === "unknown")
}

/*
我会放一个陷阱，捕捉意料之外的值。如果在重构过程中我犯了错误，引入了奇怪的行为，这个陷阱会帮我发现。

 现在，凡是检查未知顾客的地方，都可以改用这个函数了。我可以逐一修改这些地方，每次修改之后都可以执行测试。
*/

//客户端1...
let customerName;
if (isUnknown(aCustomer)) customerName = "occupant";
else customerName = aCustomer.name;

//没用多久，就全部修改完了。

// 客户端2...
const plan = (isUnknown(aCustomer)) ? registry.billingPlans.basic : aCustomer.billingPlan;

// 客户端3...
if (!isUnknown(aCustomer)) aCustomer.billingPlan = newPlan;

// 客户端4...
const weeksDelinquent = isUnknown(aCustomer) ? 0 : aCustomer.paymentHistory.weeksDelinquentInLastYear;

//一家提供公共事业服务的公司将自己的服务安装在各个场所（site）。

class Site {
    get customer() {
        return this._customer;
    }
}

//代表“顾客”的Customer类有多个属性，我只考虑其中3个。
class Customer {
    get name() {}
    get billingPlan() {}
    set billingPlan(arg) {}
    get paymentHistory() {}
}

/**
    大多数情况下，一个场所会对应一个顾客，但有些场所没有与之对应的顾客，可能是因为之前的住户搬走了，
 而新搬来的住户我还不知道是谁。这种情况下，数据记录中的customer字段会被填充为字符串"unknown"。
 因为这种情况时有发生，所以Site对象的客户端必须有办法处理“顾客未知”的情况。
     下面是一些示例代码片段。
 */

//客户端1...
const aCustomer = site.customer;
// ... lots of intervening code ...
let customerName;
if (aCustomer === "unknown")
    customerName = "occupant";
else
    customerName = aCustomer.name;

//客户端2...
const plan = (aCustomer === "unknown")
    ? registry.billingPlans.basic
    : aCustomer.billingPlan;

//客户端3...
if (aCustomer !== "unknown") aCustomer.billingPlan = newPlan;

//客户端4...
const weeksDelinquent = (aCustomer === "unknown")
    ? 0
    : aCustomer.paymentHistory.weeksDelinquentInLastYear;

/**
    浏览整个代码库，我看到有很多使用Site对象的客户端在处理“顾客未知”的情况，大多数都用了同样的应对方式：
 用"occupant"（居民）作为顾客名，使用基本的计价套餐，并认为这家顾客没有欠费。
 到处都在检查这种特例，再加上对特例的处理方式高度一致，这些现象告诉我：是时候使用特例对象（Special CaseObject）模式了。
 */



/**
    我首先给Customer添加一个函数，用于指示“这个顾客是否未知”。
 */

class Customer {
    get isUnknown() {
        return false;
    }
}

//然后我给“未知的顾客”专门创建一个类。
class UnknownCustomer {
    get isUnknown() {return true;}
}


/**
    注意，我没有把UnknownCustomer类声明为Customer的子类。在其他编程语言（尤其是静态类型的编程语言）中，我会需要继承关系。
 但JavaScript是一种动态类型语言，按照它的子类化规则，这里不声明继承关系反而更好。
 */
/**
    下面就是麻烦之处了。我必须在所有期望得到"unknown"值的地方返回这个新的特例对象，并修改所有检查"unknown"值的地方，令其
 使用新的isUnknown函数。一般而言，我总是希望细心安排修改过程，使我可以每次做一点小修改，然后马上测试。
    但如果我修改了Customer类，使其返回UnknownCustomer对象（而非"unknown"字符串），那么就必须同时修改所有客户端，让它们
 不要检查"unknown"字符串，而是调用isUnknown函数——这两个修改必须一次完成。我感觉这一大步修改就像一大块难吃的食物一样难以下咽。
    还好，遇到这种困境时，有一个常用的技巧可以帮忙。
     如果有一段代码需要在很多地方做修改（例如我们这里的“与特例做比对”的代码），我会先对其使用提炼函数（106）。
 */
function isUnknown(arg) {
    if (!((arg instanceof Customer) || (arg === "unknown")))
        throw new Error(`investigate bad value: <${arg}>`);
    return (arg === "unknown")
}

/**
    我会放一个陷阱，捕捉意料之外的值。如果在重构过程中我犯了错误，引入了奇怪的行为，这个陷阱会帮我发现。
 现在，凡是检查未知顾客的地方，都可以改用这个函数了。我可以逐一修改这些地方，每次修改之后都可以执行测试。
 */

//客户端1...
let customerName;
if (isUnknown(aCustomer))
    customerName = "occupant";
else
    customerName = aCustomer.name;

//没用多久，就全部修改完了。

// 客户端2...
const plan = (isUnknown(aCustomer)) ? registry.billingPlans.basic : aCustomer.billingPlan;

// 客户端3...
if (!isUnknown(aCustomer)) aCustomer.billingPlan = newPlan;

// 客户端4...
const weeksDelinquent = isUnknown(aCustomer) ? 0 : aCustomer.paymentHistory.weeksDelinquentInLastYear;




/**
  3.将所有调用处都改为使用isUnknown函数之后，就可以修改Site类，令其在顾客未知时返回UnknownCustomer对象。
 */

class Site {
    get customer() {
        return (this._customer === "unknown")
            ? new UnknownCustomer()
            : this._customer;
    }
}

/**
    然后修改isUnknown函数的判断逻辑。做完这步修改之后我可以做一次全文搜索，应该没有任何地方使用"unknown"字符串了。
    客户端1...
 */
function isUnknown(arg) {
    if (!(arg instanceof Customer || arg instanceof UnknownCustomer))
        throw new Error(`investigate bad value: <${arg}>`);
    return arg.isUnknown;
}

/**
    测试，以确保一切运转如常。
    现在，有趣的部分开始了。我可以逐一查看客户端检查特例的代码，看它们处理特例的逻辑，并考虑是否能用函数组合成类（144）
 将其替换为一个共同的、符合预期的值。
    此刻，有多处客户端代码用字符串"occupant"来作为未知顾客的名字，就像下面这样。
 */
// 客户端1...
let customerName;
if ( isUnknown(aCustomer) )  customerName = "occupant";
else customerName = aCustomer.name;

//我可以在UnknownCustomer类中添加一个合适的函数。

class UnknownCustomer{
   get name() {
     return "occupant";
   }
}
//然后我就可以去掉所有条件代码。
//客户端1...
const customerName = aCustomer.name;

/**
 测试通过之后，我可能会用内联变量（123）把customerName变量也消除掉。
    接下来处理代表“计价套餐”的billingPlan属性。
*/

//客户端2...
const plan = (isUnknown(aCustomer)) ? registry.billingPlans.basic : aCustomer.billingPlan;

//客户端3...
if (!isUnknown(aCustomer)) aCustomer.billingPlan = newPlan;

/**
   对于读取该属性的行为，我的处理方法跟前面处理name属性一样——找到通用的应对方式，并在UnknownCustomer中使用之。
      至于对该属性的写操作，当前的代码没有对未知顾客调用过设值函数，所以在特例对象中，我会保留设值函数，但其中什么都不做。
 */
class UnknownCustomer {
    get billingPlan() {
        return registry.billingPlans.basic;
    }
    set billingPlan(arg) {
        //ignore
    }
}
// 读取的例子...
const plan = aCustomer.billingPlan;

// 更新的例子...
aCustomer.billingPlan = newPlan;


/**
    特例对象是值对象，因此应该始终是不可变的，即便它们替代的原对象本身是可变的。
 最后一个例子则更麻烦一些，因为特例对象需要返回另一个对象，后者又有其自己的属性。
 */
//客户端...
const weeksDelinquent = isUnknown(aCustomer) ? 0 : aCustomer.paymentHistory.weeksDelinquentInLastYear;


/**
   一般的原则是：如果特例对象需要返回关联对象，被返回的通常也是特例对象。
       所以，我需要创建一个代表“空支付记录”的特例类NullPaymentHistory。
*/

class UnknownCustomer {
    get paymentHistory() {
        return new NullPaymentHistory();
    }
}

class NullPaymentHistory {
    get weeksDelinquentInLastYear() {
        return 0;
    }
}

//客户端...
const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;


/**
   我继续查看客户端代码，寻找是否有能用多态行为取代的地方。
      但也会有例外情况——客户端不想使用特例对象提供的逻辑，而是想做一些别的处理。
         我可能有23处客户端代码用"occupant"作为未知顾客的名字，但还有一处用了别的值。
 */
//客户端...
const name = !isUnknown(aCustomer) ? aCustomer.name : "unknown occupant";
/**
   这种情况下，我只能在客户端保留特例检查的逻辑。我会对其做些修改，让它使用aCustomer对象身上的isUnknown函数，
      也就是对全局的isUnknown函数使用内联函数（115）。
 */

//客户端...
const name = aCustomer.isUnknown ? "unknown occupant" : aCustomer.name;

//处理完所有客户端代码后，全局的isUnknown函数应该没人再调用了，可以用移除死代码（237）将其移除。











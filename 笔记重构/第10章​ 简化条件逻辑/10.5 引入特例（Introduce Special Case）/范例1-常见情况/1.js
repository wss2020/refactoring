//一家提供公共事业服务的公司将自己的服务安装在各个场所（site）。
class Site {
    get customer() {
        return this._customer;
    }
}

//代表“顾客”的Customer类有多个属性，我只考虑其中3个。
class Customer {
    get name() { }
    get billingPlan() { }
    set billingPlan(arg) { }
    get paymentHistory() { }
}

/*
   大多数情况下，一个场所会对应一个顾客，但有些场所没有与之对应的顾客，可能是因为之前的住户搬走了，而新搬来的住户我还不知道是谁。
     这种情况下，数据记录中的customer字段会被填充为字符串"unknown"。
     因为这种情况时有发生，所以Site对象的客户端必须有办法处理“顾客未知”的情况。
     下面是一些示例代码片段。
 */

//客户端1...
const aCustomer = site.customer;
// ... lots of intervening code ...
let customerName;
if (aCustomer === "unknown") customerName = "occupant";
else customerName = aCustomer.name;

//客户端2...
const plan = (aCustomer === "unknown") ? registry.billingPlans.basic : aCustomer.billingPlan;

//客户端3...
if (aCustomer !== "unknown") aCustomer.billingPlan = newPlan;

//客户端4...
const weeksDelinquent = (aCustomer === "unknown") ? 0 : aCustomer.paymentHistory.weeksDelinquentInLastYear;

/*

   浏览整个代码库，我看到有很多使用Site对象的客户端在处理“顾客未知”的情况，大多数都用了同样的应对方式：
       用"occupant"（居民）作为顾客名，使用基本的计价套餐，并认为这家顾客没有欠费。
         到处都在检查这种特例，再加上对特例的处理方式高度一致，这些现象告诉我：是时候使用特例对象（Special CaseObject）模式了。
 */
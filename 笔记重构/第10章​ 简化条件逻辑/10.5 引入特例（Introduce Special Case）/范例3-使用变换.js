/*
  前面两个例子都涉及了一个类，其实本重构手法也同样适用于记录，只要增加一个变换步骤即可。

  假设我们的输入是一个简单的记录结构，大概像这样：
 */

let data = {
    name: "Acme Boston",
    location: "Malden MA",
    customer: {
        name: "Acme Industries",
        billingPlan: "plan-451",
        paymentHistory: { weeksDelinquentInLastYear: 7},
    }
};

//有时顾客的名字未知，此时标记的方式与前面一样：将customer字段标记为字符串"unknown"。
let data1 = {
    name: "Warehouse Unit 15",
    location: "Malden MA",
    customer: "unknown",
};

// 客户端代码也类似，会检查“未知顾客”的情况：
//客户端1...
const site = acquireSiteData();
const aCustomer = site.customer;
let customerName;
if (aCustomer === "unknown") customerName = "occupant";
else customerName = aCustomer.name;

//客户端2...
const plan = (aCustomer === "unknown") ? registry.billingPlans.basic : aCustomer.billingPlan;

//客户端3...
const weeksDelinquent = (aCustomer === "unknown") ? 0 : aCustomer.paymentHistory.weeksDelinquentInLastYear;

//我首先要让Site数据结构经过一次变换，目前变换中只做了深复制，没有对数据做任何处理。

//客户端1...
const rawSite = acquireSiteData();
const site = enrichSite(rawSite);
const aCustomer = site.customer;
let customerName;
if (aCustomer === "unknown") customerName = "occupant";
else customerName = aCustomer.name;

function enrichSite(inputSite) {
    return _.cloneDeep(inputSite);
}

//然后对“检查未知顾客”的代码运用提炼函数（106）。
function isUnknown(aCustomer) {
    return aCustomer === "unknown";
}

//客户端1...
const rawSite = acquireSiteData();
const site = enrichSite(rawSite);
const aCustomer = site.customer;
let customerName;
if (isUnknown(aCustomer)) customerName = "occupant";
else customerName = aCustomer.name;

//客户端2...
const plan = (isUnknown(aCustomer)) ? registry.billingPlans.basic : aCustomer.billingPlan;

//客户端3...
const weeksDelinquent = (isUnknown(aCustomer)) ? 0 : aCustomer.paymentHistory.weeksDelinquentInLastYear;

//然后开始对Site数据做增强，首先是给customer字段加上isUnknown属性。
function enrichSite(aSite) {
    const result = _.cloneDeep(aSite);
    const unknownCustomer = {
        isUnknown: true,
    };
    if (isUnknown(result.customer)) result.customer = unknownCustomer;
    else result.customer.isUnknown = false;
    return result;
}

/*
    随后修改检查特例的条件逻辑，开始使用新的属性。原来的检查逻辑也保留不动，所以现在的检查逻辑应该既能应对原来的Site数据，
        也能应对增强后的Site数据。
*/
function isUnknown(aCustomer) {
    if (aCustomer === "unknown") return true;
    else return aCustomer.isUnknown;
}


//测试，确保一切正常，然后针对特例使用函数组合成变换（149）。首先把“未知顾客的名字”的处理逻辑搬进增强函数。
function enrichSite(aSite) {
    const result = _.cloneDeep(aSite);
    const unknownCustomer = {
        isUnknown: true,
        name: "occupant",
    };
    if (isUnknown(result.customer)) result.customer = unknownCustomer;
    else result.customer.isUnknown = false;
    return result;
}


//客户端1...
const rawSite = acquireSiteData();
const site = enrichSite(rawSite);
const aCustomer = site.customer;
const customerName = aCustomer.name;

//测试，然后是“未知顾客的计价套餐”的处理逻辑。
function enrichSite(aSite) {
    const result = _.cloneDeep(aSite);
    const unknownCustomer = {
        isUnknown: true,
        name: "occupant",
        billingPlan: registry.billingPlans.basic,
    };
    if (isUnknown(result.customer)) result.customer = unknownCustomer; else result.customer.isUnknown = false;
    return result;
}

//客户端2...
const plan = aCustomer.billingPlan;

//再次测试，然后处理最后一处客户端代码。
function enrichSite(aSite) {
    const result = _.cloneDeep(aSite);
    const unknownCustomer = {
        isUnknown: true,
        name: "occupant",
        billingPlan: registry.billingPlans.basic,
        paymentHistory: {
            weeksDelinquentInLastYear: 0,
        }
    };
    if (isUnknown(result.customer)) result.customer = unknownCustomer; else result.customer.isUnknown = false;
    return result;
}


//客户端3...
const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;
















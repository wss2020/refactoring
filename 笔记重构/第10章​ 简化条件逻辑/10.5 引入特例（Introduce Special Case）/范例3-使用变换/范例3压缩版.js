
let data = {
    name: "Acme Boston",
    location: "Malden MA",
    customer: {
        name: "Acme Industries",
        billingPlan: "plan-451",
        paymentHistory: { weeksDelinquentInLastYear: 7}
    }
};

//有时顾客的名字未知，此时标记的方式与前面一样：将customer字段标记为字符串"unknown"。
let data1 = {
    name: "Warehouse Unit 15",
    location: "Malden MA",
    customer: "unknown",
};

function isUnknown(aCustomer) {
    return aCustomer === "unknown";

    // if (aCustomer === "unknown") return true;
    // else return aCustomer.isUnknown;
}

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
    if (isUnknown(result.customer)) result.customer = unknownCustomer;
    else result.customer.isUnknown = false;
    return result;
}

const rawSite = acquireSiteData();
const site = enrichSite(rawSite);
const aCustomer = site.customer;

//客户端1...
const customerName = aCustomer.name;

//客户端2...
const plan = aCustomer.billingPlan;

//客户端3...
const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;






































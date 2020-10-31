//范例1
//原码
// 1
const pricingPlan = retrievePricingPlan();

// 3
const baseCharge = pricingPlan.base;

// 5
const chargePerUnit = pricingPlan.unit;

// 2
const order = retreiveOrder();
// 6
const units = order.units;


// 9
let discountableUnits = Math.max(units - pricingPlan.discountThreshold, 0);

// 7
let discount;
// 10
discount = discountableUnits * pricingPlan.discountFactor;

// 11
if (order.isRepeat) discount += 20;

// 4
let charge;
// 8
charge = baseCharge + units * chargePerUnit;
// 12
charge = charge - discount;
// 13
chargeOrder(charge);







//范例2
//原码
function test() {
    let result;
    if (availableResources.length === 0) {
        result = createResource();
        allocatedResources.push(result);
    } else {
        result = availableResources.pop();
        allocatedResources.push(result);
    }
    return result;
}

//重构
function test() {
    let result;
    if (availableResources.length === 0) {
        result = createResource();
    } else {
        result = availableResources.pop();
    }
    allocatedResources.push(result);
    return result;
}








































































































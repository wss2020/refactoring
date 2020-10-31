
/*
    我手上有一段“计算订单价格”的代码，至于订单中的商品是什么，我们从代码中看不出来，也不太关心。
 */

function priceOrder(product, quantity, shippingMethod) {
    const basePrice = product.basePrice * quantity;
    const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate;

    const shippingPerCase = (basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
    const shippingCost = quantity * shippingPerCase;
    const price = basePrice - discount + shippingCost;
    return price;
}

/*
   虽然只是个常见的、过于简单的范例，从中还是能看出有两个不同阶段存在的。
   前两行代码根据商品（product）信息计算订单中与商品相关的价格，随后的两行则根据配送（shipping）信息计算配送成本。
   后续的修改可能还会使价格和配送的计算逻辑变复杂，但只要这两块逻辑相对独立，将这段代码拆分成两个阶段就是有价值的。
 */
//1。我首先用提炼函数（106）把计算配送成本的逻辑提炼出来。
function priceOrder(product, quantity, shippingMethod) {
    const basePrice = product.basePrice * quantity;
    const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate;

    const price = applyShipping(basePrice, shippingMethod, quantity, discount);
    return price;
}

function applyShipping(basePrice, shippingMethod, quantity, discount) {
    const shippingPerCase = (basePrice > shippingMethod.discountThreshold)
        ? shippingMethod.discountedFee : shippingMethod.feePerCase;
    const shippingCost = quantity * shippingPerCase;
    const price = basePrice - discount + shippingCost;
    return price;
}


//2. 第二阶段需要的数据都以参数形式传入。在真实环境下，参数的数量可能会很多，但我对此并不担心，因为很快就会将这些参数消除掉。
//随后我会引入一个中转数据结构，使其在两阶段之间沟通信息。
function priceOrder(product, quantity, shippingMethod) {
    const basePrice = product.basePrice * quantity;
    const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate;
    const priceData = {};
    const price = applyShipping(priceData, basePrice, shippingMethod, quantity, discount);
    return price;
}

function applyShipping(priceData, basePrice, shippingMethod, quantity, discount) {
    const shippingPerCase = (basePrice > shippingMethod.discountThreshold)

        ? shippingMethod.discountedFee : shippingMethod.feePerCase;
    const shippingCost = quantity * shippingPerCase;
    const price = basePrice - discount + shippingCost;
    return price;
}


//3。现在我会审视applyShipping的各个参数。第一个参数basePrice是在第一阶段代码中创建的，因此我将其移入中转数据结构，并将其从参数列表中去掉。
function priceOrder(product, quantity, shippingMethod) {
    const basePrice = product.basePrice * quantity;
    const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate;
    const priceData = {basePrice: basePrice};
    const price = applyShipping(priceData, basePrice, shippingMethod, quantity, discount);
    return price;
}
function applyShipping(priceData, basePrice, shippingMethod, quantity, discount) {
    const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold)
        ? shippingMethod.discountedFee : shippingMethod.feePerCase;
    const shippingCost = quantity * shippingPerCase;
    const price = priceData.basePrice - discount + shippingCost;
    return price;
}


//4.下一个参数是shippingMethod。第一阶段中没有使用这项数据，所以它可以保留原样。
//再下一个参数是quantity。这个参数在第一阶段中用到，但不是在那里创建的，所以其实可以将其留在参数列表中。
// 但我更倾向于把尽可能多的参数搬移到中转数据结构中。

function priceOrder(product, quantity, shippingMethod) { const basePrice = product.basePrice * quantity;
    const discount = Math.max(quantity - product.discountThreshold, 0)
        * product.basePrice * product.discountRate;
    const priceData = {basePrice: basePrice, quantity: quantity};
    const price = applyShipping(priceData, shippingMethod, quantity, discount); return price;
}
function applyShipping(priceData, shippingMethod, quantity, discount) {
    const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
    const shippingCost = priceData.quantity * shippingPerCase;
    const price = priceData.basePrice - discount + shippingCost;
    return price;

}

//5.对discount参数我也如法炮制。
function priceOrder(product, quantity, shippingMethod) {
    const basePrice = product.basePrice * quantity;
    const discount = Math.max(quantity - product.discountThreshold, 0)

        * product.basePrice * product.discountRate;
    const priceData = {basePrice: basePrice, quantity: quantity, discount:discount};
    const price = applyShipping(priceData, shippingMethod, discount);
    return price;

}
function applyShipping(priceData, shippingMethod, discount) {
    const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
    const shippingCost = priceData.quantity * shippingPerCase;
    const price = priceData.basePrice - priceData.discount + shippingCost;
    return price;
}


//6.处理完参数列表后，中转数据结构得到了完整的填充，现在我可以把第一阶段代码提炼成独立的函数，令其返回这份数据。
function priceOrder(product, quantity, shippingMethod) {
    const priceData = calculatePricingData(product, quantity);
    const price = applyShipping(priceData, shippingMethod);
    return price;
}
function calculatePricingData(product, quantity) {
    const basePrice = product.basePrice * quantity;
    const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate;
    return {basePrice: basePrice, quantity: quantity, discount: discount};
}
function applyShipping(priceData, shippingMethod) {
    const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
    const shippingCost = priceData.quantity * shippingPerCase;
    const price = priceData.basePrice - priceData.discount + shippingCost;
    return price;
}



//7.两个函数中，最后一个const变量都是多余的，我忍不住洁癖，将它们内联消除掉。
function priceOrder(product, quantity, shippingMethod) {
    const priceData = calculatePricingData(product, quantity);
    return applyShipping(priceData, shippingMethod);
}
function calculatePricingData(product, quantity) {
    const basePrice = product.basePrice * quantity;
    const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate;
    return {basePrice: basePrice, quantity: quantity, discount:discount};
}
function applyShipping(priceData, shippingMethod) {
    const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
    const shippingCost = priceData.quantity * shippingPerCase; return priceData.basePrice - priceData.discount + shippingCost;
}

























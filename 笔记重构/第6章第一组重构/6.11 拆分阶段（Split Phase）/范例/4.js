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

/**
    4.下一个参数是shippingMethod。第一阶段中没有使用这项数据，所以它可以保留原样。
    再下一个参数是quantity。这个参数在第一阶段中用到，但不是在那里创建的，所以其实可以将其留在参数列表中。
    但我更倾向于把尽可能多的参数搬移到中转数据结构中。
 **/





/**
 4.下一个参数是shippingMethod。第一阶段中没有使用这项数据，所以它可以保留原样。
 再下一个参数是quantity。这个参数在第一阶段中用到，但不是在那里创建的，所以其实可以将其留在参数列表中。
 但我更倾向于把尽可能多的参数搬移到中转数据结构中。
 **/

function priceOrder(product, quantity, shippingMethod) {
    const basePrice = product.basePrice * quantity;
    const discount = Math.max(quantity - product.discountThreshold, 0)
        * product.basePrice * product.discountRate;
    const priceData = {basePrice: basePrice, quantity: quantity};
    const price = applyShipping(priceData, shippingMethod, quantity, discount); return price;
}
function applyShipping(priceData, shippingMethod, quantity, discount) {
    const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold)
        ? shippingMethod.discountedFee : shippingMethod.feePerCase;
    const shippingCost = priceData.quantity * shippingPerCase;
    const price = priceData.basePrice - discount + shippingCost;
    return price;

}




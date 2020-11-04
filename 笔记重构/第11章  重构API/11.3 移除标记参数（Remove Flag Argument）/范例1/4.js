/**
     处理完所有调用处，我就可以移除deliveryDate函数。
 这个参数是标记参数，不仅因为它是布尔类型，而且还因为调用方以字面量的形式直接设置参数值。
 */
function rushDeliveryDate(anOrder) {
    let deliveryTime;
    if (["MA", "CT"] .includes(anOrder.deliveryState)) deliveryTime = 1;
    else if (["NY", "NH"].includes(anOrder.deliveryState)) deliveryTime = 2;
    else deliveryTime = 3;
    return anOrder.placedOn.plusDays(1 + deliveryTime);
}
function regularDeliveryDate(anOrder) {
    let deliveryTime;
    if (["MA", "CT", "NY"].includes(anOrder.deliveryState)) deliveryTime = 2;
    else if (["ME", "NH"] .includes(anOrder.deliveryState)) deliveryTime = 3;
    else deliveryTime = 4;
    return anOrder.placedOn.plusDays(2 + deliveryTime);
}
aShipment.deliveryDate = rushDeliveryDate(anOrder);
//或者
aShipment.deliveryDate = regularDeliveryDate(anOrder);




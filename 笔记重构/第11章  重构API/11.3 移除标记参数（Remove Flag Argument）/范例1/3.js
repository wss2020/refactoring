function deliveryDate(anOrder, isRush) {
    if (isRush) return rushDeliveryDate(anOrder);
    else return regularDeliveryDate(anOrder);
}
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

//这两个函数能更好地表达调用者的意图，现在我可以修改调用方代码了。调用代码
aShipment.deliveryDate = deliveryDate(anOrder, true);
//可以改为
aShipment.deliveryDate = rushDeliveryDate(anOrder);


aShipment.deliveryDate = deliveryDate(anOrder, false);
//可以改为
aShipment.deliveryDate = regularDeliveryDate(anOrder);


/**
 处理完所有调用处，我就可以移除deliveryDate函数。
 这个参数是标记参数，不仅因为它是布尔类型，而且还因为调用方以字面量的形式直接设置参数值。
 如果所有调用deliveryDate的代码都像这样：
 */


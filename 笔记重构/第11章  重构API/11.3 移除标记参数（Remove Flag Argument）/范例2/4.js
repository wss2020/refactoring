/**
 本质上，这两个包装函数分别代表了deliveryDate函数一部分的使用方式。不过它们并非从原函数中拆分而来，而是用代码文本强行定义的。

 随后，我同样可以逐一替换原函数的调用者，就跟前面分解条件表达式之后的处理一样。如果没有任何一个调用者向isRush参数传入正常的数据，
 我最后会限制原函数的可见性，或是将其改名（例如改为deliveryDateHelperOnly），让人一见即知不应直接使用这个函数。
 */
function rushDeliveryDate (anOrder) {
    return deliveryDateHelperOnly(anOrder, true);
}
function regularDeliveryDate(anOrder) {
    return deliveryDateHelperOnly(anOrder, false);
}
function deliveryDateHelperOnly(anOrder, isRush) {
    let result;
    let deliveryTime;
    if (anOrder.deliveryState === "MA" || anOrder.deliveryState === "CT") deliveryTime = isRush? 1 : 2;
    else if (anOrder.deliveryState === "NY" || anOrder.deliveryState === "NH") { deliveryTime = 2;
        if (anOrder.deliveryState === "NH" && !isRush) deliveryTime = 3;
    }
    else if (isRush) deliveryTime = 3;
    else if (anOrder.deliveryState === "ME") deliveryTime = 3;
    else deliveryTime = 4;
    result = anOrder.placedOn.plusDays(2 + deliveryTime); if (isRush) result = result.minusDays(1);
    return result;
}


aShipment.deliveryDate = determineIfRush(anOrder)
                         ? rushDeliveryDate(anOrder)
                         : regularDeliveryDate(anOrder);





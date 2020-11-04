aShipment.deliveryDate = deliveryDate(anOrder, true);

//另一些调用代码则是这样：
aShipment.deliveryDate = deliveryDate(anOrder, false);

/**
 原来调用者用这个布尔型字面量来判断应该运行哪个分支的代码——典型的标记参数。然而函数的重点就在于要遵循调用者的指令，
 所以最好是用明确函数的形式明确说出调用者的意图。
 */
//对于这个例子，我可以使用分解条件表达式（260），得到下列代码：
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


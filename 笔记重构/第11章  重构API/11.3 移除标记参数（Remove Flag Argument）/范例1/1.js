/**
    在浏览代码时，我发现多处代码在调用一个函数计算物流（shipment）的到货日期（delivery date）。
 一些调用代码类似这样：
*/
aShipment.deliveryDate = deliveryDate(anOrder, true);

//另一些调用代码则是这样：
aShipment.deliveryDate = deliveryDate(anOrder, false);

//面对这样的代码，我立即开始好奇：参数里这个布尔值是什么意思？是用来干什么的？
//deliveryDate函数主体如下所示：
function deliveryDate(anOrder, isRush) {
    if (isRush) {
        let deliveryTime;
        if (["MA", "CT"].includes(anOrder.deliveryState)) deliveryTime = 1;
        else if (["NY", "NH"].includes(anOrder.deliveryState)) deliveryTime = 2;
        else deliveryTime = 3;
        return anOrder.placedOn.plusDays(1 + deliveryTime);
    } else {
            let deliveryTime;
            if (["MA", "CT", "NY"].includes(anOrder.deliveryState)) deliveryTime = 2;
            else if (["ME", "NH"] .includes(anOrder.deliveryState)) deliveryTime = 3;
            else deliveryTime = 4;
            return anOrder.placedOn.plusDays(2 + deliveryTime);
        }
}

/**
    原来调用者用这个布尔型字面量来判断应该运行哪个分支的代码——典型的标记参数。然而函数的重点就在于要遵循调用者的指令，
 所以最好是用明确函数的形式明确说出调用者的意图。
*/

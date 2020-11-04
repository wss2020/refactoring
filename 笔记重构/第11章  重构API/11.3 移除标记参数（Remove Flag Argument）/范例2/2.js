/**
    那我对这个函数的签名没有任何意见（不过我还是想用分解条件表达式（260）清理其内部实现）。
 可能有一些调用者给这个参数传入的是字面量，将其作为标记参数使用；另一些调用者则传入正常的数据。
 若果真如此，我还是会使用移除标记参数（314），但不修改传入正常数据的调用者，重构结束时也不删除
 deliveryDate函数。这样我就提供了两套接口，分别支持不同的用途。

    直接拆分条件逻辑是实施本重构的好方法，但只有当“根据参数值做分发”的逻辑发生在函数最外层
 （或者可以比较容易地将其重构至函数最外层）的时候， 这一招才好用。函数内部也有可能以一种更
 纠结的方式使用标记参数，例如下面
 */
//这个版本的deliveryDate函数：
function deliveryDate(anOrder, isRush) {
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

const isRush = determineIfRush(anOrder);
aShipment.deliveryDate = deliveryDate(anOrder, isRush);



/**
 这种情况下，想把围绕isRush的分发逻辑剥离到顶层，需要的工作量可能会很大。所以我选择退而求其次，
 在deliveryDate之上添加两个函数：
 */

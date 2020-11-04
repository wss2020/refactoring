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
 如果所有调用deliveryDate的代码都像这样：
 */
const isRush = determineIfRush(anOrder);
aShipment.deliveryDate = deliveryDate(anOrder, isRush);


/**
 那我对这个函数的签名没有任何意见（不过我还是想用分解条件表达式（260）清理其内部实现）。
 可能有一些调用者给这个参数传入的是字面量，将其作为标记参数使用；另一些调用者则传入正常的数据。
 若果真如此，我还是会使用移除标记参数（314），但不修改传入正常数据的调用者，重构结束时也不删除
 deliveryDate函数。这样我就提供了两套接口，分别支持不同的用途。

 直接拆分条件逻辑是实施本重构的好方法，但只有当“根据参数值做分发”的逻辑发生在函数最外层
 （或者可以比较容易地将其重构至函数最外层）的时候， 这一招才好用。函数内部也有可能以一种更
 纠结的方式使用标记参数，例如下面
 */


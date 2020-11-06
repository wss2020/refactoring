//我们从一个简单计算开始：
function price(order) {
    //price is base price - quantity discount + shipping
    return order.quantity * order.itemPrice -
        Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
        Math.min(order.quantity * order.itemPrice * 0.1, 100);
}

/**
    这段代码还算简单，不过我可以让它变得更容易理解。首先，我发现，底价（base price）等于数量（quantity）乘以
 单价（item price）。
    我把这一新学到的知识放进代码里，创建一个变量，并给它起个合适的名字：
 稍后的代码还用到了同样的表达式，也可以用新建的变量取代之。
*/



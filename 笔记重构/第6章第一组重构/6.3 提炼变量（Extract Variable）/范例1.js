

//我们从一个简单计算开始：
function price(order) {
    //price is base price - quantity discount + shipping
    return order.quantity * order.itemPrice -
         Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
         Math.min(order.quantity * order.itemPrice * 0.1, 100);
}
//这段代码还算简单，不过我可以让它变得更容易理解。首先，我发现，底价（base price）等于数量（quantity）乘以单价（item price）。
//1.我把这一新学到的知识放进代码里，创建一个变量，并给它起个合适的名字：    稍后的代码还用到了同样的表达式，也可以用新建的变量取代之。
function price(order) {
    //price is base price - quantity discount + shipping
    const basePrice = order.quantity * order.itemPrice;
    return basePrice -
        Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
        Math.min(basePrice * 0.1, 100);
}
//2.下一行是计算批发折扣（quantity discount）的逻辑，我也将它提炼出来：
function price(order) {
     //price is base price - quantity discount + shipping
    const basePrice = order.quantity * order.itemPrice;
    const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
    return basePrice - quantityDiscount + Math.min(basePrice * 0.1, 100);
}
//3.最后，我再把运费（shipping）计算提炼出来。同时我还可以删掉代码中的注释，因为现在代码已经可以完美表达自己的意义了：
function price(order) {
    const basePrice = order.quantity * order.itemPrice;
    const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
    const shipping = Math.min(basePrice * 0.1, 100);
    return basePrice - quantityDiscount + shipping;
}

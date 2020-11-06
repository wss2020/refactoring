//在收工之前，我还要修改返回值的名字，使其符合我一贯的编码风格。
function printOwing(invoice) {
    printBanner();
    const outstanding = calculateOutstanding(invoice);
    recordDueDate(invoice);
    printDetails(invoice, outstanding);
}

function calculateOutstanding(invoice) {
    let result = 0;
    for (const o of invoice.orders) {
        result += o.amount;
    }
    return result;
}


/**
    我还顺手把原来的outstanding变量声明成const的，令其在初始化之后不能再次被赋值。

    这时候，你可能会问：“如果需要返回的变量不止一个，又该怎么办呢？”

    有几种选择。最好的选择通常是：挑选另一块代码来提炼。我比较喜欢让每个函数都只返回一个值，所以我会安排多个函数，
 用以返回多个值。如果真的有必要提炼一个函数并返回多个值，可以构造并返回一个记录对象—不过通常更好的办法还是回过头
 来重新处理局部变量，我常用的重构手法有以查询取代临时变量（178）和拆分变量（240）。

    如果我想把提炼出的函数搬移到别的上下文（例如变成顶层函数），会引发一些有趣的问题。我偏好小步前进，所以我本能
 的做法是先提炼成嵌套函数，然后再将其移入新的上下文。但这种做法的麻烦在于处理局部变量，而这个困难无法提前发现，
 直到我开始最后的搬移时才突然暴露。从这个角度考虑，即便可以先提炼成嵌套函数，或许也应该至少将目标函数放在源函数的
 同级，这样我就能立即看出提炼的范围是否合理。
 */





















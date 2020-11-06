/**
    不过实际情况可能不会这么简单，需要我多做一点儿工作，帮助代码融入它的新家。
 例如，开始时的代码与前面稍有不同：
*/
function rating(aDriver) {
    return moreThanFiveLateDeliveries(aDriver) ? 2 : 1;
}
function moreThanFiveLateDeliveries(dvr) {
    return dvr.numberOfLateDeliveries > 5;
}



/**
    几乎是一样的代码，但moreThanFiveLateDeliveries函数声明的形式参数名。
 与调用处使用的变量名不同，所以我在内联时需要对代码做些微调。
*/
function rating(aDriver) {
    return aDriver.numberOfLateDeliveries > 5 ? 2 : 1;
}





//情况还可能更复杂。例如，请看下列代码：



















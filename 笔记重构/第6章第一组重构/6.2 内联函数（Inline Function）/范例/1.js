//在最简单的情况下，这个重构简单得不值一提。一开始的代码是这样：
function rating(aDriver) {
    return moreThanFiveLateDeliveries(aDriver) ? 2 : 1;
}
function moreThanFiveLateDeliveries(aDriver) {
    return aDriver.numberOfLateDeliveries > 5;
}

//我只要把被调用的函数的return语句复制出来，粘贴到调用处，取代原本的函数调用，就行了。
function rating1(aDriver) {
    return aDriver.numberOfLateDeliveries > 5 ? 2 : 1;
}




//不过实际情况可能不会这么简单，需要我多做一点儿工作，帮助代码融入它的新家。例如，开始时的代码与前面稍有不同：

















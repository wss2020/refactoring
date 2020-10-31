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
function rating(aDriver) {
    return moreThanFiveLateDeliveries(aDriver) ? 2 : 1;
}
function moreThanFiveLateDeliveries(dvr) {
    return dvr.numberOfLateDeliveries > 5;
}
//几乎是一样的代码，但moreThanFiveLateDeliveries函数声明的形式参数名。   与调用处使用的变量名不同，所以我在内联时需要对代码做些微调。

function rating(aDriver) {
    return aDriver.numberOfLateDeliveries > 5 ? 2 : 1;
}





//情况还可能更复杂。例如，请看下列代码：
function reportLines(aCustomer) {
    const lines = [];
    gatherCustomerData(lines, aCustomer);
    return lines;
}
function gatherCustomerData(out, aCustomer) {
    out.push(["name", aCustomer.name]);
    out.push(["location", aCustomer.location]);
}
//我要把gatherCustomerData内联到reportLines中，这时简单的剪切和粘贴就不够了。
// 这段代码还不算很麻烦，大多数时候我还是一步到位地完成了重构，只是需要做些调整。
// 如果想更谨慎些，也可以每次搬移一行代码：可以首先对第一行代码使用搬移语句到调用者（217）——我还是用简单的“剪切-粘贴-调整”方式进行。
function reportLines(aCustomer) {
    const lines = [];
    lines.push(["name", aCustomer.name]);
    gatherCustomerData(lines, aCustomer);
    return lines;
}
function gatherCustomerData(out, aCustomer) {
    out.push(["name", aCustomer.name]);
    out.push(["location", aCustomer.location]);
}
//然后继续处理后面的代码行，直到完成整个重构。
function reportLines(aCustomer) {
    const lines = [];
    lines.push(["name", aCustomer.name]);
    lines.push(["location", aCustomer.location]);
    return lines;
}



/*
* 重点在于始终小步前进。大多数时候，由于我平时写的函数都很小，内联函数可以一步完成，顶多需要一点代码调整。
* 但如果遇到了复杂的情况，我会每次内联一行代码。
* 哪怕只是处理一行代码，也可能遇到麻烦，那么我就会使用更精细的重构手法搬移语句到调用者（217），将步子再拆细一点。
* 有时我会自信满满地快速完成重构，然后测试却失败了，这时我会回退到上一个能通过测试的版本，带着一点儿懊恼，以更小的步伐再次重构。
*
* */

































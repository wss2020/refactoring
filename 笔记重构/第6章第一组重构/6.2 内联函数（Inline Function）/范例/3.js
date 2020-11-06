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


/**
    我要把gatherCustomerData内联到reportLines中，这时简单的剪切和粘贴就不够了。
    这段代码还不算很麻烦，大多数时候我还是一步到位地完成了重构，只是需要做些调整。
     如果想更谨慎些，也可以每次搬移一行代码：可以首先对第一行代码使用搬移语句到调用者（217）——
 我还是用简单的“剪切-粘贴-调整”方式进行。
 */
























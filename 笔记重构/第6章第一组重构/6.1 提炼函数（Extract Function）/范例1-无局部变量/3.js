//同样，我还可以把“打印详细信息”部分也提炼出来：
function printOwing(invoice) {
    let outstanding = 0;
    printBanner();

    // calculate outstanding
    for (const o of invoice.orders) {
        outstanding += o.amount;
    }

    // record due date
    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);


    printDetails();
    function printDetails() {
        console.log(`name: ${invoice.customer}`);
        console.log(`amount: ${outstanding}`);
        console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
    }
}
function printBanner() {
    console.log("***********************");
    console.log("**** Customer Owes ****");
    console.log("***********************");
}





/**
    看起来提炼函数是一个极其简单的重构。但很多时候，情况会变得比较复杂。
    在上面的例子中，我把printDetails函数嵌套在printOwing函数内部，这样前者就能访问到printOwing内部定义的
 所有变量。如果我使用的编程语言不支持嵌套函数，就没法这样操作了，那么我就要面对“提炼出一个顶层函数”的问题。此时我
 必须细心处理“只存在于源函数作用域”的变量，包括源函数的参数以及源函数内部定义的临时变量。
 */















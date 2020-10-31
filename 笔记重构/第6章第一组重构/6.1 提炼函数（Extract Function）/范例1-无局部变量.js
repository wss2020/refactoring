//在最简单的情况下，提炼函数易如反掌。请看下列函数：
function printOwing(invoice) {
    let outstanding = 0;

    console.log("***********************");
    console.log("**** Customer Owes ****");
    console.log("***********************");

// calculate outstanding
    for (const o of invoice.orders) {
        outstanding += o.amount;
    }

// record due date
    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

//print details
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
    console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}



/*
   你可能会好奇Clock.today是干什么的。这是一个Clock Wrapper[mf-cw]，也就是封装系统时钟调用的对象。我尽量避免在代码中直接调用Date.now()这样的函数，
因为这会导致测试行为不可预测，以及在诊断故障时难以复制出错时的情况。
*/

//1. 我们可以轻松提炼出“打印横幅”的代码。我只需要剪切、粘贴再插入一个函数调用动作就行了：
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

//print details
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
    console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);

}
function printBanner() {
    console.log("***********************");
    console.log("**** Customer Owes ****");
    console.log("***********************");
}




//2.同样，我还可以把“打印详细信息”部分也提炼出来：
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

/*
看起来提炼函数是一个极其简单的重构。但很多时候，情况会变得比较复杂。

   在上面的例子中，我把printDetails函数嵌套在printOwing函数内部，这样前者就能访问到printOwing内部定义的所有变量。如果我使用的编程语言不支持
嵌套函数，就没法这样操作了，那么我就要面对“提炼出一个顶层函数”的问题。此时我必须细心处理“只存在于源函数作用域”的变量，包括源函数的参数以及源函数内部
定义的临时变量。

 */















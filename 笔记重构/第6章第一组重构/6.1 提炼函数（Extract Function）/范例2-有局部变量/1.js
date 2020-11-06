/**
   局部变量最简单的情况是：被提炼代码段只是读取这些变量的值，并不修改它们。这种情况下我可以简单地将它们当作参数传给目标函数。
所以，如果我面对下列函数：
*/

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


//就可以将“打印详细信息”这一部分提炼为带两个参数的函数：

































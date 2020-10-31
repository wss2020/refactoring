/*
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



//1.就可以将“打印详细信息”这一部分提炼为带两个参数的函数：
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
    printDetails(invoice, outstanding);
}

function printDetails(invoice, outstanding) {
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
    console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}


/*
   2.如果局部变量是一个数据结构（例如数组、记录或者对象），而被提炼代码段又修改了这个结构中的数据，也可以如法炮制。所以，“设置到期日”的逻辑
也可以用同样的方式提炼出来：
 */
function printOwing(invoice) {
    let outstanding = 0;

    printBanner();

// calculate outstanding
    for (const o of invoice.orders) {
        outstanding += o.amount;
    }

    recordDueDate(invoice);
    printDetails(invoice, outstanding);

}

function recordDueDate(invoice) {
    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}

















































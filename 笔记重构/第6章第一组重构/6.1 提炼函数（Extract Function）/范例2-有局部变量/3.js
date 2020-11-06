/**
 如果局部变量是一个数据结构（例如数组、记录或者对象），而被提炼代码段又修改了这个结构中的数据，
 也可以如法炮制。所以，“设置到期日”的逻辑也可以用同样的方式提炼出来：
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

function printBanner() {
    console.log("***********************");
    console.log("**** Customer Owes ****");
    console.log("***********************");
}

function printDetails(invoice, outstanding) {
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
    console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}

function recordDueDate(invoice) {
    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}


















































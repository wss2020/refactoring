//范例1
//原码
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



//重构后
function printBanner() {
    console.log("***********************");
    console.log("**** Customer Owes ****");
    console.log("***********************");
}

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








//范例2
//原码
function printOwing(invoice) {
    let outstanding = 0;

    printBanner();

    for (const o of invoice.orders) {
        outstanding += o.amount;
    }

    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
    console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);

}

//重构后
function printOwing(invoice) {
    let outstanding = 0;

    printBanner();

    for (const o of invoice.orders) {
        outstanding += o.amount;
    }

    recordDueDate(invoice);
    printDetails(invoice, outstanding);

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




//范例3
//最终版本
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





























































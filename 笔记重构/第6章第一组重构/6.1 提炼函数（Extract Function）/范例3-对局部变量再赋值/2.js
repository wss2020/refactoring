/**
    前面的重构我都一步到位地展示了结果，因为它们都很简单。但这次我会一步一步展示“做法”里的每个步骤。
    首先，把变量声明移动到使用处之前。
 */
function printOwing(invoice) {
    printBanner();

    let outstanding = 0;
    for (const o of invoice.orders) {
        outstanding += o.amount;

    }

    recordDueDate(invoice);
    printDetails(invoice, outstanding);
}



//然后把想要提炼的代码复制到目标函数中。











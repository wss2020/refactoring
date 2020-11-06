//然后把想要提炼的代码复制到目标函数中。
function printOwing(invoice) {
    printBanner();

    let outstanding = 0;
    for (const o of invoice.orders) {
        outstanding += o.amount;
    }

    recordDueDate(invoice);
    printDetails(invoice, outstanding);

}
function calculateOutstanding(invoice) {
    let outstanding = 0;
    for (const o of invoice.orders) {
        outstanding += o.amount;
    }
    return outstanding;
}

/**
    由于outstanding变量的声明已经被搬移到提炼出的新函数中，就不需要再将其作为参数传入了。outstanding是
 提炼代码段中唯一被重新赋值的变量，所以我可以直接返回它。

    我的JavaScript环境在编译期提供不了任何价值——简直还不如文本编辑器的语法分析有用，所以“做法”里的“编译”
 一步可以跳过了。下一件事是修改原来的代码，令其调用新函数。新函数返回了修改后的outstanding变量值，我需要
 将其存入原来的变量中.
 */









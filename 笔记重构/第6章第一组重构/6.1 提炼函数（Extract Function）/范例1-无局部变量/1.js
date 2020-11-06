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



/**
   你可能会好奇Clock.today是干什么的。这是一个Clock Wrapper[mf-cw]，也就是封装系统时钟调用的对象。
 我尽量避免在代码中直接调用Date.now()这样的函数，因为这会导致测试行为不可预测，以及在诊断故障时难以复制
 出错时的情况。
*/

// 我们可以轻松提炼出“打印横幅”的代码。我只需要剪切、粘贴再插入一个函数调用动作就行了：

//重构前
function getTotalOutstandingAndSendBill() {
    const result = customer.invoices.reduce((total, each) => each.amount + total, 0);
    sendBill();
    return result;
}


//重构后
function totalOutstanding() {
    return customer.invoices.reduce((total, each) => each.amount + total, 0);
}

function sendBill() {
    emailGateway.send(formatBill(customer));
}

/**
 动机
 如果某个函数只是提供一个值，没有任何看得到的副作用，那么这是一个很有价值的东西。我可以任意
 调用这个函数，也可以把调用动作搬到调用函数的其他地方。这种函数的测试也更容易。简而言之，需要操
 心的事情少多了。

 明确表现出“有副作用”与“无副作用”两种函数之间的差异，是个很好的想法。下面是一条好规则：任何
 有返回值的函数，都不应该有看得到的副作用——命令与查询分离（Command-Query Separation）
 [mf-cqs]。有些程序员甚至将此作为一条必须遵守的规则。就像对待任何东西一样，我并不绝对遵守它，
 不过我总是尽量遵守，而它也回报我很好的效果。

 如果遇到一个“既有返回值又有副作用”的函数，我就会试着将查询动作从修改动作中分离出来。

 你也许已经注意到了：我使用“看得到的副作用”这种说法。有一种常见的优化办法是：将查询所得结果
 缓存于某个字段中，这样一来后续的重复查询就可以大大加快速度。虽然这种做法改变了对象中缓存的状态，
 但这一修改是察觉不到的，因为不论如何查询，总是获得相同结果。

 */


/**
 做法
 复制整个函数，将其作为一个查询来命名。
    注意：如果想不出好名字，可以看看函数返回的是什么。查询的结果会被填入一个变量，这个变量的名字应该能对函数如何命名有所启发。
 从新建的查询函数中去掉所有造成副作用的语句。
 执行静态检查。
 查找所有调用原函数的地方。如果调用处用到了该函数的返回值，就将其改为调用新建的查询函数，并在下面马上再调用一次原函数。每次修改之后都要测试。
 从原函数中去掉返回值。
 测试。

 完成重构之后，查询函数与原函数之间常会有重复代码，可以做必要的清理。
 */









































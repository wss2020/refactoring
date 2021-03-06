
//修改前
const orderData = orderString.split(/\s+/);
const productPrice = priceList[orderData[0].split("-")[1]];
const orderPrice = parseInt(orderData[1]) * productPrice;


//修改后
const orderRecord = parseOrder(order);
const orderPrice = price(orderRecord, priceList);
function parseOrder(aString) {
    const values = aString.split(/\s+/);
    return ({
            productID: values[0].split("-")[1],
            quantity: parseInt(values[1]),
    });
}
function price(order, priceList) {
    return order.quantity * priceList[order.productID];
}


/**
动机

   每当看见一段代码在同时处理两件不同的事，我就想把它拆分成各自独立的模块，
     因为这样到了需要修改的时候，我就可以单独处理每个主题，而不必同时在脑子里考虑两个不同的主题。
     如果运气够好的话，我可能只需要修改其中一个模块，完全不用回忆起另一个模块的诸般细节。

   最简洁的拆分方法之一，就是把一大段行为分成顺序执行的两个阶段。
    可能你有一段处理逻辑，其输入数据的格式不符合计算逻辑的要求，所以你得先对输入数据做一番调整，使其便于处理。
    也可能是你把数据处理逻辑分成顺序执行的多个步骤，每个步骤负责的任务全然不同。

   编译器是最典型的例子。
    编译器的任务很直观：接受文本（用某种编程语言编写的代码）作为输入，将其转换成某种可执行的格式（例如针对某种特定硬件的目标码）。
    随着经验加深，我们发现把这项大任务拆分成一系列阶段会很有帮助：
      首先对文本做词法分析，然后把token解析成语法树，然后再对语法树做几步转换（如优化），最后生成目标码。
      每一步都有边界明确的范围，我可以聚焦思考其中一步，而不用理解其他步骤的细节。

   在大型软件中，类似这样的阶段拆分很常见，例如编译器的每个阶段又包含若干函数和类。
     即便只有不大的一块代码，只要我发现了有益的将其拆分成多个阶段的机会，同样可以运用拆分阶段重构手法。
     如果一块代码中出现了上下几段，各自使用不同的一组数据和函数，这就是最明显的线索。
     将这些代码片段拆分成各自独立的模块，能更明确地标示出它们之间的差异。
 */

/**
做法

   将第二阶段的代码提炼成独立的函数。
   测试。
   引入一个中转数据结构，将其作为参数添加到提炼出的新函数的参数列表中。
   测试。
   逐一检查提炼出的“第二阶段函数”的每个参数。如果某个参数被第一阶段用到，就将其移入中转数据结构。每次搬移之后都要执行测试。

   有时第二阶段根本不应该使用某个参数。
    果真如此，就把使用该参数得到的结果全都提炼成中转数据结构的字段，
    然后用搬移语句到调用者（217）把使用该参数的代码行搬移到“第二阶段函数”之外。

   对第一阶段的代码运用提炼函数（106），让提炼出的函数返回中转数据结构。
   也可以把第一阶段提炼成一个变换（transform）对象。
 */































/**
    在上面的示例中，我直接编写了新函数。大多数时候，这一步非常简单，也是创建新函数最容易的方式。不过有时还会用到另一种方式：
 可以完全通过重构手法的组合来得到新函数。

 我从一处调用现有函数的代码开始。调用方...
*/
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if (!aPlan.withinRange(low, high))
    alerts.push("room temperature went outside range");


/**
    我要先对代码做一些整理，以便用提炼函数（106）来创建新函数。目前的调用者代码还不具备可提炼的函数雏形，不过我可以先做几次
 提炼变量（119），使其轮廓显现出来。
    首先，我要把对旧函数的调用从条件判断中解放出来。
 */




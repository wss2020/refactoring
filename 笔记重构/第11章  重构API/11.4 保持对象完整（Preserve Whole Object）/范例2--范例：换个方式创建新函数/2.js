/**
    我要先对代码做一些整理，以便用提炼函数（106）来创建新函数。目前的调用者代码还不具备可提炼的函数雏形，不过我可以先做几次
 提炼变量（119），使其轮廓显现出来。
    首先，我要把对旧函数的调用从条件判断中解放出来。
 */
// 调用方...
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
const isWithinRange = aPlan.withinRange(low, high);
if (!isWithinRange)
    alerts.push("room temperature went outside range");



// 然后把输入参数也提炼出来。调用方...

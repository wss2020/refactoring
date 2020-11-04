
// 然后把输入参数也提炼出来。调用方...
const tempRange = aRoom.daysTempRange;
const low = tempRange.low;
const high = tempRange.high;
const isWithinRange = aPlan.withinRange(low, high);
if (!isWithinRange)
    alerts.push("room temperature went outside range");


// 完成这一步之后，就可以用提炼函数（106）来创建新函数。

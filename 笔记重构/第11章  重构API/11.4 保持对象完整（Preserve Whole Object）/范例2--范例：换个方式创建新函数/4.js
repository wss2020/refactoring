// 完成这一步之后，就可以用提炼函数（106）来创建新函数。
// 调用方...
const tempRange = aRoom.daysTempRange;
const isWithinRange = xxNEWwithinRange(aPlan, tempRange);
if (!isWithinRange)
    alerts.push("room temperature went outside range");


// 顶层作用域...
function xxNEWwithinRange(aPlan, tempRange) {
    const low = tempRange.low;
    const high = tempRange.high;
    const isWithinRange = aPlan.withinRange(low, high);
    return isWithinRange;
}


// 由于旧函数属于另一个上下文（HeatingPlan类），我需要用搬移函数（198）把新函数也搬过去。

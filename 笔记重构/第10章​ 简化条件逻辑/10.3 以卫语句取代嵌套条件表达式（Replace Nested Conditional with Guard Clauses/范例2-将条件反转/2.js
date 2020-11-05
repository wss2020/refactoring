//同样地，我逐一进行替换。不过这次在插入卫语句时，我需要将相应的条件反转过来：
function adjustedCapital(anInstrument) {
    let result = 0;
    if (anInstrument.capital <= 0) return result;
    if (anInstrument.interestRate > 0 && anInstrument.duration > 0) {
        result = (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
    }
    return result;
}



//下一个条件稍微复杂一点，所以我分两步进行反转。首先加入一个逻辑非操作：

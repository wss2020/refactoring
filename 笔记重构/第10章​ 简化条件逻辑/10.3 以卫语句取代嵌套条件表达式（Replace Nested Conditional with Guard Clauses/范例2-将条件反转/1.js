/**
    审阅本书第1版的初稿时，Joshua Kerievsky指出：我们常常可以将条件表达式反转，从而实现以卫语句取代嵌套条件
 表达式。为了拯救我可怜的想象力，他还好心帮我想了一个例子：
*/
function adjustedCapital(anInstrument) {
    let result = 0;
    if (anInstrument.capital > 0) {
        if (anInstrument.interestRate > 0 && anInstrument.duration > 0) {
            result = (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
        }
    }
    return result;
}


//同样地，我逐一进行替换。不过这次在插入卫语句时，我需要将相应的条件反转过来：

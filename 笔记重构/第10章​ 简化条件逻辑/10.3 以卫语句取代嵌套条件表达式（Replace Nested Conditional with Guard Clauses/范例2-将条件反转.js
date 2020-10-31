
/*
    审阅本书第1版的初稿时，Joshua Kerievsky指出：我们常常可以将条件表达式反转，从而实现以卫语句取代嵌套条件表达式。
        为了拯救我可怜的想象力，他还好心帮我想了一个例子：
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

//1。同样地，我逐一进行替换。不过这次在插入卫语句时，我需要将相应的条件反转过来：
function adjustedCapital(anInstrument) {
    let result = 0;
    if (anInstrument.capital <= 0) return result;

    if (anInstrument.interestRate > 0 && anInstrument.duration > 0) {
        result = (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
    }
    return result;
}

//2。下一个条件稍微复杂一点，所以我分两步进行反转。首先加入一个逻辑非操作：
function adjustedCapital(anInstrument) {
    let result = 0;
    if (anInstrument.capital <= 0) return result;
    if (!(anInstrument.interestRate > 0 && anInstrument.duration > 0)) return result;
    result = (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
    return result;
}

//2。但是在这样的条件表达式中留下一个逻辑非，会把我的脑袋拧成一团乱麻，所以我把它简化成下面这样：
function adjustedCapital(anInstrument) {
    let result = 0;
    if (anInstrument.capital <= 0) return result;
    if (anInstrument.interestRate <= 0 || anInstrument.duration <= 0) return result;
    result = (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
    return result;
}

//3。这两行逻辑语句引发的结果一样，所以我可以用合并条件表达式（263）将其合并。
function adjustedCapital1(anInstrument) {
    let result = 0;
    if(anInstrument.capital <= 0 || anInstrument.interestRate <= 0 || anInstrument.duration <= 0) return result;
    result = (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
    return result;
}


/*
  4。此时result变量做了两件事：一开始我把它设为0，代表卫语句被触发时的返回值；然后又用最终计算的结果给它赋值。
         我可以彻底移除这个变量，避免用一个变量承担两重责任，而且又减少了一个可变变量。
 */

function adjustedCapital(anInstrument) {
    if(anInstrument.capital <= 0 || anInstrument.interestRate <= 0 || anInstrument.duration <= 0) return 0;
    return (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
}



























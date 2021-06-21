/**
    此时result变量做了两件事：一开始我把它设为0，代表卫语句被触发时的返回值；然后又用最终计算的结果给
 它赋值。我可以彻底移除这个变量，避免用一个变量承担两重责任，而且又减少了一个可变变量。
*/
function adjustedCapital(anInstrument) {
    if (anInstrument.capital <= 0 || anInstrument.interestRate <= 0 || anInstrument.duration <= 0) return 0;
    return (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
}




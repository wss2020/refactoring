
// 由于旧函数属于另一个上下文（HeatingPlan类），我需要用搬移函数（198）把新函数也搬过去。
// 调用方...
const tempRange = aRoom.daysTempRange;
const isWithinRange = aPlan.xxNEWwithinRange(tempRange);
if (!isWithinRange)
    alerts.push("room temperature went outside range");


class HeatingPlan {
    xxNEWwithinRange(tempRange) {
        const low = tempRange.low;
        const high = tempRange.high;
        const isWithinRange = this.withinRange(low, high);
        return isWithinRange;
    }
}


/**
    剩下的过程就跟前面一样了：替换其他调用者，然后把旧函数内联到新函数中。重构刚开始的时候，为了清晰分离函数调用，
 以便提炼出新函数，我提炼了几个变量出来，现在可以把这些变量也内联回去。

    这种方式的好处在于：它完全是由其他重构手法组合而成的。如果我使用的开发工具支持可靠的提炼和内联操作，用这种方
 式进行本重构会特别流畅。
*/

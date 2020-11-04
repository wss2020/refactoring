/**
 终于可以去掉新函数那难看的前缀了，记得同时修改所有调用者。就算我所使用的开发环境不支持可靠的函数改名操作，
 有这个极具特色的前缀在，我也可以很方便地全局替换。
 */
class HeatingPlan {
    withinRange(aNumberRange) {
        return (aNumberRange.low >= this._temperatureRange.low)
            && (aNumberRange.high <= this._temperatureRange.high);
    }
}

// 调用方...
if (!aPlan.withinRange(aRoom.daysTempRange))
    alerts.push("room temperature went outside range");




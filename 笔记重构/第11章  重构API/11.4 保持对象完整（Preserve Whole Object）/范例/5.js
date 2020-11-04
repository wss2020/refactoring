/**
 每次替换一处调用代码，每次修改后都要测试。
 调用处全部替换完成后，用内联函数（115）将旧函数内联到新函数体内。
 */
class HeatingPlan {
    withinRange(bottom, top) {
        return (bottom >= this._temperatureRange.low) && (top <= this._temperatureRange.high);
    }
    xxNEWwithinRange(aNumberRange) {
        return (aNumberRange.low >= this._temperatureRange.low)
            && (aNumberRange.high <= this._temperatureRange.high);
    }
}

if (!aPlan.xxNEWwithinRange(aRoom.daysTempRange))
    alerts.push("room temperature went outside range");


/**
    终于可以去掉新函数那难看的前缀了，记得同时修改所有调用者。就算我所使用的开发环境不支持可靠的函数改名操作，
 有这个极具特色的前缀在，我也可以很方便地全局替换。
*/



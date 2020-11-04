class HeatingPlan {
    withinRange(bottom, top) {
        return (bottom >= this._temperatureRange.low) && (top <= this._temperatureRange.high);
    }

    xxNEWwithinRange(aNumberRange) {
        return this.withinRange(aNumberRange.low, aNumberRange.high);
    }
}

//在修改调用处时，我可能会发现一些代码在修改后已经不再需要，此时可以使用移除死代码（237）。
//调用方...
if (!aPlan.xxNEWwithinRange(aRoom.daysTempRange))
    alerts.push("room temperature went outside range");

/**
    每次替换一处调用代码，每次修改后都要测试。
    调用处全部替换完成后，用内联函数（115）将旧函数内联到新函数体内。
 */

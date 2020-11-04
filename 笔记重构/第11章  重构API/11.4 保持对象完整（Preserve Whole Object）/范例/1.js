/**
    我们想象一个室温监控系统，它负责记录房间一天中的最高温度和最低温度，然后将实际的温度范围与预先规定的温度控制计划
 （heating plan）相比较， 如果当天温度不符合计划要求，就发出警告。
*/
// 调用方...

const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if (!aPlan.withinRange(low, high))
    alerts.push("room temperature went outside range");


class HeatingPlan {
    withinRange(bottom, top) {
        return (bottom >= this._temperatureRange.low) && (top <= this._temperatureRange.high);
    }
}

/**
    其实我不必将“温度范围”的信息拆开来单独传递，只需将整个范围对象传递给withinRange函数即可。
    首先，我在HeatingPlan类中新添一个空函数，给它赋予我认为合理的参数列表。
 */

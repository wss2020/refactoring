/**
    其实我不必将“温度范围”的信息拆开来单独传递，只需将整个范围对象传递给withinRange函数即可。
 首先，我在HeatingPlan类中新添一个空函数，给它赋予我认为合理的参数列表。
    因为这个函数最终要取代现有的withinRange函数，所以它也用了同样的名字，再加上一个容易替换的前缀。
 然后在新函数体内调用现有的withinRange函数。因此，新函数体就完成了从新参数列表到旧函数参数列表的映射。
 */
class HeatingPlan {
    withinRange(bottom, top) {
        return (bottom >= this._temperatureRange.low) && (top <= this._temperatureRange.high);
    }

    xxNEWwithinRange(aNumberRange) {
        return this.withinRange(aNumberRange.low, aNumberRange.high);
    }
}


//现在开始正式的替换工作了，我要找到调用现有函数的地方，将其改为调用新函数。
//调用方...
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if (!aPlan.xxNEWwithinRange(aRoom.daysTempRange))
    alerts.push("room temperature went outside range");


//在修改调用处时，我可能会发现一些代码在修改后已经不再需要，此时可以使用移除死代码（237）。


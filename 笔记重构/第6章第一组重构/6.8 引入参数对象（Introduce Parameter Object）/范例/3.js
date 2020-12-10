const station = {
    name: "ZB1",
    readings: [
        {temp: 47, time: "2016-11-10 09:10"},
        {temp: 53, time: "2016-11-10 09:20"},
        {temp: 58, time: "2016-11-10 09:30"},
        {temp: 53, time: "2016-11-10 09:40"},
        {temp: 51, time: "2016-11-10 09:50"},
    ]
};
const operatingPlan = {
    temperatureFloor: 30,
    temperatureCeiling: 52,
}

/**
 此时我还是没有修改任何行为，因为新添的参数没有被使用。所有测试应该仍然能通过。
 现在我可以开始修改使用参数的代码了。先从“最大值”开始：
 */
function readingsOutsideRange(station, min, max, range) {
    return station.readings.filter(r => r.temp < min || r.temp > range.max);
}
class NumberRange {
    constructor(min, max) {
        this._data = {min: min, max: max};
    }
    get min() {
        return this._data.min;
    }
    get max() {
        return this._data.max;
    }
}
//调用方
const range = new NumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling );
alerts = readingsOutsideRange(station, operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling, range);
console.log(alerts);

//此时要执行测试。如果测试通过，我再接着处理另一个参数。

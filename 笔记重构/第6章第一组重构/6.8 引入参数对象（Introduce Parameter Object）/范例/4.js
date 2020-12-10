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
//此时要执行测试。如果测试通过，我再接着处理另一个参数。
function readingsOutsideRange(station, min, range) {
    return station.readings.filter(r => r.temp < range.min || r.temp > range.max);
}
//调用方
const range = new NumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling );
alerts = readingsOutsideRange(station, operatingPlan.temperatureFloor, range);

console.log(alerts);


/**
 这项重构手法到这儿就完成了。不过，将一堆参数替换成一个真正的对象，这只是长征第一步。
 创建一个类是为了把行为搬移进去。
 在这里，我可以给“范围”类添加一个函数，用于测试一个值是否落在范围之内。
 */



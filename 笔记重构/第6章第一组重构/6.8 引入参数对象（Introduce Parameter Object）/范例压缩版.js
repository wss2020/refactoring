// 对象（英语：object）


//原码
//下面要展示的代码会查看一组温度读数（reading），检查是否有任何一条读数超出了指定的运作温度范围（range）。温度读数的数据如下：
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
//下面的函数负责找到超出指定范围的温度读数：
function readingsOutsideRange(station, min, max) {
    return station.readings.filter(r => r.temp < min || r.temp > max);
}
//调用该函数的代码可能是下面这样的。
alerts = readingsOutsideRange(station, operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling);






//重构后
function readingsOutsideRange(station, range) {
    return station.readings.filter(r => !range.contains(r.temp));
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
    contains(arg) {
        return (arg >= this.min && arg <= this.max);
    }
}
const range = new NumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling );
alerts = readingsOutsideRange(station, range);

























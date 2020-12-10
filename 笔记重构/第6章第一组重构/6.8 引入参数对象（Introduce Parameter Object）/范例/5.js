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
    这项重构手法到这儿就完成了。不过，将一堆参数替换成一个真正的对象，这只是长征第一步。
    创建一个类是为了把行为搬移进去。
    在这里，我可以给“范围”类添加一个函数，用于测试一个值是否落在范围之内。
 */
function readingsOutsideRange(station, range) {
    return station.readings.filter(r => !range.contains(r.temp));
}
//class NumberRange...
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

//调用方
const range = new NumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling );
alerts = readingsOutsideRange(station, range);
console.log(alerts);

/**
   这样我就迈出了第一步，开始逐渐打造一个真正有用的“范围”[mf-range]类。
   一旦识别出“范围”这个概念，那么每当我在代码中发现“最大/最小值”这样一对数字时，我就会考虑是否可以将其改为使用“范围”类。
   （例如，我马上就会考虑把“运作计划”类中的temperatureFloor和temperatureCeiling替换为temperatureRange。）
   在观察这些成对出现的数字如何被使用时，我会发现一些有用的行为，并将其搬移到“范围”类中，简化其使用方法。
   比如，我可能会先给这个类加上“基于数值判断相等性”的函数，使其成为一个真正的值对象。
 */

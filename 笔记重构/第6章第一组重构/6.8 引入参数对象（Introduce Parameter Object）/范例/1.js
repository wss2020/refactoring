/**
    下面要展示的代码会查看一组温度读数（reading），检查是否有任何一条读数超出了指定的运作温度范围（range）。
    温度读数的数据如下：
 */
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
const operatingPlan = {
    temperatureFloor: 30,
    temperatureCeiling: 52,
}
//调用方
let alerts = readingsOutsideRange(
    station,
    operatingPlan.temperatureFloor,
    operatingPlan.temperatureCeiling);
console.log(alerts);


/**
 请注意，这里的调用代码从另一个对象中抽出两项数据，转手又把这一对数据传递给readingsOutsideRange。
 代表“运作计划”的operatingPlan对象用了另外的名字来表示温度范围的下限和上限，与readingsOutsideRange中所用的名字不同。
 像这样用两项各不相干的数据来表示一个范围的情况并不少见，最好是将其组合成一个对象。
 我会首先为要组合的数据声明一个类：
 */

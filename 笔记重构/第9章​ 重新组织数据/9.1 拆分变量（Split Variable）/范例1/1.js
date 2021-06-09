/**
   下面范例中我要计算一个苏格兰布丁运动的距离。
   在起点处，静止的苏格兰布丁会受到一个初始力的作用而开始运动。 一段时间后，第二个力作用于布丁，让它再次加速。

   根据牛顿第二定律，我可以这样计算布丁运动的距离：
 */
function distanceTravelled(scenario, time) {
    let result;

    let acc = scenario.primaryForce / scenario.mass;
    let primaryTime = Math.min(time, scenario.delay);
    result = 0.5 * acc * primaryTime * primaryTime;
    let secondaryTime = time - scenario.delay;

    if (secondaryTime > 0) {
        let primaryVelocity = acc * scenario.delay;
        acc = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
        result += primaryVelocity * secondaryTime + 0.5 * acc * secondaryTime * secondaryTime;
    }

    return result;
}

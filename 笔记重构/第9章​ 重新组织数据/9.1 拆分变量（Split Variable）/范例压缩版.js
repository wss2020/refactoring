//范例1
//原码
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


//重构   只是拆分变量，这种代码，还可以继续重构，现在看起来让人不舒服
function distanceTravelled(scenario, time) {
    let result;
    const primaryAcceleration = scenario.primaryForce / scenario.mass;
    let primaryTime = Math.min(time, scenario.delay);
    result = 0.5 * primaryAcceleration * primaryTime * primaryTime;
    let secondaryTime = time - scenario.delay;

    if (secondaryTime > 0) {
        let primaryVelocity = primaryAcceleration * scenario.delay;
        const secondaryAcceleration = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
        result += primaryVelocity * secondaryTime +
            0.5 * secondaryAcceleration * secondaryTime * secondaryTime;
    }

    return result;
}


// 自己接着重构  就先这样吧
function  sum(p1,p2) {
    return 0.5 * p1 * p2 *p2;
}
function distanceTravelled(scenario, time) {
    let result;
    const primaryAcceleration = scenario.primaryForce / scenario.mass;
    let primaryTime = Math.min(time, scenario.delay);
    result = sum(primaryAcceleration,primaryTime);
    time > scenario.delay  ?  secondaryTimeCheck() : '';
    return result;

    function secondaryTimeCheck() {
        let secondaryTime = time - scenario.delay;
        let primaryVelocity = primaryAcceleration * scenario.delay;
        const secondaryAcceleration = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
        result += primaryVelocity * secondaryTime + sum(secondaryAcceleration, secondaryTime);
    }
}







//范例2
//原码
function discount(inputValue, quantity) {
    if (inputValue > 50) inputValue = inputValue - 2;
    if (quantity > 100) inputValue = inputValue - 1;
    return inputValue;
}


//重构
function discount(inputValue, quantity) {
    let result = inputValue;

    if (inputValue > 50) result = result - 2;
    if (quantity > 100) result = result - 1;
    return result;
}






































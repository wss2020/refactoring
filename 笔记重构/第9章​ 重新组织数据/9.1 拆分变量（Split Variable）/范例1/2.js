/**
   真是个丑陋的小东西。注意观察此例中的acc变量是如何被赋值两次的。
   acc变量有两个责任：
      第一是保存第一个力造成的初始加速度；
      第二是保存两个力共同造成的加速度。这就是我想要分解的东西。

   在尝试理解变量被如何使用时，如果编辑器能高亮显示一个符号（symbol）在函数内或文件内出现的所有位置，会相当便利。大部分现代编辑器都可以轻松做到这一点。

   首先，我在函数开始处修改这个变量的名称，并将新变量声明为const。接着，我把新变量声明之后、第二次赋值之前对acc变量的所有引用，全部改用新变量。最后，
我在第二次赋值处重新声明acc变量：
 */

function distanceTravelled(scenario, time) {
    let result;
    const primaryAcceleration = scenario.primaryForce / scenario.mass;
    let primaryTime = Math.min(time, scenario.delay);

    result = 0.5 * primaryAcceleration * primaryTime * primaryTime;
    let secondaryTime = time - scenario.delay;
    if (secondaryTime > 0) {
        let primaryVelocity = primaryAcceleration * scenario.delay;
        let acc = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
        result += primaryVelocity * secondaryTime + 0.5 * acc * secondaryTime * secondaryTime;
    }
    return result;
}

/*
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


/*
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

/*
   新变量的名称指出，它只承担原先acc变量的第一个责任。我将它声明为const，确保它只被赋值一次。然后，我在原先acc变量第二次被赋值处重新声明acc。现在，
重新编译并测试，一切都应该没有问题。

   然后，我继续处理acc变量的第二次赋值。这次我把原先的变量完全删掉，代之以一个新变量。新变量的名称指出，它只承担原先acc变量的第二个责任：
 */
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



//现在，这段代码肯定可以让你想起更多其他重构手法。尽情享受吧。（我敢保证，这比吃苏格兰布丁强多了——你知道他们都在里面放了些什么东西吗？1）


/*
   1苏格兰布丁（haggis）是一种苏格兰菜，把羊心等内脏装在羊胃里煮成。由于它被羊胃包成一个球体，因此可以像球一样踢来踢去，这就是本例的由来。“把羊心装
在羊胃里煮成……”，呃，有些人难免对这道菜恶心，Martin Fowler想必是其中之一。   ——译者注

 */






















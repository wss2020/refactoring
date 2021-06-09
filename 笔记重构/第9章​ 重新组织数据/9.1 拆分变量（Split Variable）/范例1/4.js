/**
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






/**
 看看功能是否仍然完整，函数在其新家待得是否舒适。
 测试通过后，便算完成了主要任务，就好比搬家，现在大箱小箱已经全搬到新家，接下来就是将它们拆箱复位了。第一件事是决定还要不要保留原来那个只起委托作用
 的函数。在这个例子中，原函数的调用点不多，作为嵌套函数它们的作用范围通常也很小，因此我觉得这里大可直接移除原函数。
 */
function top_calculateDistance(points) {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
        result += distance(points[i - 1], points[i]);
    }
    return result;
    function distance(p1, p2) {}
    function radians(degrees) {}
}
function trackSummary(points) {
    const totalTime = calculateTime();
    const totalDistance = top_calculateDistance(points);
    const pace = totalTime / 60 / totalDistance;
    return {
        time: totalTime,
        distance: totalDistance,
        pace: pace
    };
    function calculateTime() {}
}



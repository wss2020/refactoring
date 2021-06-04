/**
   我留意到distance函数中只调用了radians函数，后者已经没有再引用当前上下文里的任何元素。因此与其将radians作为参数，我更倾向于将它也一并搬移。不
过我不需要一步到位，我们可以先将这两个函数从当前上下文中搬移进calculateDistance函数里：
 */
function trackSummary(points) {
    const totalTime = calculateTime();
    const totalDistance = calculateDistance();
    const pace = totalTime / 60 / totalDistance;
    return {
        time: totalTime,
        distance: totalDistance,
        pace: pace
    };

    function calculateDistance() {
        let result = 0;
        for (let i = 1; i < points.length; i++) {
            result += distance(points[i - 1], points[i]);
        }
        return result;
        function distance(p1, p2) {}
        function radians(degrees) {}
    }
    function calculateTime() {}
}

function top_calculateDistance(points, distance) {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
        result += distance(points[i - 1], points[i]);
    }
    return result;
}



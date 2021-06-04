/**
   这样做的好处是，我可以充分发挥静态检查和测试的作用，让它们帮我检查有无遗漏的东西。在这个实例中一切顺利，因此，我可以放心地将这两个函数直接复制到
top_calculateDistance中：
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




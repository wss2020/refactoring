/**
 同时，也该是时候为这个函数认真想个名字了。因为顶层函数拥有最高的可见性，因此取个好名非常重要。totalDistance听起来不错，但还不能马上用这个名字，
 因为trackSummary函数中有一个同名的变量——我不觉得这个变量有保留的价值，因此我们先用内联变量（123）处理它，之后再使用改变函数声明（124）：
 */
function totalDistance(points) {
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
    const pace = totalTime / 60 / totalDistance(points);
    return {
        time: totalTime,
        distance: totalDistance(points),
        pace: pace
    };
    function calculateTime() {}
}



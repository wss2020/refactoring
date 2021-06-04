/**
 这次复制操作同样不会改变程序现有行为，但给了静态分析器更多介入的机会，增加了暴露错误的概率。假如我在上一步没有发现distance函数内部还调用了
 radians函数，那么这一步就会被分析器检查出来。
 现在万事俱备，是时候端出主菜了——我要在原calculateDistance函数体内调用top_calculateDistance函数：
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
        return top_calculateDistance(points);
    }
    function calculateTime() {}
}


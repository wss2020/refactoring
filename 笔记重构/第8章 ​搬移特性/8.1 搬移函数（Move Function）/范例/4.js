
//至于distance，虽然我也可以将它作为参数传进来，但也许将其计算函数calculate Distance一并搬移过来会更合适。该函数的代码如下。
//function trackSummary...
function distance(p1, p2) {
    const EARTH_RADIUS = 3959; // in miles

    const dLat = radians(p2.lat) - radians(p1.lat);
    const dLon = radians(p2.lon) - radians(p1.lon);
    const a = Math.pow(Math.sin(dLat / 2), 2)
        + Math.cos(radians(p2.lat))
        * Math.cos(radians(p1.lat))
        * Math.pow(Math.sin(dLon / 2), 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return EARTH_RADIUS * c;
}
function radians(degrees) {
    return degrees * Math.PI / 180;
}

function top_calculateDistance(points, distance) {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
        result += distance(points[i - 1], points[i]);
    }
    return result;
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
    }
    function distance(p1, p2) {}
    function radians(degrees) {}
    function calculateTime() {}
}


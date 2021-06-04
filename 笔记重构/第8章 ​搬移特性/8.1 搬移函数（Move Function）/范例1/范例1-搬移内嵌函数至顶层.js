//calculate  计算
//让我用一个函数来举例。这个函数会计算一条GPS轨迹记录（track record）的总距离（total distance）。
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

//我希望把calculateDistance函数搬移到顶层，这样我就能单独计算轨迹的距离，而不必算出汇总报告（summary）的其他部分。

//1.我先将函数复制一份到顶层作用域中：
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

function top_calculateDistance() {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
        result += distance(points[i - 1], points[i]);
    }
    return result;
}


/*
   复制函数时，我习惯为函数一并改个名，这样可让“它们有不同的作用域”这个信息显得一目了然。现在我还不想花费心思考虑它正确的名字该是什么，因此我暂且先用
一个临时的名字。

   此时代码依然能正常工作，但我的静态分析器要开始抱怨了，它说新函数里多了两个未定义的符号，分别是distance和points。对于points，自然是将其作为函数
参数传进来。

 */
function top_calculateDistance(points) {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
        result += distance(points[i - 1], points[i]);
    }
    return result;
}

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


/*
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

/*
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

/*
   这次复制操作同样不会改变程序现有行为，但给了静态分析器更多介入的机会，增加了暴露错误的概率。假如我在上一步没有发现distance函数内部还调用了
radians函数，那么这一步就会被分析器检查出来。

   现在万事俱备，是时候端出主菜了——我要在原calculateDistance函数体内调用top_calculateDistance函数：
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
        return top_calculateDistance(points);
    }
    function calculateTime() {}
}


/*
   看看功能是否仍然完整，函数在其新家待得是否舒适。

   测试通过后，便算完成了主要任务，就好比搬家，现在大箱小箱已经全搬到新家，接下来就是将它们拆箱复位了。第一件事是决定还要不要保留原来那个只起委托作用
的函数。在这个例子中，原函数的调用点不多，作为嵌套函数它们的作用范围通常也很小，因此我觉得这里大可直接移除原函数。

 */

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

/*
   同时，也该是时候为这个函数认真想个名字了。因为顶层函数拥有最高的可见性，因此取个好名非常重要。totalDistance听起来不错，但还不能马上用这个名字，
因为trackSummary函数中有一个同名的变量——我不觉得这个变量有保留的价值，因此我们先用内联变量（123）处理它，之后再使用改变函数声明（124）：
 */


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

function totalDistance(points) {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
        result += distance(points[i - 1], points[i]);
    }
    return result;
    function distance(p1, p2) {}
    function radians(degrees) {}
}

/*
   如果出于某些原因，实在需要保留该变量，那么我建议将该变量改个其他的名字，比如totalDistanceCache或distance等。

   由于distance函数和radians函数并未使用totalDistance中的任何变量或函数，因此我倾向于把它们也提升到顶层，也就是4个方法都放置在顶层作用域上。
 */
function trackSummary(points) {  }
function totalDistance(points) {  }
function distance(p1,p2) {  }
function radians(degrees) {  }


/*
   有些人则更倾向于将distance和radians函数保留在totalDistance内，以便限制它们的可见性。在某些语言里，这个顾虑也许有其道理，但新的ES 2015规范
为JavaScript提供了一个美妙的模块化机制，利用它来控制函数的可见性是再好不过了。通常来说，我对嵌套函数还是心存警惕的，因为很容易在里面编写一些私有数据，
并且在函数之间共享，这可能会增加代码的阅读和重构难度。
 */














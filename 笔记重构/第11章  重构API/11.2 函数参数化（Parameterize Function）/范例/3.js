/**
 这几个函数中的逻辑明显很相似，但是不是相似到足以支撑一个参数化的计算“计费档次”（band）
 的函数？这次就不像前面第一个例子那样一目了然了。

 在尝试对几个相关的函数做参数化操作时，我会先从中挑选一个，在上面添加参数，同时留意其他
 几种情况。在类似这样处理“范围”的情况下，通常从位于中间的范围开始着手较好。所以我首先选择了
 middleBand函数来添加参数，然后调整其他的调用者来适应它。

 middleBand使用了两个字面量值，即100和200，分别代表“中间档次”的下界和上界。我首先用
 改变函数声明（124）加上这两个参数，同时顺手给函数改个名，使其更好地表述参数化之后的含义。
 */
function baseCharge(usage) {
    if (usage < 0) return usd(0);
    const amount =
        bottomBand(usage) * 0.03
        + withinBand(usage, 100, 200) * 0.05
        + topBand(usage) * 0.07;
    return usd(amount);
}
function bottomBand(usage) {
    return Math.min(usage, 100);
}
function topBand(usage) {
    return usage > 200 ? usage - 200 : 0;
}



function withinBand1(usage, bottom, top) {
    return usage > 100 ? Math.min(usage, 200) - 100 : 0;
}
//在函数体内部，把一个字面量改为使用新传入的参数：
function withinBand2(usage, bottom, top) {
    return usage > bottom ? Math.min(usage, 200) - bottom : 0;
}
//然后是另一个：
function withinBand(usage, bottom, top) {
    return usage > bottom ? Math.min(usage, top) - bottom : 0;
}


//对于原本调用bottomBand函数的地方，我将其改为调用参数化了的新函数。




//为了替换对topBand的调用，我就得用代表“无穷大”的Infinity作为这个范围的上界。
function baseCharge(usage) {
    if (usage < 0) return usd(0);
    const amount =
        withinBand(usage, 0, 100) * 0.03
        + withinBand(usage, 100, 200) * 0.05
        + withinBand(usage, 200, Infinity) * 0.07;
    return usd(amount);
}
function withinBand(usage, bottom, top) {
    return usage > bottom ? Math.min(usage, top) - bottom : 0;
}

/**
    照现在的逻辑，baseCharge一开始的卫语句已经可以去掉了。不过，尽管这条语句已经失去了
 逻辑上的必要性，我还是愿意把它留在原地，因为它阐明了“传入的usage参数为负数”这种情况是
 如何处理的。*/



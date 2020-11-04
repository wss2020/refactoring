// 曾用名：令函数携带参数（Parameterize Method）

//重构前
function tenPercentRaise(aPerson) {
    aPerson.salary = aPerson.salary.multiply(1.1);
}
function fivePercentRaise(aPerson) {
    aPerson.salary = aPerson.salary.multiply(1.05);
}


//重构后
function raise(aPerson, factor) {
    aPerson.salary = aPerson.salary.multiply(1 + factor);
}

/**
 动机

    如果我发现两个函数逻辑非常相似，只有一些字面量值不同，可以将其合并成一个函数，以参数的形
 式传入不同的值，从而消除重复。这个重构可以使函数更有用，因为重构后的函数还可以用于处理其他的
 值。*/



/**
 做法

    从一组相似的函数中选择一个。
    运用改变函数声明（124），把需要作为参数传入的字面量添加到参数列表中。
    修改该函数所有的调用处，使其在调用时传入该字面量值。
    测试。
    修改函数体，令其使用新传入的参数。每使用一个新参数都要测试。
    对于其他与之相似的函数，逐一将其调用处改为调用已经参数化的函数。每次修改后都要测试。

    注意：如果第一个函数经过参数化以后不能直接替代另一个与之相似的函数，就先对参数化之后的
 函数做必要的调整，再做替换。
 */



















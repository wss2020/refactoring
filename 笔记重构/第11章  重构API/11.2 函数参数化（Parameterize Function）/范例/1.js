//下面是一个显而易见的例子：
function tenPercentRaise(aPerson) {
    aPerson.salary = aPerson.salary.multiply(1.1);
}
function fivePercentRaise(aPerson) {
    aPerson.salary = aPerson.salary.multiply(1.05);
}


//很明显我可以用下面这个函数来替换上面两个：
function raise(aPerson, factor) {
    aPerson.salary = aPerson.salary.multiply(1 + factor);
}


//情况可能比这个更复杂一些。例如下列代码：

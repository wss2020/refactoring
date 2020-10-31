


//上面的例子展示了用逻辑或合并条件表达式的做法。
// 不过，我有可能遇到需要逻辑与的情况。例如，嵌套if语句的情况：


function disabilityAmount(anEmployee) {
    if (anEmployee.onVacation)
        if (anEmployee.seniority > 10) return 1;
    return 0.5;
}

//可以用逻辑与运算符将其合并。
function disabilityAmount(anEmployee) {
    if ((anEmployee.onVacation) && (anEmployee.seniority > 10)) return 1;
    return 0.5;
}

//如果原来的条件逻辑混杂了这两种情况，我也会根据需要组合使用逻辑与和逻辑或运算符。
//在这种时候，代码很可能变得混乱，所以我会频繁使用提炼函数（106），把代码变得可读。

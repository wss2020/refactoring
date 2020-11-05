// 可以用逻辑与运算符将其合并。
function test (anEmployee){
    if ((anEmployee.onVacation) && (anEmployee.seniority > 10)) return 1;
    return 0.5;
}


/**
    如果原来的条件逻辑混杂了这两种情况，我也会根据需要组合使用逻辑与和逻辑或运算符。在这种
 时候，代码很可能变得混乱，所以我会频繁使用提炼函数（106），把代码变得可读。
 */

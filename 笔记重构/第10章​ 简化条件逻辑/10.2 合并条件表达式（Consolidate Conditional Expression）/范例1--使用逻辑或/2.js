/**
    这里有一连串的条件检查，都指向同样的结果。既然结果是相同的，就应该把这些条件检查
 合并成一条表达式。对于这样顺序执行的条件检查，可以用逻辑或运算符来合并。
*/

function disabilityAmount(anEmployee) {
    if ((anEmployee.seniority < 2) || (anEmployee.monthsDisabled > 12)) return 0;
    if (anEmployee.isPartTime) return 0;
    // compute the disability amount
}


//测试，然后把下一个条件检查也合并进来：

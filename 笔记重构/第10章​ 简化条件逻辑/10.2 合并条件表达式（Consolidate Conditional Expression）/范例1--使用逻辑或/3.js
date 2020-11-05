//测试，然后把下一个条件检查也合并进来：
function disabilityAmount(anEmployee) {
    if ((anEmployee.seniority < 2)
        || (anEmployee.monthsDisabled > 12)
        || (anEmployee.isPartTime)) return 0;
        // compute the disability amount
}


//合并完成后，再对这句条件表达式使用提炼函数（106）。



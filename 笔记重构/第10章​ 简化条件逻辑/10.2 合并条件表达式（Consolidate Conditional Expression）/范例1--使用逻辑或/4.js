//合并完成后，再对这句条件表达式使用提炼函数（106）。
function disabilityAmount(anEmployee) {
    if (isNotEligableForDisability()) return 0;
    // compute the disability amount
    function isNotEligableForDisability() {
        return ((anEmployee.seniority < 2) || (anEmployee.monthsDisabled > 12) || (anEmployee.isPartTime));
    }
}


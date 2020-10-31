
//范例1
//原码
function disabilityAmount(anEmployee) {
    if (anEmployee.seniority < 2) return 0;
    if (anEmployee.monthsDisabled > 12) return 0;
    if (anEmployee.isPartTime) return 0;
}

//重构后
function disabilityAmount(anEmployee) {
    if (isNotEligableForDisability()) return 0;
    function isNotEligableForDisability() {
        return ((anEmployee.seniority < 2)
            || (anEmployee.monthsDisabled > 12)
            || (anEmployee.isPartTime));
    }
}





//范例1
//原码
function disabilityAmount(anEmployee) {
    if (anEmployee.onVacation)
        if (anEmployee.seniority > 10) return 1;
    return 0.5;
}

//重构后
function disabilityAmount(anEmployee) {
    if ((anEmployee.onVacation) && (anEmployee.seniority > 10)) return 1;
    return 0.5;
}

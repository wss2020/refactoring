
//在走读代码的过程中，我看到了下面的代码片段：

function disabilityAmount(anEmployee) {
    if (anEmployee.seniority < 2) return 0;
    if (anEmployee.monthsDisabled > 12) return 0;
    if (anEmployee.isPartTime) return 0;
}

// compute the disability amount

/*
  1.这里有一连串的条件检查，都指向同样的结果。
     既然结果是相同的，就应该把这些条件检查合并成一条表达式。对于这样顺序执行的条件检查，可以用逻辑或运算符来合并。
*/
function disabilityAmount(anEmployee) {
    if ((anEmployee.seniority < 2) || (anEmployee.monthsDisabled > 12)) return 0;
    if (anEmployee.isPartTime) return 0;
}

// compute the disability amount

//2.测试，然后把下一个条件检查也合并进来：
function disabilityAmount(anEmployee) {
    if ((anEmployee.seniority < 2) || (anEmployee.monthsDisabled > 12) || (anEmployee.isPartTime)) return 0;
}

// compute the disability amount

//3.合并完成后，再对这句条件表达式使用提炼函数（106）。

function disabilityAmount(anEmployee) {
    if (isNotEligableForDisability()) return 0; // compute the disability amount

    function isNotEligableForDisability() {
        return ((anEmployee.seniority < 2)
            || (anEmployee.monthsDisabled > 12)
            || (anEmployee.isPartTime));
    }
}

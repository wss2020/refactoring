//最后提炼条件判断为假的分支：
if (summer())
    charge = summerCharge();
else
    charge = regularCharge();

function summer() {
    return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}
function summerCharge() {
    return quantity * plan.summerRate;
}
function regularCharge() {
    return quantity * plan.regularRate + plan.regularServiceCharge;
}


//提炼完成后，我喜欢用三元运算符重新安排条件语句。

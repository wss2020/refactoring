

//假设我要计算购买某样商品的总价（总价=数量×单价），而这个商品在冬季和夏季的单价是不同的：

if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd))
    charge = quantity * plan.summerRate;
else
    charge = quantity * plan.regularRate + plan.regularServiceCharge;




charge = summer() ? summerCharge() : regularCharge();

function summer() {
    return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}
function summerCharge() {
    return quantity * plan.summerRate;
}
function regularCharge() {
    return quantity * plan.regularRate + plan.regularServiceCharge;
}















//假设我要计算购买某样商品的总价（总价=数量×单价），而这个商品在冬季和夏季的单价是不同的：

if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd))
    charge = quantity * plan.summerRate;
else
    charge = quantity * plan.regularRate + plan.regularServiceCharge;

//1.我把条件判断提炼到一个独立的函数中：
if (summer())
    charge = quantity * plan.summerRate;
else
    charge = quantity * plan.regularRate + plan.regularServiceCharge;

function summer() {
    return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}

//2.然后提炼条件判断为真的分支：
if (summer())
    charge = summerCharge();
else
    charge = quantity * plan.regularRate + plan.regularServiceCharge;

function summer() {
    return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}
function summerCharge() {
    return quantity * plan.summerRate;
}


//3.最后提炼条件判断为假的分支：
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




//3.提炼完成后，我喜欢用三元运算符重新安排条件语句。
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













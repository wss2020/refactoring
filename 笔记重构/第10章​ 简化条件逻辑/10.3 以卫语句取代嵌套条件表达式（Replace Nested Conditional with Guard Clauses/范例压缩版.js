//范例1
//修改前
function payAmount(employee) {
    let result;
    if (employee.isSeparated) {
        result = {amount: 0, reasonCode: "SEP"};
    } else {
        if (employee.isRetired) {
            result = {amount: 0, reasonCode: "RET"};
        } else {
            // logic to compute amount
            lorem.ipsum(dolor.sitAmet);
            consectetur(adipiscing).elit();
            sed.do.eiusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
            ut.enim.ad(minim.veniam);
            result = someFinalComputation();
        }
    }
    return result;
}


// 修改后
function payAmount(employee) {
    if (employee.isSeparated) return {amount: 0, reasonCode: "SEP"};
    if (employee.isRetired) return {amount: 0, reasonCode: "RET"};

    lorem.ipsum(dolor.sitAmet);
    consectetur(adipiscing).elit();
    sed.do.eiusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
    ut.enim.ad(minim.veniam);
    return someFinalComputation();
}




//范例2
//修改前
function adjustedCapital(anInstrument) {
    let result = 0;
    if (anInstrument.capital > 0) {
        if (anInstrument.interestRate > 0 && anInstrument.duration > 0) {
            result = (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
        }
    }
    return result;
}

//重构后
function adjustedCapital(anInstrument) {
    if(anInstrument.capital <= 0 || anInstrument.interestRate <= 0 || anInstrument.duration <= 0) return 0;
    return (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
}































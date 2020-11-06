/**
 在使用改变函数声明时，我通常会先运用提炼函数（106），但在这里我会先对函数体做一点重构，使后面的重构步骤更简单。
 我先用提炼变量（119）提炼出我想要的新参数：
 */
function inNewEngland(aCustomer) {
    const stateCode = aCustomer.address.state;
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

//调用方...
const newEnglanders = someCustomers.filter(c => inNewEngland(c));





// 然后再用提炼函数（106）创建新函数：




















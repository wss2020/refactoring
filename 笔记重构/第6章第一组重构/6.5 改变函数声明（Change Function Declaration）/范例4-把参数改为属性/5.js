/**
 然后我会用内联函数（115）把旧函数内联到调用处，其效果就是把旧函数的调用处改为调用新函数。我可以每次修
 改一个调用处。
 */
function inNewEngland(aCustomer) {
    return xxNEWinNewEngland(aCustomer.address.state);
}
function xxNEWinNewEngland(stateCode) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

//调用方...
const newEnglanders = someCustomers.filter(c => xxNEWinNewEngland(c.address.state));




/**
    最终。。。
    旧函数被内联到各调用处之后，我就再次使用改变函数声明，把新函数改回旧名字：
 */





























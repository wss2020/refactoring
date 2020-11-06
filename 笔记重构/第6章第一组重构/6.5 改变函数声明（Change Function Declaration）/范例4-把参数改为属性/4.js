/**
 我会给新函数起一个好记又独特的临时名字，这样回头要改回原来的名字时也会简单一些。（你也看到，对于怎么起
 这些临时名字，我并没有统一的标准。）
 我会在源函数中使用内联变量（123），把刚才提炼出来的参数内联回去：
 */
function inNewEngland(aCustomer) {
    return xxNEWinNewEngland(aCustomer.address.state);
}
function xxNEWinNewEngland(stateCode) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

//调用方...
const newEnglanders = someCustomers.filter(c => inNewEngland(c));





/**
    然后我会用内联函数（115）把旧函数内联到调用处，其效果就是把旧函数的调用处改为调用新函数。我可以每次修
 改一个调用处。
*/































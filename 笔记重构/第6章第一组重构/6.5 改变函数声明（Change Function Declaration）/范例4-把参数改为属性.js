/*
   此前的范例都很简单：改个名，增加一个参数。
   有了迁移式做法以后，这个重构手法可以相当利落地处理更复杂的情况。下面就是一个更复杂的例子。
 */


//假设我有一个函数，用于判断顾客（customer）是不是来自新英格兰（New England）地区：
function inNewEngland(aCustomer) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(aCustomer.address.state);
}
//下面是一个调用该函数的地方：
//调用方...
const newEnglanders = someCustomers.filter(c => inNewEngland(c));

/*
   inNewEngland函数只用到了顾客所在的州（state）这项信息，基于这个信息来判断顾客是否来自新英格兰地区。
   我希望重构这个函数，使其接受州代码（state code）作为参数，这样就能去掉对“顾客”概念的依赖，使这个函数能在更多的上下文中使用。
 */




// 重构
/*
  在使用改变函数声明时，我通常会先运用提炼函数（106），但在这里我会先对函数体做一点重构，使后面的重构步骤更简单。
  我先用提炼变量（119）提炼出我想要的新参数：
*/
function inNewEngland(aCustomer) {
    const stateCode = aCustomer.address.state;
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}
// 然后再用提炼函数（106）创建新函数：
function inNewEngland(aCustomer) {
    const stateCode = aCustomer.address.state;
    return xxNEWinNewEngland(stateCode);
}
function xxNEWinNewEngland(stateCode) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

//我会给新函数起一个好记又独特的临时名字，这样回头要改回原来的名字时也会简单一些。（你也看到，对于怎么起这些临时名字，我并没有统一的标准。）
// 我会在源函数中使用内联变量（123），把刚才提炼出来的参数内联回去：
function inNewEngland(aCustomer) {
    return xxNEWinNewEngland(aCustomer.address.state);
}
//然后我会用内联函数（115）把旧函数内联到调用处，其效果就是把旧函数的调用处改为调用新函数。我可以每次修改一个调用处。

//调用方...
const newEnglanders = someCustomers.filter(c => xxNEWinNewEngland(c.address.state));

//最终。。。
//旧函数被内联到各调用处之后，我就再次使用改变函数声明，把新函数改回旧名字：
function NEWinNewEngland(stateCode) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

//调用方...
const newEnglanders = someCustomers.filter(c => inNewEngland(c.address.state));

//顶层作用域...
function inNewEngland(stateCode) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

//自动化重构工具减少了迁移式做法的用武之地，同时也使迁移式做法更加高效。
// 自动化重构工具可以安全地处理相当复杂的改名、参数变更等情况，所以迁移式做法的用武之地就变少了，因为自动化重构工具经常能提供足够的支持。
// 如果遇到类似这里的例子，尽管工具无法自动完成整个重构，还是可以更快、更安全地完成关键的提炼和内联步骤，从而简化整个重构过程。








































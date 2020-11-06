/**
    最终。。。
    旧函数被内联到各调用处之后，我就再次使用改变函数声明，把新函数改回旧名字：
 */
//顶层作用域...
function inNewEngland(stateCode) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

//调用方...
const newEnglanders = someCustomers.filter(c => inNewEngland(c.address.state));




/**
    自动化重构工具减少了迁移式做法的用武之地，同时也使迁移式做法更加高效。
    自动化重构工具可以安全地处理相当复杂的改名、参数变更等情况，所以迁移式做法的用武之地就变少了，因为自动化
 重构工具经常能提供足够的支持。
    如果遇到类似这里的例子，尽管工具无法自动完成整个重构，还是可以更快、更安全地完成关键的提炼和内联步骤，从
 而简化整个重构过程。
*/








































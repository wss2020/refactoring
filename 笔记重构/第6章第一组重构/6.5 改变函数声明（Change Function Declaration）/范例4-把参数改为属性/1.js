/**
    此前的范例都很简单：改个名，增加一个参数。
    有了迁移式做法以后，这个重构手法可以相当利落地处理更复杂的情况。
    下面就是一个更复杂的例子。
    假设我有一个函数，用于判断顾客（customer）是不是来自新英格兰（New England）地区：*/

function inNewEngland(aCustomer) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(aCustomer.address.state);
}
/**
    下面是一个调用该函数的地方：
    调用方...   */
const newEnglanders = someCustomers.filter(c => inNewEngland(c));


/**
    inNewEngland函数只用到了顾客所在的州（state）这项信息，基于这个信息来判断顾客是否
 来自新英格兰地区。
    我希望重构这个函数，使其接受州代码（state code）作为参数，这样就能去掉对“顾客”概念
 的依赖，使这个函数能在更多的上下文中使用。
 */


/**
  在使用改变函数声明时，我通常会先运用提炼函数（106），但在这里我会先对函数体做一点重构，使后面的重构步骤更简单。
  我先用提炼变量（119）提炼出我想要的新参数：
*/

























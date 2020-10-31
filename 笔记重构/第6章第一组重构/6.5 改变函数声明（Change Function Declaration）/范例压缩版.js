//范例1
//原码
function circum(radius) {
    return 2 * Math.PI * radius;
}
//重构后
function circumference(radius) {
    return 2 * Math.PI * radius;
}





//范例2 （迁移式做法）
//原码
function circum(radius) {
    return 2 * Math.PI * radius;
}
//重构后
//按照迁移式做法，我首先要对整个函数体使用提炼函数（106）：
function circum(radius) {
    return circumference(radius);
}
function circumference(radius) {
    return 2 * Math.PI * radius;
}



//范例3 （添加参数）
// 有空就直接看范例3。
class Book{
    addReservation(customer) {
        this._reservations.push(customer);
    }
}
//
class Book {
    addReservation(customer) {
        this.zz_addReservation(customer, false);
    }

    zz_addReservation(customer, isPriority) {
        assert(isPriority === true || isPriority === false);
        this._reservations.push(customer);
    }
}
//以前调用addReservation(customer) 的地方，改成 addReservation(customer，false)
class Book {
    addReservation(customer, isPriority) {
        assert(isPriority === true || isPriority === false);
        this._reservations.push(customer);
    }
}




//范例4  （把参数改为属性）
//原码  有空看例子4
function inNewEngland(aCustomer) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(aCustomer.address.state);
}
const newEnglanders = someCustomers.filter(c => inNewEngland(c));

//重构后
//1
function inNewEngland(aCustomer) {
    const stateCode = aCustomer.address.state;
    return xxNEWinNewEngland(stateCode);
}
function xxNEWinNewEngland(stateCode) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

//2
function inNewEngland(aCustomer) {
    return xxNEWinNewEngland(aCustomer.address.state);
}
const newEnglanders = someCustomers.filter(c => xxNEWinNewEngland(c.address.state));

//3
function NEWinNewEngland(stateCode) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

//最终
const newEnglanders = someCustomers.filter(c => inNewEngland(c.address.state));
function inNewEngland(stateCode) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

//自动化重构工具减少了迁移式做法的用武之地，同时也使迁移式做法更加高效。
// 自动化重构工具可以安全地处理相当复杂的改名、参数变更等情况，所以迁移式做法的用武之地就变少了，因为自动化重构工具经常能提供足够的支持。
// 如果遇到类似这里的例子，尽管工具无法自动完成整个重构，还是可以更快、更安全地完成关键的提炼和内联步骤，从而简化整个重构过程。



































































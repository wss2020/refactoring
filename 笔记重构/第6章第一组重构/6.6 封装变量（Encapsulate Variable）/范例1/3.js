let defaultOwner = {firstName: "Martin", lastName: "Fowler"};

function getDefaultOwner() {
    return defaultOwner;
}
function setDefaultOwner(arg) {
    defaultOwner = arg;
}

defaultOwner = {firstName: "Rebecca", lastName: "Parsons"};


//然后就开始处理使用defaultOwner的代码。每看见一处引用该数据的代码，就将其改为调用取值函数。
spaceship.owner = getDefaultOwner();

//每看见一处给变量赋值的代码，就将其改为调用设值函数。







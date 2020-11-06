
let defaultOwner = {firstName: "Martin", lastName: "Fowler"};
spaceship.owner = defaultOwner;
defaultOwner = {firstName: "Rebecca", lastName: "Parsons"};


//首先我要定义读取和写入这段数据的函数，给它做个基础的封装。
function getDefaultOwner() {
    return defaultOwner;
}
function setDefaultOwner(arg) {
    defaultOwner = arg;
}


//然后就开始处理使用defaultOwner的代码。每看见一处引用该数据的代码，就将其改为调用取值函数。










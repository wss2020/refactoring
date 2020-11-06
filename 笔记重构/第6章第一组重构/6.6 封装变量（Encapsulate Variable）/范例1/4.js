let defaultOwner = {firstName: "Martin", lastName: "Fowler"};

function getDefaultOwner() {
    return defaultOwner;
}
function setDefaultOwner(arg) {
    defaultOwner = arg;
}


spaceship.owner = getDefaultOwner();

//每看见一处给变量赋值的代码，就将其改为调用设值函数。
setDefaultOwner({firstName: "Rebecca", lastName: "Parsons"} );


/**
    每次替换之后，执行测试。
    处理完所有使用该变量的代码之后，我就可以限制它的可见性。
    这一步的用意有两个，一来是检查是否遗漏了变量的引用，二来可以保证以后的代码也不会直接访问该变量。
    在JavaScript中，我可以把变量和访问函数搬移到单独一个文件中，并且只导出访问函数，这样就限制了变量的可见性。
*/









/**
     每次替换之后，执行测试。
    处理完所有使用该变量的代码之后，我就可以限制它的可见性。
    这一步的用意有两个，一来是检查是否遗漏了变量的引用，二来可以保证以后的代码也不会直接访问该变量。
    在JavaScript中，我可以把变量和访问函数搬移到单独一个文件中，并且只导出访问函数，这样就限制了变量的可见性。
 */
//defaultOwner.js...
let defaultOwner = {firstName: "Martin", lastName: "Fowler"};
export function getDefaultOwner() {
    return defaultOwner;
}
export function setDefaultOwner(arg) {
    defaultOwner = arg;
}


import { getDefaultOwner, setDefaultOwner,  } from "./defaultOwner.js";
spaceship.owner = getDefaultOwner();
setDefaultOwner({firstName: "Rebecca", lastName: "Parsons"});



/**
    如果条件不允许限制对变量的访问，可以将变量改名，然后再次执行测试，
    检查是否仍有代码在直接使用该变量。这阻止不了未来的代码直接访问变量，不过可以给变量起个
 有意义又难看的名字（例如__privateOnly_defaultOwner），
    提醒后来的客户端。
    我不喜欢给取值函数加上get前缀，所以我对这个函数改名。
 */



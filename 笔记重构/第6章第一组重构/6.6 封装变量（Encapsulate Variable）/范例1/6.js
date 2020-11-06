/**
    如果条件不允许限制对变量的访问，可以将变量改名，然后再次执行测试，
    检查是否仍有代码在直接使用该变量。这阻止不了未来的代码直接访问变量，不过可以给变量起个
 有意义又难看的名字（例如__privateOnly_defaultOwner），
    提醒后来的客户端。
    我不喜欢给取值函数加上get前缀，所以我对这个函数改名。
 */

// defaultOwner.js...
let defaultOwnerData = {firstName: "Martin", lastName: "Fowler"};
export function getdefaultOwner() {
    return defaultOwnerData;
}
export function setDefaultOwner(arg) {
    defaultOwnerData = arg;
}


/**
    JavaScript有一种惯例：给取值函数和设值函数起同样的名字，根据有没有传入参数来区分。
    我把这种做法称为“重载取值/设值函数”（Overloaded Getter Setter）[mf-orgs]，并且我强烈反对这种做法。
    所以，虽然我不喜欢get前缀，但我会保留set前缀。
 */



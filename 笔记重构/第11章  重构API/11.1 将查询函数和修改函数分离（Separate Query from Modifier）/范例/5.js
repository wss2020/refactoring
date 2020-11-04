/**
 现在，原来的修改函数和新建的查询函数之间有大量的重复代码，我可以使用替换算法（195），
 让修改函数使用查询函数
 */

function alertForMiscreant(people) {
    if(findMiscreant(people) !== "" )  setOffAlarms();
}

function findMiscreant(people) {
    for (const p of people) {
        if (p === "Don") {
            return "Don";
        }
        if (p === "John") {
            return "John";
        }
    }
    return "";
}



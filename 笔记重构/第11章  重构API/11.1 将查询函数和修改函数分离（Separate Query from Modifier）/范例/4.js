//现在可以从修改函数中去掉所有返回值了。
function alertForMiscreant(people) {
    for (const p of people) {
        if (p === "Don") {
            setOffAlarms();
            return;
        }
        if (p === "John") {
            setOffAlarms();
            return;
        }
    }
    return;
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

/**
    现在，原来的修改函数和新建的查询函数之间有大量的重复代码，我可以使用替换算法（195），
 让修改函数使用查询函数
*/


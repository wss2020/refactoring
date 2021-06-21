function alertForMiscreant(people) {
    for (const p of people) {
        if (p === "Don") {
            setOffAlarms();
            return "Don";
        }
        if (p === "John") {
            setOffAlarms();
            return "John";
        }
    }
    return "";
}

//首先我复制整个函数，用它的查询部分功能为其命名。
function findMiscreant(people) {
    for (const p of people) {
        if (p === "Don") {
            setOffAlarms();
            return "Don";
        }
        if (p === "John") {
            setOffAlarms();
            return "John";
        }
    }
    return "";
}

//然后在新建的查询函数中去掉副作用。

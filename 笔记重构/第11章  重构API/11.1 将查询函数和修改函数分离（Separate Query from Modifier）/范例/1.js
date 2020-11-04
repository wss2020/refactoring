/**
    有这样一个函数：它会遍历一份恶棍（miscreant）名单，检查一群人（people）里是否混进了恶棍。
 如果发现了恶棍，该函数会返回恶棍的名字，并拉响警报。如果人群中有多名恶棍，该函数也只汇报找出的第
 一名恶棍（我猜这就已经够了）。
*/
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

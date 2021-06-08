/**
 在这个例子中，我们有一个CSV文件，里面存有各个办公室（office）的一些数据。
 office,        country,    telephone
 Chicago,       USA,        +1 312 373 1000
 Beijing,       China,      +86 4008 900 505
 Bangalore,     India,      +91 80 4064 9570
 Porto Alegre,  Brazil,     +55 51 3079 3550
 Chennai,       India,      +91 44 660 44766
 ... (more data follows)

 下面这个acquireData函数的作用是从数据中筛选出印度的所有办公室，并返回办公室所在的城市（city）信息和联系电话（telephone number）。
 */

/**
 * 从循环中删除代码还有一个好处，那就是firstLine这个控制变量也可以一并移除了——无论何时，删除控制变量总能使我身心愉悦。
 * 该循环的下一个行为是要移除数据中的所有空行。这同样可用一个过滤（filter）运算替代之。
 * 编写管道运算时，我喜欢让结尾的分号单占一行，这样方便调整管道的结构。
 */
function acquireData(input) {
    const lines = input.split("\n");
    const result = [];
    const loopItems = lines
        .slice(1)
        .filter(line => line.trim() !== "")
    ;

    for (const line of loopItems) {
        // if (line.trim() === "") continue;
        const record = line.split(",");
        if (record[1].trim() === "India") {
            result.push({city: record[0].trim(), phone: record[2].trim()});
        }
    }
    return result;
}

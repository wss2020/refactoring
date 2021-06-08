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
   循环第一部分的作用是在忽略CSV文件的第一行数据。这其实是一个切片（slice）操作，因此我先从循环中移除这部分代码，并在集合变量的声明后面新增一个对应
的slice运算来替代它。
 */
function acquireData(input) {
    const lines = input.split("\n");
    // let firstLine = true;
    const result = [];
    const loopItems = lines.slice(1);
    for (const line of loopItems) {
        //     if (firstLine) {
        //     firstLine = false;
        //     continue;
        // }
        if (line.trim() === "") continue;
        const record = line.split(",");
        if (record[1].trim() === "India") {
            result.push({city: record[0].trim(), phone: record[2].trim()});
        }
    }
    return result;
}

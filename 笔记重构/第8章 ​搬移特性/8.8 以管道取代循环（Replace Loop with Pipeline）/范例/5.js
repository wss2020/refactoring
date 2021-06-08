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
 接下来是将数据的一行转换成数组，这明显可以用一个map运算替代。然后我们还发现，原来的record命名其实有误导性，它没有体现出“转换得到的结果是数组”
 这个信息，不过既然现在还在做其他重构，先不动它会比较安全，回头再为它改名也不迟。
 */
function acquireData(input) {
    const lines = input.split("\n");
    const result = [];
    const loopItems = lines
        .slice(1)
        .filter(line => line.trim() !== "")
        .map(line => line.split(","))
    ;
    for (const line of loopItems) {
        const record = line;
        if (record[1].trim() === "India") {
            result.push({ city: record[0].trim(), phone: record[2].trim() });
        }
    }
    return result;
}

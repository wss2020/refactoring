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
   以上就是本手法的全部精髓所在了。不过后续还有些清理工作可做：我内联了result变量，为一些函数变量改名，最后还对代码进行布局，让它读起来更像个表格。
*/
function acquireData(input) {
    const lines = input.split("\n");
    return lines
        .slice(1)
        .filter (line => line.trim() !== "")
        .map(line => line.split(","))
        .filter (fields => fields[1].trim() === "India")
        .map(fields => ({city: fields[0].trim(), phone: fields[2].trim()}))
        ;
}

// 我还想过是否要内联lines变量，但我感觉它还算能解释该行代码的意图，因此我还是将它留在了原处。


/**
延伸阅读

   如果想了解更多用集合管道替代循环的案例，可以参考我的文章“Refactoring with Loops and Collection Pipelines”[mf-ref-pipe]。
*/



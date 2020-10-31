/*
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
function acquireData(input) {
    const lines = input.split("\n");
    let firstLine = true;

    const result = [];
    for (const line of lines) {
        if (firstLine) {
            firstLine = false;
            continue;
        }
        if (line.trim() === "") continue;
        const record = line.split(",");
        if (record[1].trim() === "India") {
            result.push({city: record[0].trim(), phone: record[2].trim()});
        }
    }
    return result;
}


/*
   这个循环略显复杂，我希望能用一组管道操作来替换它。

   第一步是先创建一个独立的变量，用来存放参与循环过程的集合值。
 */
function acquireData(input) {
    const lines = input.split("\n");
    let firstLine = true;
    const result = [];
    const loopItems = lines;

    for (const line of loopItems) {
        if (firstLine) {
            firstLine = false;
            continue;
        }
        if (line.trim() === "") continue;
        const record = line.split(",");
        if (record[1].trim() === "India") {
            result.push({city: record[0].trim(), phone: record[2].trim()});
        }
    }
    return result;
}

/*
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

/*
   从循环中删除代码还有一个好处，那就是firstLine这个控制变量也可以一并移除了——无论何时，删除控制变量总能使我身心愉悦。

   该循环的下一个行为是要移除数据中的所有空行。这同样可用一个过滤（filter）运算替代之。
 */
//编写管道运算时，我喜欢让结尾的分号单占一行，这样方便调整管道的结构。
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

/*
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
            result.push({city: record[0].trim(), phone: record[2].trim()});
        }
    }

    return result;

}

// 然后又是一个过滤（filter）操作，只从结果中筛选出印度办公室的记录。
function acquireData(input) {
    const lines = input.split("\n");
    const result = [];
    const loopItems = lines
        .slice(1)
        .filter(line => line.trim() !== "")
        .map(line => line.split(","))
        .filter(record => record[1].trim() === "India")
    ;

    for (const line of loopItems) {
        const record = line;
        // if (record[1].trim() === "India") {
            result.push({city: record[0].trim(), phone: record[2].trim()});
        // }
    }
    return result;
}


// 最后再把结果映射（map）成需要的记录格式：
function acquireData(input) {
    const lines = input.split("\n");
    const result = [];
    const loopItems = lines
        .slice(1)
        .filter(line => line.trim() !== "")
        .map(line => line.split(","))
        .filter(record => record[1].trim() === "India")
        .map(record => ({city: record[0].trim(), phone: record[2].trim()}))
    ;

    for (const line of loopItems) {
        const record = line;
        result.push(line);
    }

    return result;
}


//现在，循环剩余的唯一作用就是对累加变量赋值了。我可以将上面管道产出的结果赋值给该累加变量，然后删除整个循环：
function acquireData(input) {
    const lines = input.split("\n");
    const result = lines
        .slice(1)
        .filter(line => line.trim() !== "")
        .map(line => line.split(","))
        .filter(record => record[1].trim() === "India")
        .map(record => ({city: record[0].trim(), phone: record[2].trim()}))
    ;

    // for (const line of loopItems) {
        // const record = line;
        // result.push(line);
    // }

    return result;
}


/*
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


/*
延伸阅读

   如果想了解更多用集合管道替代循环的案例，可以参考我的文章“Refactoring with Loops and Collection Pipelines”[mf-ref-pipe]。
*/






































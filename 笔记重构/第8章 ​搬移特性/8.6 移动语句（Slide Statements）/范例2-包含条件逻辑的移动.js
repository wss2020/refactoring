/*
   对于拥有条件逻辑的代码，移动手法同样适用。当从条件分支中移走代码时，通常是要消除重复逻辑；将代码移入条件分支时，通常是反过来，有意添加一些重复逻辑。
在下面这个例子中，两个条件分支里都有一个相同的语句：
 */
function test() {
    let result;
    if (availableResources.length === 0) {
        result = createResource();
        allocatedResources.push(result);
    } else {
        result = availableResources.pop();
        allocatedResources.push(result);
    }
    return result;
}




//我可以将这两句重复代码从条件分支中移走，只在if-else块的末尾保留一句。
function test() {
    let result;
    if (availableResources.length === 0) {
        result = createResource();
    } else {
        result = availableResources.pop();
    }
    allocatedResources.push(result);
    return result;
}

// 这个手法同样可以反过来用，也就是把一个语句分别搬移到不同的条件分支里，这样会在每个条件分支里留下同一段重复的代码。

/*
延伸阅读

   除了我介绍的这个方法，我还见过一个十分相似的重构手法，名字叫作“交换语句位置”（Swap Statement）[wake-swap]。该手法同样适用于移动相邻的代码片
段，只不过它适用的是只有一条语句的片段。你可以把它想成移动语句手法的一个特例，也就是待移动的代码片段以及它所跨过的代码片段，都只有一条语句。我对这项重
构手法很感兴趣，毕竟我也一直在强调小步修改——有时甚至小步到于初学重构的人看来都很不可思议的地步。

   但最后，我还是选择在本重构手法中介绍如何移动范围更大的代码片段，因为我自己平时就是这么做的。我只有在处理大范围的语句移动遇到困难时才会变得小步、一
次只移动一条语句，但即便是这样的困难我也很少遇见。无论如何，当代码过于复杂凌乱时，小步的移动通常会更加顺利。
 */

















































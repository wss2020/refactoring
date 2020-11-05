//反向重构：以查询取代参数（324）

targetTemperature(aPlan)
function targetTemperature(aPlan) {
    currentTemperature = thermostat.currentTemperature;
    // rest of function...
}


targetTemperature(aPlan, thermostat.currentTemperature)
function targetTemperature(aPlan, currentTemperature) {
    // rest of function...
}




/**
动机
    在浏览函数实现时，我有时会发现一些令人不快的引用关系，例如，引用一个全局变量，或者引用另一个我想要移除的元素。
 为了解决这些令人不快的引用，我需要将其替换为函数参数，从而将处理引用关系的责任转交给函数的调用者。

    需要使用本重构的情况大多源于我想要改变代码的依赖关系——为了让目标函数不再依赖于某个元素，我把这个元素的值以参数
 形式传递给该函数。这里需要注意权衡：如果把所有依赖关系都变成参数，会导致参数列表冗长重复；如果作用域之间的共享太多，
 又会导致函数间依赖过度。我一向不善于微妙的权衡， 所以“能够可靠地改变决定”就显得尤为重要，这样随着我的理解加深，程
 序也能从中受益。

    如果一个函数用同样的参数调用总是给出同样的结果，我们就说这个函数具有“引用透明性”（referential transparency），
 这样的函数理解起来更容易。如果一个函数使用了另一个元素，而后者不具引用透明性，那么包含该元素的函数也就失去了引用透明性。
 只要把“不具引用透明性的元素”变成参数传入，函数就能重获引用透明性。虽然这样就把责任转移给了函数的调用者，但是具有引用透
 明性的模块能带来很多益处。有一个常见的模式：在负责逻辑处理的模块中只有纯函数，其外再包裹处理I/O和其他可变元素的逻辑代码。
 借助以参数取代查询， 我可以提纯程序的某些组成部分，使其更容易测试、更容易理解。

    不过以参数取代查询并非只有好处。把查询变成参数以后，就迫使调用者必须弄清如何提供正确的参数值，这会增加函数调用者的复
 杂度，而我在设计接口时通常更愿意让接口的消费者更容易使用。归根到底，这是关于程序中责任分配的问题，而这方面的决策既不容易，
 也不会一劳永逸——这就是我需要非常熟悉本重构（及其反向重构）的原因。
 */


/**
做法
    对执行查询操作的代码使用提炼变量（119），将其从函数体中分离出来。
    现在函数体代码已经不再执行查询操作（而是使用前一步提炼出的变量），对这部分代码使用提炼函数（106）。
    注意：给提炼出的新函数起一个容易搜索的名字，以便稍后改名。
    使用内联变量（123），消除刚才提炼出来的变量。
    对原来的函数使用内联函数（115）。
    对新函数改名，改回原来函数的名字。
*/

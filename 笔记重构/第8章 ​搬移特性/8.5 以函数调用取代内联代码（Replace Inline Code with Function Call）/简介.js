//修改前
let appliesToMass = false;
for (const s of states) {
    if (s === "MA") appliesToMass = true;
}


//修改后
let appliesToMass = states.includes("MA");



/**
动机

   善用函数可以帮助我将相关的行为打包起来，这对于提升代码的表达力大有裨益—— 一个命名良好的函数，本身就能极好地解释代码的用途，使读者不必了解其细节。
函数同样有助于消除重复，因为同一段代码我不需要编写两次，每次调用一下函数即可。此外，当我需要修改函数的内部实现时，也不需要四处寻找有没有漏改的相似代码。
（当然，我可能需要检查函数的所有调用点，判断它们是否都应该使用新的实现，但通常很少需要这么仔细，即便需要，也总好过四处寻找相似代码。）

   如果我见到一些内联代码，它们做的事情仅仅是已有函数的重复，我通常会以一个函数调用取代内联代码。但有一种情况需要特殊对待，那就是当内联代码与函数之间
只是外表相似但其实并无本质联系时。这种情况下，当我改变了函数实现时，并不期望对应内联代码的行为发生改变。判断内联代码与函数之间是否真正重复，从函数名往
往可以看出端倪：如果一个函数命名得当，也确实与内联代码做了一样的事，那么这个名字用在内联代码的语境里也应该十分协调；如果函数名显得不协调，可能是因为命
名本身就比较糟糕（此时可以运用函数改名（124）来解决），也可能是因为函数与内联代码彼此的用途确实有所不同。若是后者的情况，我就不应该用函数调用取代该
内联代码。

   我发现，配合一些库函数使用，会使本手法效果更佳，因为我甚至连函数体都不需要自己编写了，库已经提供了相应的函数。
 */


/**
做法

  将内联代码替代为对一个既有函数的调用。

  测试。
 */













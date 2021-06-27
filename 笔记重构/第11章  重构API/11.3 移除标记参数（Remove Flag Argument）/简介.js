// 曾用名：以明确函数取代参数（Replace Parameter with Explicit Methods）

//重构前
function setDimension(name, value) {
    if (name === "height") {
        this._height = value;
        return;
    }
    if (name === "width") {
        this._width = value;
        return;
    }
}


//重构后
function setHeight(value) {
    this._height = value;
}
function setWidth(value) {
    this._width = value;
}



/**
 动机

    “标记参数”是这样的一种参数：调用者用它来指示被调函数应该执行哪一部分逻辑。例如，我可能有下面这样一
 个函数：

 function bookConcert(aCustomer, isPremium) {
   if (isPremium) {
        // logic for premium booking
   } else {
        // logic for regular booking
   }
 }

 要预订一场高级音乐会（premium concert），就得这样发起调用：bookConcert(aCustomer, true);

 标记参数也可能以枚举的形式出现：
 bookConcert(aCustomer, CustomerType.PREMIUM);

 或者是以字符串（或者符号，如果编程语言支持的话）的形式出现：
 bookConcert(aCustomer, "premium");

    我不喜欢标记参数，因为它们让人难以理解到底有哪些函数可以调用、应该怎么调用。拿到一份API以后，我首先
 看到的是一系列可供调用的函数，但标记参数却隐藏了函数调用中存在的差异性。使用这样的函数，我还得弄清标记
 参数有哪些可用的值。布尔型的标记尤其糟糕，因为它们不能清晰地传达其含义——在调用一个函数时，我很难弄清
 true到底是什么意思。如果明确用一个函数来完成一项单独的任务，其含义会清晰得多。
 premiumBookConcert(aCustomer);

    并非所有类似这样的参数都是标记参数。如果调用者传入的是程序中流动的数据，这样的参数不算标记参数；只有
 调用者直接传入字面量值，这才是标记参数。另外，在函数实现内部，如果参数值只是作为数据传给其他函数，这就不
 是标记参数；只有参数值影响了函数内部的控制流，这才是标记参数。

    移除标记参数不仅使代码更整洁，并且能帮助开发工具更好地发挥作用。去掉标记参数后，代码分析工具能更容易
 地体现出“高级”和“普通”两种预订逻辑在使用时的区别。

    如果一个函数有多个标记参数，可能就不得不将其保留，否则我就得针对各个参数的各种取值的所有组合情况提供
 明确函数。不过这也是一个信号，说明这个函数可能做得太多，应该考虑是否能用更简单的函数来组合出完整的逻辑。

 */


/**
 做法

    针对参数的每一种可能值，新建一个明确函数。
    注意：如果主函数有清晰的条件分发逻辑，可以用分解条件表达式（260）创建明确函数；否则，可以在原函数之上创建包装函数。
    对于“用字面量值作为参数”的函数调用者，将其改为调用新建的明确函数。
 */


















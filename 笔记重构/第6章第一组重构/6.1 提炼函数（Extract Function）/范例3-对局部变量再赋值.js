/*
   如果被提炼代码段对局部变量赋值，问题就变得复杂了。这里我们只讨论临时变量的问题。
   如果你发现源函数的参数被赋值，应该马上使用拆分变量（240）将其变成临时变量。

   被赋值的临时变量也分两种情况。
       较简单的情况是：这个变量只在被提炼代码段中使用。若果真如此，你可以将这个临时变量的声明移到被提炼代码段中，然后一起提炼出去。
       如果变量的初始化和使用离得有点儿远，可以用移动语句（223）把针对这个变量的操作放到一起。

   比较糟糕的情况是：被提炼代码段之外的代码也使用了这个变量。
   此时我需要返回修改后的值。我会用下面这个已经很眼熟的函数来展示该怎么做：
*/


function printOwing(invoice) {
    let outstanding = 0;

    printBanner();


    for (const o of invoice.orders) {
        outstanding += o.amount;
    }

    recordDueDate(invoice);
    printDetails(invoice, outstanding);
}



//1.前面的重构我都一步到位地展示了结果，因为它们都很简单。但这次我会一步一步展示“做法”里的每个步骤。
//首先，把变量声明移动到使用处之前。
function printOwing(invoice) {
    printBanner();

    let outstanding = 0;
    for (const o of invoice.orders) {
        outstanding += o.amount;

    }

    recordDueDate(invoice);
    printDetails(invoice, outstanding);
}

//2.然后把想要提炼的代码复制到目标函数中。

function printOwing(invoice) {
    printBanner();

    let outstanding = 0;
    for (const o of invoice.orders) {
        outstanding += o.amount;
    }

    recordDueDate(invoice);
    printDetails(invoice, outstanding);

}
function calculateOutstanding(invoice) {
    let outstanding = 0;
    for (const o of invoice.orders) {
        outstanding += o.amount;
    }
    return outstanding;
}

/*
  由于outstanding变量的声明已经被搬移到提炼出的新函数中，就不需要再将其作为参数传入了。outstanding是提炼代码段中唯一被重新赋值的变量，所以我可以
直接返回它。

  我的JavaScript环境在编译期提供不了任何价值——简直还不如文本编辑器的语法分析有用，所以“做法”里的“编译”一步可以跳过了。下一件事是修改原来的代码，令
其调用新函数。新函数返回了修改后的outstanding变量值，我需要将其存入原来的变量中
 */

function printOwing(invoice) {
    printBanner();
    let outstanding = calculateOutstanding(invoice);
    recordDueDate(invoice);
    printDetails(invoice, outstanding);
}

function calculateOutstanding(invoice) {
    let outstanding = 0;
    for (const o of invoice.orders) {
        outstanding += o.amount;
    }
    return outstanding;
}



//在收工之前，我还要修改返回值的名字，使其符合我一贯的编码风格。
function printOwing(invoice) {
    printBanner();
    const outstanding = calculateOutstanding(invoice);
    recordDueDate(invoice);
    printDetails(invoice, outstanding);
}

function calculateOutstanding(invoice) {
    let result = 0;
    for (const o of invoice.orders) {
        result += o.amount;
    }
    return result;
}


/*
   我还顺手把原来的outstanding变量声明成const的，令其在初始化之后不能再次被赋值。

   这时候，你可能会问：“如果需要返回的变量不止一个，又该怎么办呢？”

   有几种选择。最好的选择通常是：挑选另一块代码来提炼。我比较喜欢让每个函数都只返回一个值，所以我会安排多个函数，用以返回多个值。如果真的有必要提炼一
个函数并返回多个值，可以构造并返回一个记录对象—不过通常更好的办法还是回过头来重新处理局部变量，我常用的重构手法有以查询取代临时变量（178）和拆分变量（240）。

   如果我想把提炼出的函数搬移到别的上下文（例如变成顶层函数），会引发一些有趣的问题。我偏好小步前进，所以我本能的做法是先提炼成嵌套函数，然后再将其移
入新的上下文。但这种做法的麻烦在于处理局部变量，而这个困难无法提前发现，直到我开始最后的搬移时才突然暴露。从这个角度考虑，即便可以先提炼成嵌套函数，
或许也应该至少将目标函数放在源函数的同级，这样我就能立即看出提炼的范围是否合理。

 */





















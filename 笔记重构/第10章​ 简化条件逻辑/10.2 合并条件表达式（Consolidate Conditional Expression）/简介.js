
//修改前
function disabilityAmount(anEmployee) {
    if (anEmployee.seniority < 2) return 0;
    if (anEmployee.monthsDisabled > 12) return 0;
    if (anEmployee.isPartTime) return 0;
}



//修改后
function disabilityAmount(anEmployee) {
    if (isNotEligibleForDisability()) return 0;
}
function isNotEligibleForDisability() {
    return ( (anEmployee.seniority < 2) || (anEmployee.monthsDisabled > 12) || (anEmployee.isPartTime));
}


/**
动机

   有时我会发现这样一串条件检查：检查条件各不相同，最终行为却一致。
   如果发现这种情况，就应该使用“逻辑或”和“逻辑与”将它们合并为一个条件表达式。

   之所以要合并条件代码，有两个重要原因。
       首先，合并后的条件代码会表述“实际上只有一次条件检查，只不过有多个并列条件需要检查而已”，从而使这一次检查的用意更清晰。
         当然，合并前和合并后的代码有着相同的效果，但原先代码传达出的信息却是“这里有一些各自独立的条件测试，它们只是恰好同时发生”。
       其次，这项重构往往可以为使用提炼函数（106）做好准备。
         将检查条件提炼成一个独立的函数对于理清代码意义非常有用，因为它把描述“做什么”的语句换成了“为什么这样做”。

   条件语句的合并理由也同时指出了不要合并的理由：如果我认为这些检查的确彼此独立，的确不应该被视为同一次检查，我就不会使用本项重构。

 */


/**
做法

   确定这些条件表达式都没有副作用。
      如果某个条件表达式有副作用，可以先用将查询函数和修改函数分离（306）处理。

   使用适当的逻辑运算符，将两个相关条件表达式合并为一个。
      顺序执行的条件表达式用逻辑或来合并，嵌套的if语句用逻辑与来合并。

   测试。

   重复前面的合并过程，直到所有相关的条件表达式都合并到一起。

   可以考虑对合并后的条件表达式实施提炼函数（106）。

 */


















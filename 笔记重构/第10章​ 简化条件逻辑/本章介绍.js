/*
   程序的大部分威力来自条件逻辑，但很不幸，程序的复杂度也大多来自条件逻辑。
   1.我经常借助重构把条件逻辑变得更容易理解。我常用分解条件表达式（260）处理复杂的条件表达式，用合并条件表达式（263）厘清逻辑组合。
   2.我会用以卫语句取代嵌套条件表达式（266）清晰表达“在主要处理逻辑之前先做检查”的意图。
   3.如果我发现一处switch逻辑处理了几种情况，可以考虑拿出以多态取代条件表达式（272）重构手法。
   4.很多条件逻辑是用于处理特殊情况的，
      例如,处理null值。如果对某种特殊情况的处理逻辑大多相同，那么可以用引入特例（289）（常被称作引入空对象）消除重复代码。
      另外,虽然我很喜欢去除条件逻辑，但如果我想明确地表述（以及检查）程序的状态，引入断言（302）是一个不错的补充。


    分解条件表达式（Decompose Conditional)
    合并条件表达式（Consolidate Conditional Expression)
    以卫语句取代嵌套条件表达式（Replace Nested Conditional with Guard Clauses)
    以多态取代条件表达式（Replace Conditional with Polymorphism)
    引入特例（Introduce Special Case)
    引入断言（Introduce Assertion)
*/

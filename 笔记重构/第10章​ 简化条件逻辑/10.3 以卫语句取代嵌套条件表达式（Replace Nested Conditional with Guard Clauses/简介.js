// 修改前
function getPayAmount() {
    let result;
    if (isDead)
        result = deadAmount();
    else {
        if (isSeparated)
            result = separatedAmount();
        else {
            if (isRetired)
                result = retiredAmount();
            else
                result = normalPayAmount();
        }
    }
    return result;
}



//修改后
function getPayAmount() {
    if (isDead) return deadAmount();

    if (isSeparated) return separatedAmount();
    if (isRetired) return retiredAmount();
    return normalPayAmount();
}


/*
动机
  根据我的经验，条件表达式通常有两种风格。
     第一种风格是：两个条件分支都属于正常行为。
     第二种风格则是：只有一个条件分支是正常行为，另一个分支则是异常的情况。

  这两类条件表达式有不同的用途，这一点应该通过代码表现出来。
      如果两条分支都是正常行为，就应该使用形如if...else...的条件表达式；
      如果某个条件极其罕见，就应该单独检查该条件，并在该条件为真时立刻从函数中返回。这样的单独检查常常被称为“卫语句”（guard clauses）。

  以卫语句取代嵌套条件表达式的精髓就是：给某一条分支以特别的重视。
        如果使用if-then-else结构，你对if分支和else分支的重视是同等的。
        这样的代码结构传递给阅读者的消息就是：各个分支有同样的重要性。
        卫语句就不同了，它告诉阅读者：“这种情况不是本函数的核心逻辑所关心的，如果它真发生了，请做一些必要的整理工作，然后退出。”

  “每个函数只能有一个入口和一个出口”的观念，根深蒂固于某些程序员的脑海里。
      我发现，当我处理他们编写的代码时，经常需要使用以卫语句取代嵌套条件表达式。
      现今的编程语言都会强制保证每个函数只有一个入口，至于“单一出口”规则，其实不是那么有用。
        在我看来，保持代码清晰才是最关键的：如果单一出口能使这个函数更清楚易读，那么就使用单一出口；否则就不必这么做。
 */


/*
做法

 选中最外层需要被替换的条件逻辑，将其替换为卫语句。

 测试。

 有需要的话，重复上述步骤。

 如果所有卫语句都引发同样的结果，可以使用合并条件表达式（263）合并之。
*/
































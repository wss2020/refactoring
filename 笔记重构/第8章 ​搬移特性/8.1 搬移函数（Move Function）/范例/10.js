/**
 如果出于某些原因，实在需要保留该变量，那么我建议将该变量改个其他的名字，比如totalDistanceCache或distance等。
 由于distance函数和radians函数并未使用totalDistance中的任何变量或函数，因此我倾向于把它们也提升到顶层，也就是4个方法都放置在顶层作用域上。
 */
function trackSummary(points) {  }
function totalDistance(points) {  }
function distance(p1,p2) {  }
function radians(degrees) {  }


/**
 有些人则更倾向于将distance和radians函数保留在totalDistance内，以便限制它们的可见性。在某些语言里，这个顾虑也许有其道理，但新的ES 2015规范
 为JavaScript提供了一个美妙的模块化机制，利用它来控制函数的可见性是再好不过了。通常来说，我对嵌套函数还是心存警惕的，因为很容易在里面编写一些私有数据，
 并且在函数之间共享，这可能会增加代码的阅读和重构难度。
 */

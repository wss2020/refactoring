/*
   如果要改名的变量只作用于一个函数（临时变量或者参数），对其改名是最简单的。
   这种情况太简单，根本不需要范例：找到变量的所有引用，修改过来就行。完成修改之后，我会执行测试，确保没有破坏什么东西。

   如果变量的作用域不止于单个函数，问题就会出现。代码库的各处可能有很多地方使用它：
 */


let tpHd = "untitled";
// 有些地方是在读取变量值：
result += `<h1>${tpHd}</h1>`;
// 另一些地方则更新它的值：
tpHd = obj['articleTitle'];



//1.对于这种情况，我通常的反应是运用封装变量（132）：
result += `<h1>${title()}</h1>`;
setTitle(obj['articleTitle']);
function title(){
    return tpHd;
}
function setTitle(arg) {
    tpHd = arg;
}

//2.现在就可以给变量改名：
let _title = "untitled";
function title() {
    return _title;
}
function setTitle(arg) {
    _title = arg;
}


/*
  我可以继续重构下去，将包装函数内联回去，这样所有的调用者就变回直接使用变量的状态。
  不过我很少这样做。如果这个变量被广泛使用，以至于我感到需要先做封装才敢改名，那就有必要保持这个状态，将变量封装在函数后面。

  如果我确实想内联，在重构过程中，我就会将取值函数命名为getTitle，并且其中的变量名也不会以下划线开头。
 */






























































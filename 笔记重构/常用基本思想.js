/**
 1.一个函数只做一件事
 2.函数的起名，表达函数做什么，而不是怎么做


 */


/**
  Webstrom重构快捷键：
  https://blog.csdn.net/weixin_34132768/article/details/88741252
  https://blog.csdn.net/phodal/article/details/100518991


  重命名变量：Shift + F6
  内联：     Command + Option + N
  变量替换：  Command + Option + V   将相同的表达式提取出来赋值给一个变量，并更新引用。
  提取方法：  Command + Option + M
        ：  Command + Option + F   将表达式提取出来使其成为类的属性，并自动更新引用。
        ：  Command + Option + P   将表达式变成由参数传入
        ：  Command+F6             修改函数签名（函数名，函数参数），并自动更新相关引用。
*/





class People {
    constructor(name) {
        var addr= 'shenzhen';
        this.name = name;
        this.sayName();
    }
    sayName() {
        console.log(this.name);
    }
}


function testFn(value){
    doFn1('evan is a good guy!!!',value);
}
var desc = 'may is a good girl';
testFn(desc);



function testFn(args){
    doFn1(args);
    doFn2(args);
    doFn3(args);
}
testFn("may is a good girl");
testFn("may is a good girl");




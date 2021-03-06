/**

曾用名：移除对参数的赋值（Remove Assignments to Parameters）

曾用名：分解临时变量（Split Temp）
 */



// 修改前
let temp = 2 * (height + width);
console.log(temp);
temp = height * width;
console.log(temp);



//重构后
const perimeter = 2 * (height + width);
console.log(perimeter);
const area = height * width;
console.log(area);





/**
动机

   变量有各种不同的用途，其中某些用途会很自然地导致临时变量被多次赋值。
   “循环变量”和“结果收集变量”就是两个典型例子：
     1）循环变量（loop variable）会随循环的每次运行而改变（例如for（let i=0; i<10; i++）语句中的i）；
     2）结果收集变量（collecting variable）负责将“通过整个函数的运算”而构成的某个值收集起来。

  除了这两种情况，还有很多变量用于保存一段冗长代码的运算结果，以便稍后使用。
  这种变量应该只被赋值一次。如果它们被赋值超过一次，就意味它们在函数中承担了一个以上的责任。
  如果变量承担多个责任，它就应该被替换（分解）为多个变量，每个变量只承担一个责任。
  同一个变量承担两件不同的事情，会令代码阅读者糊涂。

 */



/**
做法

   在待分解变量的声明及其第一次被赋值处，修改其名称。

   如果稍后的赋值语句是“i=i+某表达式形式”，意味着这是一个结果收集变量，就不要分解它。结果收集变量常用于累加、字符串拼接、写入流或者向集合添加元素。

   如果可能的话，将新的变量声明为不可修改。

   以该变量的第二次赋值动作为界，修改此前对该变量的所有引用，让它们引用新变量。

   测试。

   重复上述过程。每次都在声明处对变量改名，并修改下次赋值之前的引用，直至到达最后一处赋值。

 */
































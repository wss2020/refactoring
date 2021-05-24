
// P315   P202

//修改前
function base(aReading) {}
function taxableCharge(aReading) {}
function calculateBaseCharge(aReading) {}


// 修改后
class Reading {
    base() {}
    taxableCharge() {}
    calculateBaseCharge() {}
}

/**
动机

    类，在大多数现代编程语言中都是基本的构造。它们把数据与函数捆绑到同一个环境中，将一部分数据与函数暴露给其他程序元素以便协作。
    它们是面向对象语言的首要构造，在其他程序设计方法中也同样有用。

    如果发现一组函数形影不离地操作同一块数据（通常是将这块数据作为参数传递给函数），我就认为，是时候组建一个类了。
    类能明确地给这些函数提供一个共用的环境，在对象内部调用这些函数可以少传许多参数，从而简化函数调用，并且这样一个对象也可以更方便地传递给系统的其他部分。

    除了可以把已有的函数组织起来，这个重构还给我们一个机会，去发现其他的计算逻辑，将它们也重构到新的类当中。

    将函数组织到一起的另一种方式是函数组合成变换（149）。具体使用哪个重构手法，要看程序整体的上下文。

    使用类有一大好处：客户端可以修改对象的核心数据，通过计算得出的派生数据则会自动与核心数据保持一致。

    类似这样的一组函数不仅可以组合成一个类，而且可以组合成一个嵌套函数。通常我更倾向于类而非嵌套函数，因为后者测试起来会比较困难。

    如果我想对外暴露多个函数，也必须采用类的形式。
    在有些编程语言中，类不是一等公民，而函数则是。
    面对这样的语言，可以用“函数作为对象”（Function As Object）[mf-fao]的形式来实现这个重构手法。
 */



/**
做法

  运用封装记录（162）对多个函数共用的数据记录加以封装。
     如果多个函数共用的数据还未组织成记录结构，则先运用引入参数对象（140）将其组织成记录。
  对于使用该记录结构的每个函数，运用搬移函数（198）将其移入新类。
  如果函数调用时传入的参数已经是新类的成员，则从参数列表中去除之。
  用以处理该数据记录的逻辑可以用提炼函数（106）提炼出来，并移入新类。
 */





























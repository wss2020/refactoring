
//首先 在Person中建立一个函数，用于获取受托对象。
class Person {
    get department() {
        return this._department;
    }
    get manager() {
        return this._department.manager;
    }
}
class Department{
    get manager() {return this._manager;}
}

//客户端
manager = aPerson.department.manager;


/**
    然后逐一处理每个客户端，使它们直接通过受托对象完成工作。客户端代码...

    完成对客户端引用点的替换后，我就可以从Person中移除manager方法了。我可以重复此法，移除Person中其他类似的简单委托函数。

    我可以混用两种用法。有些委托关系非常常用，因此我想保住它们，这样可使客户端代码调用更友好。
 何时应该隐藏委托关系，何时应该移除中间人，对我而言没有绝对的标准——代码环境自然会给出该使用哪种手法的线索，
 具备思考能力的程序员应能分辨出何种手法更佳。

    如果手边在用自动化的重构工具，那么本手法的步骤有一个实用的变招：我可以先对department应用封装变量（132）。
 这样可让manager的取值函数调用department的取值函数。
 */



/**
 我又要从一个Person类开始了，这个类通过维护一个部门对象来决定某人的经理是谁。
 （如果你一口气读完本书的好几章，可能会发现每个“人与部门”的例子都出奇地相似。）
 */

//客户端代码...
manager = aPerson.manager;

class Person {
    get manager() {
        return this._department.manager;
    }
}

class Department {
    get manager() {
        return this._manager;
    }
}


/**
 像这样，使用和封装Department都很简单。但如果大量函数都这么做，我就不得不在Person之中安置大量委托行为。
 这就该是移除中间人的时候了。
 */

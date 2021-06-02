//首先 在Person中建立一个函数，用于获取受托对象。
class Person {
    get _department(){
        return new Department();
    }

    get department() {
        return this._department;
    }

    get manager() {
        return this.department.manager;
    }
}

class Department {
    get manager() {
        return this._manager;
    }
}

//客户端
manager = aPerson.department.manager;


/**
 在JavaScript中，调用取值函数的语法跟取用普通字段看起来很像，但通过移除department字段的下划线，
 我想表达出这里是调用了取值函数而非直接取用字段的区别。
 然后我对manager方法应用内联函数（115），一口气替换它的所有调用点
 */

//我有一个很简单的Person类。
class Person {
    get name() {
        return this._name;
    }
    set name(arg) {
        this._name = arg;
    }
    get id() {
        return this._id;
    }
    set id(arg) {
        this._id = arg;
    }
}

//目前我会这样创建新对象：
const martin = new Person();
martin.name = "martin";
martin.id = "1234";

/**
    对象创建之后，name字段可能会改变，但id字段不会。为了更清晰地表达这个设计意图，
 我希望移除对应id字段的设值函数。
    但id字段还得设置初始值，所以我首先用改变函数声明（124）在构造函数中添加对应的参数。
 */


/**
    还是前面这个例子，我们回到最起初的状态，不过这次我已经有了“全职员工”和“兼职员工”两个子类，所以不能再根据员工类别代码创建子类了。
 另外，我可能需要允许员工类别动态调整，这也会导致不能使用直接继承的方案。
 */
class Employee {
    constructor(name, type) {
        this.validateType(type);
        this._name = name;
        this._type = type;
    }

    validateType(arg) {
        if (!["engineer", "manager", "salesman"].includes(arg))
            throw new Error(`Employee cannot be of type ${arg}`);
    }

    get type() {
        return this._type;
    }

    set type(arg) {
        this._type = arg;
    }

    get capitalizedType() {
        return this._type.charAt(0).toUpperCase() + this._type.substr(1).toLowerCase();
    }

    toString() {
        return `${this._name} (${this.capitalizedType})`;
    }
}


// 首先，我用以对象取代基本类型（174）包装类型码。









let result = new Employee("wss","engineer");
console.log( result.toString() );










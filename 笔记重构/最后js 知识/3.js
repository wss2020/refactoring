//拷贝访问器
const obj = {
    foo: 1,
    get bar() {
        return 2;
    }
};
let copy = Object.assign({}, obj);
console.log(copy); // { foo: 1, bar: 2 } copy.bar的值来自obj.bar的getter函数的返回值
// 下面这个函数会拷贝所有自有属性的属性描述符
function completeAssign(target, ...sources) {
    sources.forEach(source => {
        let descriptors = Object.keys(source).reduce((descriptors, key) => {
            descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
            return descriptors;
        }, {});
        // Object.assign 默认也会拷贝可枚举的Symbols
        Object.getOwnPropertySymbols(source).forEach(sym => {
            let descriptor = Object.getOwnPropertyDescriptor(source, sym);
            if (descriptor.enumerable) {
                descriptors[sym] = descriptor;
            }
        });
        Object.defineProperties(target, descriptors);
    });
    return target;
}

copy = completeAssign({}, obj);
console.log(copy);
// { foo:1, get bar() { return 2 } }

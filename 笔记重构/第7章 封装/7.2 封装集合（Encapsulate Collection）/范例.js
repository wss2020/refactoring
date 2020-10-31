// 假设有个人（Person）要去上课。我们用一个简单的Course来表示“课程”。
class Person {
    constructor(name) {
        this._name = name;
        this._courses = [];
    }
    get name() {
        return this._name;
    }
    get courses() {
        return this._courses;
    }
    set courses(aList) {
        this._courses = aList;
    }
}

class Course {
    constructor(name, isAdvanced) {
        this._name = name;
        this._isAdvanced = isAdvanced;
    }
    get name() {
        return this._name;
    }
    get isAdvanced() {
        return this._isAdvanced;
    }
}

//客户端会使用课程集合来获取课程的相关信息。
numAdvancedCourses = aPerson.courses
                     .filter(c => c.isAdvanced)
                     .length;

/*
   有些开发者可能觉得这个类已经得到了恰当的封装，毕竟，所有的字段都被访问函数保护到了。但我要指出，对课程列表的封装还不完整。诚然，对列表整体的任何更
新操作，都能通过设值函数得到控制。
 */

//客户端代码...
const basicCourseNames = readBasicCourseNames(filename);
aPerson.courses = basicCourseNames.map(name => new Course(name, false));

//但客户端也可能发现，直接更新课程列表显然更容易。

//客户端代码...
for (const name of readBasicCourseNames(filename)) {
    aPerson.courses.push(new Course(name, false));
}

/*
   这就破坏了封装性，因为以此种方式更新列表Person类根本无从得知。这里仅仅封装了字段引用，而未真正封装字段的内容。现在我来对类实施真正恰当的封装，首
先要为类添加两个方法，为客户端提供“添加课程”和“移除课程”的接口。
 */


class Person {
    addCourse(aCourse) {
        this._courses.push(aCourse);
    }
    removeCourse(aCourse, fnIfAbsent = () => {throw new RangeError();}) {
        const index = this._courses.indexOf(aCourse);
        if (index === -1) fnIfAbsent();
        else this._courses.splice(index, 1);
    }
}
/*
   对于移除操作，我得考虑一下，如果客户端要求移除一个不存在的集合元素怎么办。我可以耸耸肩装作没看见，也可以抛出错误。这里我默认让它抛出错误，但留给客
户端一个自己处理的机会。然后我就可以让直接修改集合值的地方改用新的方法了。
 */
//客户端代码...
for (const name of readBasicCourseNames(filename)) {
    aPerson.addCourse(new Course(name, false));
}

/*
   有了单独的添加和移除方法，通常setCourse设值函数就没必要存在了。若果真如此，我就会使用移除设值函数（331）移除它。如果出于其他原因，必须提供一个
设值方法作为API，我至少要确保用一份副本给字段赋值，不去修改通过参数传入的集合。
 */
class Person {
    set courses(aList) {
        this._courses = aList.slice();
    }
}

//这套设施让客户端能够使用正确的修改方法，同时我还希望能确保所有修改都通过这些方法进行。为达此目的，我会让取值函数返回一份副本。
class Person {
    get courses() {
        return this._courses.slice();
    }
}

/*
    总的来讲，我觉得对集合保持适度的审慎是有益的，我宁愿多复制一份数据，也不愿去调试因意外修改集合招致的错误。修改操作并不总是显而易见的，比如，
在JavaScript中原生的数组排序函数sort()就会修改原数组，而在其他语言中默认都是为更改集合的操作返回一份副本。任何负责管理集合的类都应该总是返回数据
副本，但我还养成了一个习惯，只要我做的事看起来可能改变集合，我也会返回一个副本。
 */



















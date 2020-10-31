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
//客户端
const basicCourseNames = readBasicCourseNames(filename);
aPerson.courses = basicCourseNames.map(name => new Course(name, false));
for (const name of readBasicCourseNames(filename)) {
    aPerson.courses.push(new Course(name, false));
}



//重构
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

    addCourse(aCourse) {
        this._courses.push(aCourse);
    }
    removeCourse(aCourse, fnIfAbsent = () => {throw new RangeError();}) {
        const index = this._courses.indexOf(aCourse);
        if (index === -1) fnIfAbsent();
        else this._courses.splice(index, 1);
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

    set courses(aList) {
        this._courses = aList.slice();
    }
    get courses() {
        return this._courses.slice();
    }
}


for (const name of readBasicCourseNames(filename)) {
    aPerson.addCourse(new Course(name, false));
}

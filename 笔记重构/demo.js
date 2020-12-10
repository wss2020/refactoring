class Test{
    constructor(data) {
        this._year = data.year;
        this._month = data.month;
        this._day = data.day;
    }
    get year(){
        return this._year;
    }
    set year(value){
        this._year = value;
    }
}

let data = { year:2020, month:12, day:25 };
let result = new Test(data);
console.log( data.year );

result.year = 1995;
console.log( result.year );

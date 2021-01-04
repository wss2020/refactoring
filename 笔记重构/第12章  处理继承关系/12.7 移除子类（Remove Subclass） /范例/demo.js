let data1 = [
    { name:"name1", age:18, sex:"male" },
    { name:"name2", age:19, sex:"female" },
    { name:"name3", age:20, sex:"noKnow" },
]

function check(data){
    return {
        UserName:data.name,
        UserAge:data.age,
        UserSex:data.sex,
    }
}


function test(data){
    let result = [];
    data.forEach(item=>{
         result.push( check(item) )
    })
    return result;
}
function test1(data){
    return data.map(item => check(item))
}

console.log( test(data1)  );
console.log( test1(data1)  );


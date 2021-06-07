function renderPerson(outStream, person) {
    const result = [];
    result.push(`<p>${person.name}</p>`);
    result.push(renderPhoto(person.photo));
    result.push(`<p>title: ${person.photo.title}</p>`);
    result.push(emitPhotoData(person.photo));
    return result.join("\n");
}
/**
 这个例子中的emitPhotoData函数有两个调用点，每个调用点的前面都有一行类似的重复代码，用于打印与标题（title）相关的信息。我希望能消除重复，把打印
 标题的那行代码搬移到emitPhotoData函数里去。如果emitPhotoData只有一个调用点，那我大可直接把代码复制并粘贴过去就完事，但若调用点不止一个，那我就更
 倾向于用更安全的手法小步前进。
 我先选择其中一个调用点，对其应用提炼函数（106）。除了我想搬移的语句，我还把emitPhotoData函数也一起提炼到新函数中。
 */
function photoDiv(p) {
    return [
        "<div>",
        zznew(p),
        "</div>",
    ].join("\n");
}
function zznew(p) {
    return [ `<p>title: ${p.title}</p>`, emitPhotoData(p) ].join("\n");
}
function emitPhotoData(aPhoto) {
    const result = [];
    result.push(`<p>location: ${aPhoto.location}</p>`);
    result.push(`<p>date: ${aPhoto.date.toDateString()}</p>`);
    return result.join("\n");
}


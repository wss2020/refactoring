/**
 * 完成提炼后，我会逐一查看emitPhotoData的其他调用点，找到该函数与其前面的重复语句，一并换成对新函数的调用。
 * */
function renderPerson(outStream, person) {
    const result = [];
    result.push(`<p>${person.name}</p>`);
    result.push(renderPhoto(person.photo));
    result.push(zznew(person.photo));
    returnresult.join("\n");
}
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




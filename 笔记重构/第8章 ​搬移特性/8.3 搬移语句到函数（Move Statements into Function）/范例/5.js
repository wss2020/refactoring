//最后，再对新提炼的函数应用函数改名（124），就大功告成了。
function renderPerson(outStream, person) {
    const result = [];
    result.push(`<p>${person.name}</p>`);
    result.push(renderPhoto(person.photo));
    result.push(emitPhotoData(person.photo));
    return result.join("\n");
}
function photoDiv(aPhoto) {
    return [
        "<div>",
        emitPhotoData(aPhoto),
        "</div>",
    ].join("\n");

}
function emitPhotoData(aPhoto) {
    return [
        `<p>title: ${aPhoto.title}</p>`,
        `<p>location: ${aPhoto.location}</p>`,
        `<p>date: ${aPhoto.date.toDateString()}</p>`,
    ].join("\n");
}

//同时我会记得调整函数参数的命名，使之与我的编程风格保持一致。

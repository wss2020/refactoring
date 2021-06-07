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
/**
 * /替换完emitPhotoData函数的所有调用点后，我紧接着应用内联函数（115）将emitPhotoData函数内联到新函数中。
 */
function zznew(p) {
    return [
        `<p>title: ${p.title}</p>`,
        `<p>location: ${p.location}</p>`,
        `<p>date: ${p.date.toDateString()}</p>`,
    ].join("\n");
}
function emitPhotoData(aPhoto) {
    const result = [];
    result.push(`<p>location: ${aPhoto.location}</p>`);
    result.push(`<p>date: ${aPhoto.date.toDateString()}</p>`);
    return result.join("\n");
}




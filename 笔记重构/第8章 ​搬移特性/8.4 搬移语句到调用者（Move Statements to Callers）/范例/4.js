/**
 * 然后再次运行测试，确保这次函数内联能正常工作。测试通过后，再前往下一个调用点。
 * */
function renderPerson(outStream, person) {
    outStream.write(`<p>${person.name}</p>\n`);
    renderPhoto(outStream, person.photo);
    zztmp(outStream, person.photo);
    outStream.write(`<p>location: ${person.photo.location}</p>\n`);
}
function listRecentPhotos(outStream, photos) {
    photos
        .filter(p => p.date > recentDateCutoff())
        .forEach(p => {
            outStream.write("<div>\n");
            zztmp(outStream, p);
            outStream.write(`<p>location: ${p.location}</p>\n`);
            outStream.write("</div>\n");
        });
}
function emitPhotoData(outStream, photo) {
    zztmp(outStream, photo);
    outStream.write(`<p>location: ${photo.location}</p>\n`);
}
function zztmp(outStream, photo) {
    outStream.write(`<p>title: ${photo.title}</p>\n`);
    outStream.write(`<p>date: ${photo.date.toDateString()}</p>\n`);
}



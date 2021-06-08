/**
 * 至此，我就可以移除外面的emitPhotoData函数，完成内联函数（115）手法。
 */
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

// function emitPhotoData(outStream, photo) {
//     zztmp(outStream, photo);
//     outStream.write(`<p>location: ${photo.location}</p>\n`);
// }
function zztmp(outStream, photo) {
    outStream.write(`<p>title: ${photo.title}</p>\n`);
    outStream.write(`<p>date: ${photo.date.toDateString()}</p>\n`);
}

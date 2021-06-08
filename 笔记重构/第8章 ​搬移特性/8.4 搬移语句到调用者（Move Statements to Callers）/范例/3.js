/**
 新提炼出来的函数一般只会短暂存在，因此我在命名上不需要太认真，不过，取个容易搜索的名字会很有帮助。提炼完成后运行一下测试，确保提炼出来的新函数能正
 常工作。
 接下来，我要对emitPhotoData的调用点逐一应用内联函数（115）。先从renderPerson函数开始。
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
            emitPhotoData(outStream, p);
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





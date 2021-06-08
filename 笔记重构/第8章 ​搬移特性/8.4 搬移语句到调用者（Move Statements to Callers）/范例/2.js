/**
 我需要修改软件，支持listRecentPhotos函数以不同方式渲染相片的location信息，而renderPerson的行为则保持不变。为了使这次修改更容易进行，我要
 应用本手法，将emitPhotoData函数最后的那行代码搬移到其调用端。

 一般来说，像这样简单的场景，我都会直接将emitPhotoData的最后一行剪切并粘贴到两个调用它的函数后面。但为了演示这项重构手法如何在更复杂的场景下运作，
 这里我还是遵从更详细也更安全的步骤。

 重构的第一步是先用提炼函数（106），将那些最终希望留在emitPhotoData函数里的语句先提炼出去。
 */
function renderPerson(outStream, person) {
    outStream.write(`<p>${person.name}</p>\n`);
    renderPhoto(outStream, person.photo);
    emitPhotoData(outStream, person.photo);
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









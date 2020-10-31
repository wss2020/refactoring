//下面这个例子比较简单：emitPhotoData是一个函数，在两处地方被调用。
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
    outStream.write(`<p>title: ${photo.title}</p>\n`);
    outStream.write(`<p>date: ${photo.date.toDateString()}</p>\n`);
    outStream.write(`<p>location: ${photo.location}</p>\n`);
}

/*
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

/*
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


//然后再次运行测试，确保这次函数内联能正常工作。测试通过后，再前往下一个调用点。
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



//至此，我就可以移除外面的emitPhotoData函数，完成内联函数（115）手法。
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



//最后，我将zztmp改名为原函数的名字emitPhotoData，完成本次重构。
function renderPerson(outStream, person) {
    outStream.write(`<p>${person.name}</p>\n`);
    renderPhoto(outStream, person.photo);
    emitPhotoData(outStream, person.photo);
    outStream.write(`<p>location: ${person.photo.location}</p>\n`);
}
function listRecentPhotos(outStream, photos) {
    photos
        .filter(p => p.date > recentDateCutoff())
        .forEach(p => {
            outStream.write("<div>\n");
            emitPhotoData(outStream, p);
            outStream.write(`<p>location: ${p.location}</p>\n`);
            outStream.write("</div>\n");
        });
}
function emitPhotoData(outStream, photo) {
    outStream.write(`<p>title: ${photo.title}</p>\n`);
    outStream.write(`<p>date: ${photo.date.toDateString()}</p>\n`);
}


















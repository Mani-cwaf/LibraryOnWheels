let frame

async function sendBooks(search) {
    const booklist = await window.code.requestBooks();
    let response = [];
    booklist.forEach(element => {
        if (element.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
            response.push(element.substr(0, element.length - 4));
        }
    });
    return response;
}

async function readBook(bookname) {
    await window.code.readPDF(bookname);
}

function setUpFrame() { 
    frame = window.frames['page'].contentWindow;
}
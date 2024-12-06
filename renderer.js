let frame

async function getBookList() {
    return await window.code.getList();
}

async function sendBooks(search) {
    const booklist = await window.code.requestBooks();
    let response = [];
    booklist.forEach(book => {
        if ((book.split(/\s+/)[0] == search[0] || search[0] == 'all') && (book.split(/\s+/)[1] == search[1] || search[1] == 'all') && book.split(/\s+/).slice(2, book.split(/\s+/).length).join(' ').toLowerCase().indexOf(search[2].toLowerCase()) >= 0) {
            response.push(book.substr(0, book.length - 4));
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
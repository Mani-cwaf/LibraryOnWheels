const folders = document.querySelector('.books')
const search = document.querySelector('.input')

function init() { window.parent.setUpFrame(); return true; }

const searchBooks = async () => {
    let books = await window.parent.sendBooks(search.value);

    folders.innerHTML = '';
    books.forEach(book => {
        let el = document.createElement("div");
        el.innerHTML = book;
        el.className = 'book';
        el.onclick = () => {
            window.parent.readBook(book)
        }
        folders.appendChild(el);
    });
}

init()
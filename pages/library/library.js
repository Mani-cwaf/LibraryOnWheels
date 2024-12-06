const folders = document.querySelector('.books')
const search = document.querySelector('.input')
const gradeInput = document.querySelector('.grade')
const subjectInput = document.querySelector('.subject')

const init = () => { window.parent.setUpFrame(); return true; }

const updateSubjects = (list) => {
    subjectInput.innerHTML = ''
    optionElAll = document.createElement('option');
    optionElAll.innerText = 'All';
    optionElAll.value = 'all';
    subjectInput.appendChild(optionElAll);
    if (gradeInput.value == 'all') {
        options = []
        list[1].forEach((sub) => {
            sub.forEach((subject) => {
                if (!options.includes(subject.subjectName)) {
                    options.push(subject.subjectName);
                }
            });
        });
        options.forEach((option) => {
            let optionEl = document.createElement('option');
            optionEl.innerText = option;
            optionEl.value = option;
            subjectInput.appendChild(optionEl);
        })
    } else {
        options = []
        list[1][gradeInput.value].forEach((subject) => {
            if (!options.includes(subject.subjectName)) {
                options.push(subject.subjectName);
            }
        });
        options.forEach((option) => {
            let optionEl = document.createElement('option');
            optionEl.innerText = option;
            optionEl.value = option;
            subjectInput.appendChild(optionEl);
        })
    }
}

let gradeOptions;
window.parent.getBookList().then((list) => {
    index = 0;
    gradeOptions = list[0];

    let optionElAll = document.createElement('option');
    optionElAll.innerText = 'All';
    optionElAll.value = 'all';
    gradeInput.appendChild(optionElAll);
    list[0].forEach(grade => {
        let optionEl = document.createElement('option');
        optionEl.innerText = grade;
        optionEl.value = index;
        gradeInput.appendChild(optionEl);
        index += 1;
    });

    updateSubjects(list);
});

gradeInput.addEventListener('change', () => {
    window.parent.getBookList().then((list) => {
        updateSubjects(list);
    });
});

const searchBooks = async () => {
    let books = await window.parent.sendBooks([gradeInput.value == 'all' ? 'all' : gradeOptions[gradeInput.value], subjectInput.value, search.value]);

    folders.innerHTML = '';

    books.forEach(book => {
        info = book.split(/\s+/);
        let bookEl = document.createElement("div");
        bookEl.innerHTML = info.slice(2, info.length).join(' ');
        bookEl.className = 'book';

        let infoEl = document.createElement("div");
        let gradeEl = document.createElement("p");
        gradeEl.innerHTML = `Class ${info[0]}th`;
        infoEl.appendChild(gradeEl);
        let subjectEl = document.createElement("p");
        subjectEl.innerHTML = info[1];
        infoEl.appendChild(subjectEl);
        
        bookEl.appendChild(infoEl);

        bookEl.onclick = () => {
            window.parent.readBook(book)
        }
        folders.appendChild(bookEl);
    });
}

init()
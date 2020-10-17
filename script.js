// global variables
var form;
var title;
var author;
var pages;
var read;
var book;
var booksToAdd;
var retrievedbooks;
var currentBook;

// array to store all books
var myLibrary = [];

// book object constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// makes add book form pop up
function addBook() {
    document.getElementById("addFormContainer").style.visibility = "visible";
    document.getElementById("overlay").style.visibility = "visible";
}

// gets form inputs and resets form
function userInputs () {
    form = document.getElementById("addBookForm");
    title = document.getElementById("bookTitle").value;
    author = document.getElementById("bookAuthor").value;
    pages = document.getElementById("bookPages").value;
    read = document.getElementById("bookRead");
    if (read.checked == true) {
        read = "Yes";
    }else {
        read = "No";
    }
    form.reset();
    document.getElementById("addFormContainer").style.visibility = "hidden";
    document.getElementById("overlay").style.visibility = "hidden";
    addBookToLibrary();
}

// appends books to the library array
function addBookToLibrary() {
    book = new Book(title, author, pages, read);
    myLibrary.push(book);
    console.log(myLibrary);
    // store array in localstorage
    localStorage.setItem("books", JSON.stringify(myLibrary));
    // initiates renderer
    renderer()
}

// displays individual book cards
function renderer() {
    var bookshelf = document.getElementById("bookContainer");
    var bookCard = document.createElement("div");
    bookCard.setAttribute("class", "bookCard")
    bookshelf.appendChild(bookCard);
    // creates card title
    var cardTitle = document.createElement("div");
    cardTitle.setAttribute("class", "cardTitle");
    cardTitle.textContent = book.title;
    bookCard.appendChild(cardTitle);
    // creates card author name
    var cardAuthor = document.createElement("div");
    cardAuthor.setAttribute("class", "cardAuthor");
    cardAuthor.textContent = book.author;
    bookCard.appendChild(cardAuthor);
    // creates card pages number
    var cardPages = document.createElement("div");
    cardPages.setAttribute("class", "cardPages");
    cardPages.textContent = book.pages + " pages";
    bookCard.appendChild(cardPages);
    // creates card read status
    var cardRead = document.createElement("div");
    cardRead.setAttribute("class", "cardRead");
    cardRead.textContent = "Read: " + book.read;
    if (book.read === "Yes") {
        cardRead.style.color = "lightgreen";
    }else {
        cardRead.style.color = "palevioletred";
    }
    cardRead.setAttribute("data-read", book.title);
    cardRead.setAttribute("onclick", "changeRead(this.dataset.read)");
    bookCard.appendChild(cardRead);
    // adds remove button and unique index to each card
    var cardRemove = document.createElement("button");
    cardRemove.setAttribute("class", "cardRemove");
    cardRemove.setAttribute("data-index", book.title);
    cardRemove.setAttribute("onclick", "removeCard(this.dataset.index)");
    bookCard.appendChild(cardRemove);
    var removeIcon = document.createElement("i");
    removeIcon.setAttribute("class", "fa fa-trash");
    cardRemove.appendChild(removeIcon);
}

// removes book from array and from display
function removeCard(card) { 
    let index = document.querySelector(`[data-index='${card}']`);
    let parentElement = index.parentNode;
    parentElement.remove();
    let arrayIndex = myLibrary.findIndex(book => book.title === card);
    myLibrary.splice(arrayIndex, 1);
    console.log(myLibrary);
    localStorage.clear();
    localStorage.setItem("books", JSON.stringify(myLibrary));
}

// changes read status on card/book and in array
function changeRead(num) {
    let index = document.querySelector(`[data-read='${num}']`);
    let parentElement = index.parentNode;
    let cardStatus = parentElement.querySelector(".cardRead");
    if (cardStatus.textContent == "Read: No")  {
        cardStatus.textContent = "Read: Yes";
        cardStatus.style.color = "lightgreen";
    }else {
        cardStatus.textContent = "Read: No";
        cardStatus.style.color = "palevioletred";
    }
    let arrIndex = myLibrary.findIndex(book => book.title === num);
    if (myLibrary[arrIndex].read == "No") {
        myLibrary[arrIndex].read = "Yes";
        localStorage.clear();
        localStorage.setItem("books", JSON.stringify(myLibrary));
    }else {
        myLibrary[arrIndex].read = "No";
        localStorage.clear();
        localStorage.setItem("books", JSON.stringify(myLibrary));
    }
}

// starts at page load and checks if there are books in localstorage
function firstStart() {
    retrievedBooks = localStorage.getItem("books");
    console.log(retrievedBooks);
    myLibrary = JSON.parse(retrievedBooks);
    if (typeof retrievedBooks === "string") {
        for (var i = 0; i < myLibrary.length; i++) {
            book = myLibrary[i];
            console.log(myLibrary);
            renderer();
        }
    }else {
        myLibrary = [];
    }
}

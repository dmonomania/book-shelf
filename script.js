let myLibrary = [];

function Book(name, author, length, read) {
	this.name = name;
	this.author = author;
	this.length = length;
	this.read = read;
}

Book.prototype = {
	info() {
		return `${this.name} by ${this.author}, ${this.length} pages, ${this.readText()}.`;
	},
	readText() {
		if (this.read === true) {
			return 'I have read this';
		}
		else {
			return 'I have not read this yet';
		}
	}
};

myLibrary.push(new Book('Harry Potter', 'J.K. Rowling', '354', true));
myLibrary.push(new Book('The Lord of the Rings', 'J.R.R. Tolkien', '1074', true));
myLibrary.push(new Book('The Way of Kings', 'Brandon Sanderson', '1524', true));

function addBookToLibrary() {
	const bookName = document.querySelector('#book-name').value;
	const author = document.querySelector('#author').value;
	const bookLength = document.querySelector('#book-length').value;
	const hasRead = document.querySelector('#has-read').checked;
	myLibrary.push(new Book(bookName, author, bookLength, hasRead));
}

myLibrary.forEach(function(e){
    const body = document.querySelector('#grid');
    const container = document.createElement('div')
    const prName = document.createElement('span')
    const prAuthor = document.createElement('span')
    const prLength = document.createElement('span')
    const prRead = document.createElement('span')

    prName.innerText = e.name;
    prAuthor.innerText = e.author;
    prLength.innerText = e.length;
    prRead.innerText = e.readText();

    container.append(prName,prAuthor,prLength,prRead);
    body.appendChild(container);

})

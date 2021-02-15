// form values
const bookName = document.querySelector('#book-name');
const author = document.querySelector('#author');
const bookLength = document.querySelector('#book-length');
const hasRead = document.querySelector('#has-read');
// page buttons
const btnSubmit = document.querySelector('#add-to-library');
//Library 'bookshelf'
const bookshelf = document.querySelector('#grid');
// create blank library array
let myLibrary = [];
let myTempLibrary = [];
// Book object constructor
function Book(name, author, length, read) {
	this.name = name;
	this.author = author;
	this.length = length;
	this.read = read;
}
// prototype functions to pass to all Book objects
Book.prototype = {
	info() {
		return `${this.name} by ${this.author}, ${this.length} pages, ${this.readText()}.`;
	},
	readText() {
		switch (this.read) {
			case true:
				return 'I have read this';
			default:
				return 'I have not read this yet';
		}
	},
	changeReadStatus() {
		this.read ? (this.read = false) : (this.read = true);
	}
};

// test for local storage availability
function storageAvailable(type) {
	var storage;
	try {
		storage = window[type];
		var x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
		return (
			e instanceof DOMException &&
			// everything except Firefox
			(e.code === 22 ||
				// Firefox
				e.code === 1014 ||
				// test name field too, because code might not be present
				// everything except Firefox
				e.name === 'QuotaExceededError' ||
				// Firefox
				e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
			// acknowledge QuotaExceededError only if there's something already stored
			(storage && storage.length !== 0)
		);
	}
}
// load from local storage, or create new local storage array 
if (storageAvailable('localStorage')) {
	// Yippee! We can use localStorage awesomeness
	if (!localStorage.getItem('myTempLibrary')) {
		localStorage.setItem('myTempLibrary', JSON.stringify(myLibrary));
	}
	else {
		myTempLibrary = JSON.parse(localStorage.getItem('myTempLibrary') || '[]');
		myTempLibrary.forEach((e) => {
			myLibrary.push(new Book(e.name, e.author, e.length, e.read));
			console.log(e.name);
		});
	}
}
else {
	// Too bad, no localStorage for us
	console.log('no local storage');
}

// ojbect constructor with book attributes

// temporary books pushed to the library
//myLibrary.push(new Book('Harry Potter', 'J.K. Rowling', '354', true));
//myLibrary.push(new Book('The Lord of the Rings', 'J.R.R. Tolkien', '1074', true));
//myLibrary.push(new Book('The Way of Kings', 'Brandon Sanderson', '1524', true));

// adds a book to library from form data and displays it immediately.
function addBookToLibrary() {
	myLibrary.push(new Book(bookName.value, author.value, bookLength.value, hasRead.checked));
	updateLocalStorage()
}

function clearForm() {
	bookName.value = '';
	author.value = '';
	bookLength.value = '';
	hasRead.checked = false;
}

function displayCurrentLibrary() {
	while (bookshelf.hasChildNodes()) {
		bookshelf.removeChild(bookshelf.lastChild);
	}
	myLibrary.forEach(function(e) {
		const button = document.createElement('button');
		button.innerText = 'Delete';
		button.classList.add('button-secondary');
		const readButton = document.createElement('button');
		readButton.innerText = 'Change Read Status';
		readButton.classList.add('button-primary');
		const container = document.createElement('div');
		container.setAttribute('value', myLibrary.indexOf(e));

		for (let key of Object.keys(e)) {
			const div = document.createElement('div');
			switch (e[key]) {
				case true:
				case false:
					div.innerText = e.readText();
					break;
				default:
					div.innerText = e[key];
			}

			container.appendChild(div);
		}
		container.appendChild(button);
		container.appendChild(readButton);
		bookshelf.appendChild(container);
		button.addEventListener('click', (e) => {
			deleteBook(e);
		});
		readButton.addEventListener('click', (e) => {
			changeReadStatus(e);
		});
	});
}

function deleteBook(e) {
	// array reference number to delte book
	const bookToDelete = e.path[1].attributes[0].nodeValue;
	myLibrary.splice(bookToDelete, 1);
	updateLocalStorage()
	displayCurrentLibrary();
}

function changeReadStatus(e) {
	myLibrary[e.path[1].attributes[0].nodeValue].changeReadStatus();
	updateLocalStorage()
	displayCurrentLibrary();
}

const submitBook = function() {
	switch ('') {
		case bookName.value:
		case author.value:
		case bookLength.value:
			alert('Please fill out entire form');
			break;
		default:
			addBookToLibrary();
			displayCurrentLibrary();
			clearForm();
	}
};
// function displayNewBook() {
// 	myLibrary.forEach(function(e) {
// 		if (bookshelf.lastChild.attributes[0].nodeValue >= myLibrary.indexOf(e)) {
// 			return;
// 		}
// 		else {
// 			const container = document.createElement('div');
// 			container.setAttribute('value', myLibrary.indexOf(e));
// 			for (let key of Object.keys(e)) {
// 				const div = document.createElement('div');
// 				switch (e[key]) {
// 					case true:
// 					case false:
// 						div.innerText = e.readText();
// 						break;
// 					default:
// 						div.innerText = e[key];
// 				}

// 				container.appendChild(div);
// 			}
// 			bookshelf.appendChild(container);
// 		}
// 	});
// }
function updateLocalStorage(){
	localStorage.setItem('myTempLibrary', JSON.stringify(myLibrary));
}
displayCurrentLibrary();
btnSubmit.addEventListener('click', submitBook);

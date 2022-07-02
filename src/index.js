import { initializeApp } from "firebase/app"
import {
	getFirestore,
	collection,
	doc,
	addDoc,
	getDocs,
	updateDoc,
	deleteDoc,
} from "firebase/firestore"
import Book from "./Book.js"
import displayBooks from "./BooksDisplay.js"
import NewBook from "./NewBook.js"

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyALwf-jMnKJlDPf7vGxMneDAuL24KAMPrU",
	authDomain: "odin-library-e8203.firebaseapp.com",
	projectId: "odin-library-e8203",
	storageBucket: "odin-library-e8203.appspot.com",
	messagingSenderId: "11746166637",
	appId: "1:11746166637:web:8620d87c3ae13d64cefc64",
}
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const booksCollection = collection(db, "books")

const library = {}
const handleBtnAction = async (id, btnAction) => {
	switch (btnAction) {
		case "delete":
			delete library[id]
			const bookToDeleteRef = doc(db, "books", id)
			await deleteDoc(bookToDeleteRef)

			break
		case "changeStatus":
			console.log("changed!")
			const book = library[id]
			book.read = !book.read

			const bookToUpdateRef = doc(db, "books", id)

			await updateDoc(bookToUpdateRef, {
				read: book.read,
			})
			break
	}

	displayBooks(library, handleBtnAction)
}
const addNewBook = async (formdata) => {
	const book = {}
	for (const [key, value] of formdata) {
		book[key] = value
	}
	if (book.hasOwnProperty("read")) {
		book.read = true
	} else {
		book.read = false
	}

	const bookRef = await addDoc(booksCollection, book)
	console.log("Book added to library with ID: ", bookRef.id)

	library[bookRef.id] = book

	displayBooks(library, handleBtnAction)
}

const newBookElement = NewBook(addNewBook)
// Modal for new book creation
document.body.appendChild(newBookElement.modal)

const addBookButton = document.querySelector("#new-book")
addBookButton.onclick = newBookElement.showModal

const startApp = async () => {
	const docs = await getDocs(booksCollection)

	docs.forEach((doc) => {
		library[doc.id] = doc.data()
	})

	displayBooks(library, handleBtnAction)
}

startApp()

function Book(title, author, pages, read) {
	this.title = title
	this.author = author
	this.pages = pages
	this.read = read
	this.info = () =>
		`${title} by ${author}, ${pages} pages, ${read ? "read" : "not read yet"}`
}

function addBookToLibrary() {}

function showBooks(index) {
	function createButton(buttonClass, text, index) {
		let button = document.createElement("button")
		button.setAttribute("class", buttonClass)
		button.setAttribute("id", `book-${index}`)
		button.textContent = text
		return button
	}
	const tableBody = document.querySelector("tbody")
	tableBody.innerHTML = ""

	for (let i = 0; i < myLibrary.length; i++) {
		const book = myLibrary[i]
		let row = document.createElement("tr")
		console.log(row)
		for (const val of Object.values(book)) {
			if (typeof val !== "function") {
				let cell = document.createElement("td")
				cell.textContent = val
				row.appendChild(cell)
			}
		}
		let deleteButton = createButton("delete-button", "Delete", i)
		deleteButton.addEventListener("click", () => {
			myLibrary.splice(i, 1)
			showBooks()
		})
		row.appendChild(deleteButton)
		let changeStatusButton = createButton("status-button", "Change Status", i)
		changeStatusButton.addEventListener("click", () => {
			myLibrary[i].read = !myLibrary[i].read
			showBooks()
		})
		row.appendChild(changeStatusButton)
		tableBody.appendChild(row)
	}
}

const a = new Book("The Hobbit", "J.R.R. Tolkien", 295, true)
const b = new Book("Thinking, Fast and Slow", "Daniel Kahneman", 315, false)
const c = new Book("Atomic Habits", "James Clear", 238, true)
const d = new Book("Hyperion", "Dan Simmons", 487, true)
let myLibrary = [a, b, c, d]
showBooks()

const modal = document.querySelector(".modal")
const addBookButton = document.querySelector("#new-book")
addBookButton.onclick = () => {
	modal.style.display = "block"
}
const submitButton = document.querySelector("#submit")
submitButton.onclick = () => {
	modal.style.display = "none"
	const title = document.querySelector("#title").value
	const author = document.querySelector("#author").value
	const pages = document.querySelector("#pages").value
	const read = document.querySelector("#read").checked
	myLibrary.push(new Book(title, author, pages, read))
	showBooks()
}

const deleteButtons = document.querySelectorAll(".delete-button")
deleteButtons.forEach((button) => {})

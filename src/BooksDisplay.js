// Handles the display of books array
const LIBRARY_HEADERS = ["title", "author", "pages", "read"]

// Constructs button element with relevant text, class and ID
function actionBtnFactory(btnAction, text, id, handleBtnAction) {
	let button = document.createElement("button")
	button.setAttribute("class", btnAction)
	button.setAttribute("id", `book-${btnAction}-${id}`)
	button.textContent = text

	button.onclick = () => handleBtnAction(id, btnAction)
	return button
}

function createBookRow(book, id, handleBtnAction) {
	const row = document.createElement("tr")
	for (const prop of LIBRARY_HEADERS) {
		const cell = document.createElement("td")
		cell.textContent = book[prop]
		row.appendChild(cell)
	}

	const deleteButton = actionBtnFactory(
		"delete",
		"Delete",
		id,
		handleBtnAction
	)
	const changeStatusButton = actionBtnFactory(
		"changeStatus",
		"Change Status",
		id,
		handleBtnAction
	)

	row.appendChild(deleteButton)
	row.appendChild(changeStatusButton)

	return row
}

export default function displayBooks(library, handleBtnAction) {
	const books = Object.entries(library)
	const booksTable = document.querySelector("tbody")

	// Clear existing books
	booksTable.innerHTML = ""

	books.forEach(([id, book]) => {
		console.log("Is read: " + book.read)
		const bookRow = createBookRow(book, id, handleBtnAction)
		booksTable.appendChild(bookRow)
	})
}

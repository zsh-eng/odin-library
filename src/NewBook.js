const modalFactory = () => {
	// Create modal div
	const modal = document.createElement("modal")
	modal.classList.add("modal")

	// Create content box
	const content = document.createElement("modal-content")
	content.classList.add("modal-content")

	// Add to modal div
	modal.appendChild(content)
	modal.style.display = "none"

	const showModal = () => {
		modal.style.display = "block"
	}

	const hideModal = () => {
		modal.style.display = "none"
	}

	return {
		modal,
		content,
		showModal,
		hideModal,
	}
}

const bookForm = () => {
	const inputFactory = (type, text, id, required) => {
		const labelElement = document.createElement("label")
		labelElement.for = id
		labelElement.textContent = text

		const inputElement = document.createElement("input")
		inputElement.id = id
		inputElement.name = id
		inputElement.type = type

		const wrapper = document.createElement("span")
		wrapper.append(labelElement, inputElement)
		return wrapper
	}

	const form = document.createElement("form")
	const title = inputFactory("text", "Title", "title")
	const author = inputFactory("text", "Author", "author")
	const pages = inputFactory("number", "Number of Pages", "pages")
	const read = inputFactory("checkbox", "Read", "read")

	const submitBtn = document.createElement("button")
	submitBtn.type = "submit"
	submitBtn.textContent = "Submit"

	form.append(title, author, pages, read, submitBtn)
	return {
		form,
		submitBtn,
	}
}

const NewBook = (handleFormSubmit) => {
	const { modal, content, showModal, hideModal } = modalFactory()

	const { form, submitBtn } = bookForm()
	submitBtn.onclick = (e) => {
		e.preventDefault()
		hideModal()
		handleFormSubmit(new FormData(form))
	}

	content.appendChild(form)

	return {
		modal,
		showModal,
	}
}

export default NewBook

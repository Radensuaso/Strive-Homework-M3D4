window.onload = () => {
  getBooks("books")

  const searchBtn = document.querySelector(".search-btn")
  searchBtn.addEventListener("click", searchBook)
}

const cart = []

//function to add books to the cart

const addBookToCart = function (event) {
  const addButton = event.currentTarget
  addButton.classList.toggle("d-none")

  const removeButton = event.currentTarget
    .closest(".card-body")
    .querySelector(".remove-from-cart")
  removeButton.classList.toggle("d-none")

  const card = event.currentTarget.closest(".card")
  card.classList.add("bg-success")
  card.classList.remove("bg-light")

  const bookTitle = card.querySelector("h5").innerText
  cart.push(bookTitle)

  const cartQuantity = document.querySelector("#cart span")
  cartQuantity.innerText = `${cart.length}`
}

//function to remove books from the cart
const removeBookFromCart = function (event) {
  const removeButton = event.currentTarget
  removeButton.classList.toggle("d-none")

  const addButton = event.currentTarget
    .closest(".card-body")
    .querySelector(".add-to-cart")
  addButton.classList.toggle("d-none")

  const card = event.currentTarget.closest(".card")
  card.classList.add("bg-light")
  card.classList.remove("bg-success")

  const bookTitle = card.querySelector("h5").innerText

  const bookIndex = cart.findIndex((book) => book === bookTitle)
  cart.splice(bookIndex, 1)

  const cartQuantity = document.querySelector("#cart span")
  cartQuantity.innerText = `${cart.length}`
}

//function to ignore book
const ignoreBook = function (event) {
  const card = event.currentTarget.closest(".col-12")
  card.remove()
}

const createAndAppendCols = function (book) {
  const col = document.createElement("div")
  col.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "mb-4")
  col.innerHTML = `<div class="card">
          <img src="${book.img}" class="card-img-top img-fluid" alt="...">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text"><i>${book.category}</i></p>
            <p class="card-text"><b>€${book.price}</b></p>
            <button class="add-to-cart btn btn-dark">Add to Cart</button>
            <button class="remove-from-cart btn btn-danger d-none">Remove from cart</button> </br>
            <button class="ignore-button btn btn-outline-secondary">Ignore</button>
          </div>
        </div>`

  const row = document.querySelector("#books-container div.row")
  row.appendChild(col)

  const addButton = col.querySelector(".add-to-cart")
  addButton.addEventListener("click", addBookToCart)

  const removeButton = col.querySelector(".remove-from-cart")
  removeButton.addEventListener("click", removeBookFromCart)

  const ignoreButton = col.querySelector(".ignore-button")
  ignoreButton.addEventListener("click", ignoreBook)
}

const getBooks = function (query) {
  fetch(`https://striveschool-api.herokuapp.com/${query}`)
    .then((response) => response.json())
    .then((booksList) => {
      console.log(booksList)
      booksList.forEach((book) => createAndAppendCols(book))
    })
    .catch(() => alert("Error"))
}

// search for book function
const searchBook = function () {
  // select user's input
  const userInput = document.querySelector(".search-text").value.toLowerCase()
  console.log(userInput)

  const colsList = document.querySelectorAll("#books-container .row .col-12")
  colsList.forEach((col) => col.remove())

  const getSearchedBooks = function (query) {
    fetch(`https://striveschool-api.herokuapp.com/${query}`)
      .then((response) => response.json())
      .then((booksList) => {
        console.log(booksList)
        booksList.forEach((book) => {
          if (book.title.toLowerCase().includes(userInput))
            createAndAppendCols(book)
        })
      })
      .catch(() => alert("Error"))
  }

  getSearchedBooks("books")
}

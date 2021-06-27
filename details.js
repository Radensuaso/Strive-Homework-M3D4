window.onload = () => {
  getChosenBook("books")
}

//get the name of the book selected in the index page
const selectedBook = new URLSearchParams(window.location.search).get("Book")

const getChosenBook = function (query) {
  fetch(`https://striveschool-api.herokuapp.com/${query}`)
    .then((response) => response.json())
    .then((booksList) => {
      console.log(booksList)
      /* get h2 chosen book title */
      const h2ChosenBook = document.getElementById("chosen-book")

      /* get row inside chosen-book-container */
      const row = document.querySelector("#chosen-book-container .row")
      booksList.forEach((book) => {
        switch (book.title) {
          case selectedBook:
            h2ChosenBook.innerText = book.title
            const bookImg = document.createElement("img")
            bookImg.src = `${book.img}`
            bookImg.alt = `${book.title}`
            bookImg.classList.add("img-fluid", "col-6")
            row.appendChild(bookImg)
            break
        }
      })
    })
    .catch(() => alert("Error"))
}

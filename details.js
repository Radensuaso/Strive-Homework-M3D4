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
            const bookImgDiv = document.createElement("div")
            bookImgDiv.classList.add("col-12", "col-md-8", "col-lg-6")
            bookImgDiv.innerHTML = `<img class="img-fluid rounded-border" src="${book.img}" alt="${book.title}">`
            row.appendChild(bookImgDiv)

            const infoDiv = document.createElement("div")
            infoDiv.classList.add("col-12")
            infoDiv.innerHTML = `
            <p><b>Category:</b> <i>${book.category}</i></p>
            <p><b>€${book.price}</b></p>`
            row.appendChild(infoDiv)
            break
        }
      })
    })
    .catch(() => alert("Error"))
}

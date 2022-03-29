//elenco di libri
function Elenco(books) {
  //seleziono il container tramite id
  const container = document.querySelector("#elenco_libri");
  //lo svuoto
  container.innerHTML = "";
  //per ogni libro
  books.forEach((book, index) => {
    //creo un div
    const bookDiv = document.createElement("div");
    //lo riempio con le informazioni del mio libro
    //uso join(", ") per mostrare gli elementi dell'array divisi da virgola
    bookDiv.innerHTML = `<div>${book.title}</div><div>${
      book.authors[0].name
    }</div><div>${book.bookshelves.join(", ")}</div>`;

    //creo il bottone
    const removeBtn = document.createElement("button");
    //scrivo il testo del bottone
    removeBtn.innerText = "Elimina";
    //creo l'evento sul click
    removeBtn.addEventListener("click", (evt) => {
      //richiamo la funzone togli
      Togli(books, index);
      //ricarico l'elenco dei libri
      Elenco(books);
    });
    //aggiungo ad ogni div il bottone
    bookDiv.appendChild(removeBtn);
    //aggiungo il div creato al mio contenitore
    container.appendChild(bookDiv);
  });
}

//aggiungere libri
function Aggiungi(books, book) {
  books.push(book);
}

//togliere libri
function Togli(books, index) {
  books.splice(index, 1);
}

let libri;
async function getBooks() {
  const url = "https://gutendex.com/books";
  try {
    libri = (await (await fetch(url)).json()).results;
    Elenco(libri);
  } catch (error) {
    console.error(error.message);
  }
}

getBooks();

// Elenco(libri);

//creo l'evento sul click del pulsante aggiunge libro
document.querySelector("#add_book").addEventListener("click", (evt) => {
  //chiedo con il prompt l'inserimento dei dati
  const title = prompt("Titolo del libro");
  const autore = prompt("Autore del libro");
  const genere = prompt("Generi del libro (divisi da virgola)");
  //aggiungo i dati nell'array per creare un nuovo oggetto
  Aggiungi(libri, {
    title,
    authors: [{ name: autore }],
    bookshelves: genere.split(","),
  });
  //ricarico l'elenco dei libri
  Elenco(libri);
});

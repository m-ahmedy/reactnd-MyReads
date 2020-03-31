# MyReads Project
This is MyReads Project for Udacity React Nanodegree program.  

To get started:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── package.json
├── public
|  ├── favicon.ico
|  └── index.html
├── README.md
├── SEARCH_TERMS.md
├── src
   ├── apis
   |  └── BooksAPI.js
   ├── App.css
   ├── App.js
   ├── App.test.js
   ├── components
   |  ├── BookList
   |  |  ├── Book
   |  |  |  └── Book.js
   |  |  └── BookList.js
   |  ├── SearchBar
   |  |  └── SearchBar.js
   |  ├── SearchResults
   |  |  └── SearchResults.js
   |  ├── Shelf
   |  |  ├── Shelf.js
   |  |  └── ShelfAdd
   |  |     └── ShelfAdd.js
   |  └── UI
   |     ├── Button
   |     |  └── Button.js
   |     └── OptionSelect
   |        └── OptionSelect.js
   ├── containers
   |  ├── Library
   |  |  └── Library.js
   |  └── Search
   |     └── Search.js
   ├── icons
   |  ├── arrow-back.svg
   |  ├── add.svg
   |  └── arrow-drop-down.svg
   ├── index.css
   └── index.js
```

## How to use
In this application, the main page displays a list of "shelves" (i.e. categories), each of which contains a number of books. The three shelves are:

- Currently Reading
- Want to Read
- Read

### Additional features
- Adding new shelves
- Remove existing shelves

<img src="https://i.imgur.com/RexmXvE.png" style="display: block; margin: 30px auto; height: 400px; width: auto;" alt="MyReads homepage">

Each book has a control that lets you select the shelf for that book. When you select a different shelf, the book moves there. Note that the default value for the control should always be the current shelf the book is in.


<img src="https://i.imgur.com/NX2OFMg.jpg" style="display: block; margin: 30px auto; height: 400px; width: auto;" alt="Book controls">

The main page also has a link to /search, a search page that allows you to find books to add to your library.

The search page has a text input that may be used to find books. As the value of the text input changes, the books that match that query are displayed on the page, along with a control that lets you add the book to your library.

<>
When a book is on a bookshelf, it should have the same state on both the main application page and the search page.

<img src="https://i.imgur.com/SRmVcnu.jpg" style="display: block; margin: 30px auto; height: 400px; width: auto;" alt="MyReads search page">

The search page also has a link to / (the root URL), which leads back to the main page.

When you navigate back to the main page from the search page, you should instantly see all of the selections you made on the search page in your library.

### Video
You can see it in action [here](https://youtu.be/AXyWFYDwrjQ).


var elList = document.querySelector(".js_row");
var elInput = document.querySelector(".js_input");
var elSelect = document.querySelector(".js_select");
var elSort = document.querySelector(".sort_select");
var elLists = document.querySelector(".js-lists");
var elBookmark = document.querySelector(".js-bookmark");

function filmsFunc(array, lists) {
  elList.innerHTML = "";

  array.forEach((item) => {
    var newCol = document.createElement("div");
    newCol.setAttribute("class", "col-sm-12 col-md-6 col-lg-4 position-relative");
    let book = document.createElement("i");
    book.setAttribute("class", "fa-regular fa-bookmark js-bookmark");
    // console.log(book);

    newCol.innerHTML = `
          <div class="outer">
              <div class="inner">
                  <div class="card__inner">
                  <img src="${item.poster}"/>
                      <div class="d-flex justify-content-between align-items-center">
                        <h4 class="mt-3">${item.title}</h4>
                        <h4 class="mt-3 bookTitle"></h4>
                        
                      </div>
                      <div class="level">   
                          <p>${item.genres}</p>
                      </div>
                      <p class="text-white overflow-hidden">${item.overview}</p>
                      <button class="moreBtn">More</button>
                  </div>
              </div>
          </div>
          `;

    book.dataset.filmId = item.id;
    // console.log(book);
    newCol.appendChild(book);

    lists.appendChild(newCol);
  });
}
filmsFunc(films, elList);

function bookFunc(array, node) {
  node.innerHTML = "";

  array.forEach((item) => {
    let bookItem = document.createElement("li");
    bookItem.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
    let bookBtn = document.createElement('i')
    bookBtn.setAttribute('class', 'fa-solid fa-trash text-danger')
    bookItem.textContent = item.title;
    bookBtn.dataset.bookmarkId = item.id

    bookItem.appendChild(bookBtn)
    node.appendChild(bookItem);
    window.localStorage.setItem("bookList", JSON.stringify(bookList));
  });

}

let localData = JSON.parse(window.localStorage.getItem("bookList"));
let bookList = localData || [];

elList.addEventListener("click", (evt) => {
  if (evt.target.matches(".js-bookmark")) {
    let filmId = evt.target.dataset.filmId;
    let filmIndex = films.find((item) => item.id == filmId);
    // console.log(filmIndex);
    let obj = {
      id: new Date() ,
      title: filmIndex.title
    }
    bookList.push(obj);
    console.log(bookList);
    bookFunc(bookList, elLists);
  }
});

elLists.addEventListener("click", (evt) => {
  if (evt.target.matches(".fa-trash")) {
    let filmId = evt.target.dataset.bookmarkId;
    let filmIndex = films.findIndex((item) => item.id == filmId);
    bookList.splice(filmIndex, 1)
    bookFunc(bookList, elLists);
    console.log(filmIndex);
  }
});

// INPUT
var newArray = [];
elInput.addEventListener("keyup", (e) => {
  newArray = [];
  films.forEach((item) => {
    if (item.title.toLowerCase().includes(elInput.value.toLowerCase())) {
      newArray.push(item);
    }
  });

  filmsFunc(newArray, elList);
});

// SET
var categoryArr = [];
var set = new Set();
films.forEach((item) => {
  item.genres.forEach((el) => {
    set.add(el);
  });
});

// OPTION
set.forEach((type) => {
  var newOption = document.createElement("option");
  newOption.setAttribute("value", type);
  newOption.textContent = type;

  elSelect.appendChild(newOption);
});

// CATEGORY
var catArray = JSON.parse(window.localStorage.getItem('catArray')) || [];
elSelect.addEventListener("change", function () {
  catArray = [];
  if (elSelect.value != "All") {
    films.forEach((item1) => {
      if (item1.genres.includes(elSelect.value)) {
        catArray.push(item1);
      }
    });
    filmsFunc(catArray, elList);
  } else {
    filmsFunc(films, elList);
  }

  window.localStorage.setItem('catArray', JSON.stringify(catArray))
});

// SORT
var ism = [];
elSort.addEventListener("change", function () {
  ism = [];

  if (elSort.value != "All") {
    if (elSort.value == "a_z") {
      films.forEach((item) => {
        ism.push(item);
        ism.sort(
          (a, b) =>
            a.title.toLowerCase().charCodeAt(0) -
            b.title.toLowerCase().charCodeAt(0)
        );
      });
    } else {
      films.forEach((item) => {
        ism.push(item);
        ism.sort(
          (a, b) =>
            b.title.toLowerCase().charCodeAt(0) -
            a.title.toLowerCase().charCodeAt(0)
        );
      });
    }

    filmsFunc(ism, elList);
  }
  if (elSort.value == "all") {
    filmsFunc(films, elList);
  }
});

bookFunc(bookList, elLists);

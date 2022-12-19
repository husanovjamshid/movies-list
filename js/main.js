var elList = document.querySelector(".js_row");
var elInput = document.querySelector(".js_input");
var elSelect = document.querySelector(".js_select");
var elSort = document.querySelector(".sort_select");

function filmsFunc(array, lists) {
  elList.innerHTML = "";
  array.forEach((item) => {
    var newCol = document.createElement("div");
    newCol.setAttribute("class", "col-sm-12 col-md-6 col-lg-4");

    newCol.innerHTML = `
          <div class="outer">
              <div class="inner">
                  <div class="innerinner"><img src="${item.poster}"/>
                      <h4 class="mt-2">${item.title}</h4>
                      <div class="level">   
                          <p>${item.genres}</p>
                      </div>
                      <p class="text-white overflow-hidden">${item.overview}</p>
                      <button>More</button>
                  </div>
              </div>
          </div>
          `;

    lists.appendChild(newCol);
  });
}
filmsFunc(films, elList);

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
var catArray = [];
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

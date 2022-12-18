var elList = document.querySelector(".row");
var elInput = document.querySelector(".js_input");
var elSelect = document.querySelector(".js_select");

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

var newArray = [];
elInput.addEventListener("keyup", (e) => {
  newArray = [];
  films.forEach((item) => {
    if (item.title.toLocaleLowerCase().includes(elInput.value)) {
      newArray.push(item);
    }
  });

  filmsFunc(newArray, elList);
});

var categoryArr = [];
var set = new Set();
films.forEach((item) => {
  item.genres.forEach((el) => {
    set.add(el);
  });
});

set.forEach((type) => {
  var newOption = document.createElement("option");
  newOption.setAttribute("value", type);
  newOption.textContent = type;

  elSelect.appendChild(newOption);
});

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

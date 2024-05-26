const site_name = document.querySelector(".name");
const url = document.querySelector(".url");
const submit = document.querySelector(".submit");
const form = document.querySelector(".form");
const add = document.querySelector(".add");
const undo = document.querySelector(".undo");

// pop
const model = document.querySelector(".model");
const close_pop = document.querySelector(".close-pop");
const overlay = document.querySelector(".overlay");

var booksList = [];
booksList = JSON.parse(localStorage.getItem("books")) ?? [];
displayData();

var booksListDelete = [];
booksListDelete = JSON.parse(localStorage.getItem("booksDelete")) ?? [];

function createData() {
  var book = {
    name: site_name.value,
    url: url.value,
  };
  booksList.push(book);
  localStorage.setItem("books", JSON.stringify(booksList));
  displayData();
  clearData();
}
function displayData() {
  var carton = " ";
  for (var i = 0; i < booksList.length; i++) {
    const html = `
  <tr class="parent" >
  <th scope="row">${i}</th>
  <td>${booksList[i].name}</td>
  <td><a target="_blank" class="link" href="${booksList[i].url}">
    <button class="bg-success text-white  rounded-2 btn-visited ">
    <i class="fa-solid fa-eye"></i>
    Visited</button>
  </a></td>
  <td><button  onclick="deleteData(${i})" class="bg-danger text-white  rounded-2 btn-delete ">
  <i class="fa-solid fa-trash "></i>
  Delete</button></td>
</tr>
  `;
    carton += html;
  }
  document.querySelector(".form-parent").innerHTML = carton;
}

function clearData() {
  site_name.value = url.value = " ";
}
function deleteData(index) {
  booksListDelete.unshift(booksList[index]);
  localStorage.setItem("booksDelete", JSON.stringify(booksListDelete));

  if (booksListDelete.length != 0) {
    undo.classList.remove("d-none");
    setInterval(function () {
      undo.classList.add("d-none");
    }, 8000);
  }

  booksList.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(booksList));
  displayData();
}

function undoFun(index) {
  booksList.push(booksListDelete[index]);
  localStorage.setItem("books", JSON.stringify(booksList));
  displayData();

  booksListDelete.splice(index, 1);
  localStorage.setItem("booksDelete", JSON.stringify(booksListDelete));
}

function validation(input, reg) {
  var regEx = reg;
  var text = input.value;
  console.log(text);
  if (regEx.test(text)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}

site_name.addEventListener("input", function (e) {
  validation(site_name, /^.{3,}$/);
});
// url.addEventListener("input", function (e) {
//   validation(url, /^(https|http|ftp):\/\/(www.?)?[a-zA-Z0-9]{1,}(\.com|\.edu|).{1,}?$/);
// });

submit.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    validation(site_name, /^.{3,}$/)
    // &&
    // validation(
    //   url,
    //   /^(https|http|ftp):\/\/(-\.)?([^\s\/?\.#]+\.?)+(\/[^\s]*)?$/
    // )
  ) {
    createData();
  } else {
    model.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }
});

const close = function () {
  model.classList.add("hidden");
  overlay.classList.add("hidden");
};

overlay.addEventListener("click", close);
close_pop.addEventListener("click", close);

add.addEventListener("click", function (e) {
  e.preventDefault();
  form.classList.toggle("d-none");
  add.classList.toggle("fa-circle-arrow-up");
  add.classList.toggle("fa-circle-plus");
});

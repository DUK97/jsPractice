// 1.  Получить пользователей (users) от сервера https://jsonplaceholder.typicode.com.
// Получив ответ от сервера вывести имена пользователей на страницу. При клике на имя
// пользователя в произвольном месте должна появиться подробная информация о нем.
// Для визуальной части можно использовать bootstrap или другие фреймворки.

//Elements
const userContainer = document.querySelector(".userContainer");
const createUserListBtn = document.querySelector(".btn.btn-primary");
const userInfoContainer = document.querySelector(".userInfoContainer");

//Events

createUserListBtn.addEventListener("click", (e) => {
  const isUlExist = document.querySelector("ul");
  if (isUlExist) {
    return;
  }
  fetchUsers(renderUsers);
});

userContainer.addEventListener("click", (e) => {
  const id = e.target.dataset.userId;
  if (id) {
    fetchUsers(renderUserInfo, id);
  }
});

//Functions
function fetchUsers(cb, id) {
  const xhr = new XMLHttpRequest();
  if (!id) {
    xhr.open("GET", `https://jsonplaceholder.typicode.com/users`);
  } else {
    xhr.open("GET", `https://jsonplaceholder.typicode.com/users/${id}`);
  }

  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });
  xhr.addEventListener("error", () => {
    console.log("error");
  });
  xhr.send();
}
function cardTemplate(user) {
  const li = document.createElement("li");
  li.textContent = user.name;
  li.dataset.userId = user.id;
  return li;
}

function renderUsers(usersArr) {
  const ul = document.createElement("ul");
  usersArr.forEach((user) => {
    const card = cardTemplate(user);
    ul.appendChild(card);
  });
  userContainer.appendChild(ul);
}

function renderUserInfo(user) {
  const card = document.querySelector(".card");
  if (card) {
    userInfoContainer.innerHTML = "";
  }

  userInfoContainer.insertAdjacentHTML(
    "afterbegin",
    `<div class="card" style="width: 20rem;">
    <div class="card-body">
    <h5 class="card-title">Name: ${user.name}</h5>
    <h6 class="card-subtitle mb-2 text-muted">Phone: ${user.phone}</h6>
    <p class="card-text">E-mail: ${user.email}</p>
    <p class="card-text">Username: ${user.username}</p>
    <p class="card-text">City: ${user.address.city}</p>
    <p class="card-text">Company: ${user.company.name}</p>
  </div>
</div>`
  );
}

//2.  Создать форму добавления пользователя состоящая из полей name, email, username, phone,
// website при сабмите формы сделать POST запрос на сервер после
// ответа от сервера добавлять полученного пользователя на страницу.

//Elements
const createNewUserForm = document.forms[0];

//Events
createNewUserForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createUser();

  createNewUserForm.reset();
});

//Functions
function createUser() {
  const fieldArr = Array.from(createNewUserForm.elements);
  fieldArr.pop();
  let objFromFormInputs = fieldArr.reduce((acc, curr) => {
    acc[curr.id] = curr.value;
    return acc;
  }, {});

  createPostRequest(objFromFormInputs, (response) => {
    const responseArr = [];
    responseArr.push(response);
    renderUsers(responseArr);
  });
}

function createPostRequest(body, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://jsonplaceholder.typicode.com/users");
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.send(JSON.stringify(body));
}

const tasks = [
  {
    _id: "5d2ca9e2e03d40b326596aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    _id: "5d2ca9e29c8a94095c1288e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
  },
  {
    _id: "5d2ca9e2e03d40b3232496aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    _id: "5d2ca9e29c8a94095564788e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt  id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
  },
];

(function (arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  let currentState = "all";

  // Elements UI
  const listContainer = document.querySelector(
    ".tasks-list-section .list-group"
  );
  const form = document.forms["addTask"];
  const inputTitle = form.elements["title"];
  const inputBody = form.elements["body"];
  const cardBody = document.querySelector(".card");
  const btnContainer = document.createElement("div");
  btnContainer.classList.add(
    "container",
    "w-100",
    "d-inline-flex",
    "btn-group"
  );

  const showAllTasksBtn = document.createElement("button");
  showAllTasksBtn.textContent = "show all tasks";
  showAllTasksBtn.classList.add("btn", "btn-info", "w-50");

  const showUncomplitedTasksBtn = document.createElement("button");
  showUncomplitedTasksBtn.textContent = "show unfinished tasks";
  showUncomplitedTasksBtn.classList.add("btn", "btn-info", "w-50", "ml-3");

  btnContainer.appendChild(showAllTasksBtn);
  btnContainer.appendChild(showUncomplitedTasksBtn);
  cardBody.appendChild(btnContainer);

  // Events

  form.addEventListener("submit", onFormSubmitHandler);
  listContainer.addEventListener("click", onDeleteHandler);
  listContainer.addEventListener("click", completeTaskHandler);
  listContainer.addEventListener("click", restoreTaskHandler);
  showAllTasksBtn.addEventListener("click", showAllTasks);
  showUncomplitedTasksBtn.addEventListener("click", showUncompletedTasks);

  //functions
  renderAllTask(objOfTasks);

  function renderAllTask(tasksList) {
    if (!tasksList) {
      showEmptyAllert();
    }

    const fragment = document.createDocumentFragment();
    const values = Object.values(tasksList);
    const sortedValues = values.sort(function (valueA, valueB) {
      return Number(valueA.completed) - Number(valueB.completed);
    });

    sortedValues.forEach((task) => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });

    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
    }
    listContainer.appendChild(fragment);
  }

  function showEmptyAllert() {
    const messageElement = document.createElement("div");
    const message = (messageElement.textContent = "Массив с задачами пуст!");
    const parent = document.querySelector("ul");
    messageElement.classList.add("alert", "alert-primary");
    parent.appendChild(messageElement);
  }

  function isEmpty() {
    if (Object.keys(objOfTasks).length === 0) {
      showEmptyAllert();
    }
  }

  function listItemTemplate({ _id, title, body, completed } = {}) {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "flex-wrap",
      "mt-2"
    );

    li.dataset.completed = completed;
    li.dataset.taskId = _id;

    const span = document.createElement("span");
    span.textContent = title;
    span.style.fontWeight = "bold";

    const restoreCompletedTaskButton = document.createElement("button");
    restoreCompletedTaskButton.textContent = "restore";
    restoreCompletedTaskButton.classList.add(
      "btn",
      "btn-secondary",
      "ml-auto",
      "d-none"
    );

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.classList.add("btn", "ml-auto", "btn-success");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn", "btn-danger", "ml-1", "delete-btn");

    const article = document.createElement("p");
    article.textContent = body;
    article.classList.add("mt-2", "w-100");

    const cheched = doneCheck(li);

    li.appendChild(span);
    li.appendChild(restoreCompletedTaskButton);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    li.appendChild(article);

    changeColorOfComplitedTask(cheched, li, doneBtn);

    return li;
  }

  function deleteEmptyMessage() {
    const alertMessage = document.querySelector(".alert.alert-primary");
    if (alertMessage) {
      alertMessage.remove();
    }
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;
    if (!titleValue || !bodyValue) {
      alert("Введите title и body");
      return;
    }

    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement("afterbegin", listItem);

    deleteEmptyMessage();
    form.reset();
  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`,
    };

    // console.log(newTask);

    objOfTasks[newTask._id] = newTask;

    return { ...newTask };
  }

  function doneCheck(element) {
    const completedTask = element.dataset.completed;

    return completedTask === "true";
  }

  function confirmCompleteTask(id) {
    const { title } = objOfTasks[id];
    const isConfirm = confirm(`Пометить задачу ${title} как выполненную?`);
    if (!isConfirm) return isConfirm;
    return isConfirm;
  }

  function changeColorOfComplitedTask(confirmed, element, button) {
    if (!confirmed) return;

    button.classList.toggle("d-none");
    const btn = button.classList.contains("btn-secondary");
    if (btn) {
      element.querySelector(".btn-success").classList.toggle("d-none");
      element.classList.toggle("list-group-item-success");
    } else {
      element.classList.add("list-group-item-success");
      element.querySelector(".btn-secondary").classList.toggle("d-none");
    }
    // changeToRestoreButton(button, element);
  }

  function filterArray() {
    const filteredTasks = Object.fromEntries(
      Object.entries(objOfTasks).filter(
        ([key, value]) => value.completed === false
      )
    );
    renderAllTask(filteredTasks);
    console.log(Object.entries(objOfTasks));
  }

  function showUncompletedTasks() {
    if (currentState === "all") {
      filterArray();
      currentState = "uncompleted";
    }
  }

  function showAllTasks() {
    if (currentState !== "all") {
      renderAllTask(objOfTasks);
      currentState = "all";
    }
  }

  function completeTaskHandler({ target }) {
    if (target.classList.contains("btn-success")) {
      const parent = target.closest("[data-task-id]");
      const id = parent.dataset.taskId;
      const confirmed = confirmCompleteTask(id);

      if (!doneCheck(parent) && confirmed) {
        changeColorOfComplitedTask(confirmed, parent, target);
        objOfTasks[id].completed = true;
      }
      if (currentState === "all") {
        renderAllTask(objOfTasks);
      } else if (currentState === "uncompleted") {
        filterArray();
      }
    }
  }

  function deleteTask(id) {
    const { title } = objOfTasks[id];
    const isConfirm = confirm(`Точно удалить задачу: ${title}`);
    if (!isConfirm) return isConfirm;
    delete objOfTasks[id];
    return isConfirm;
  }

  function restoreTaskHandler({ target }) {
    if (target.classList.contains("btn-secondary")) {
      const parent = target.closest("[data-task-id]");
      const id = parent.dataset.taskId;
      const confirmed = restoreTask(id);
      changeColorOfComplitedTask(confirmed, parent, target);
    }
  }

  function restoreTask(id) {
    const { title } = objOfTasks[id];
    const isConfirm = confirm(`Точно восстановить задачу: ${title}`);
    if (!isConfirm) return isConfirm;
    objOfTasks[id].completed = false;
    return isConfirm;
  }

  function deleteTaskFromHtml(confirmed, element) {
    if (!confirmed) return;
    element.remove();
  }

  function onDeleteHandler({ target }) {
    if (target.classList.contains("delete-btn")) {
      const parent = target.closest("[data-task-id]");
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteTaskFromHtml(confirmed, parent);
      isEmpty();
    }
  }
  console.log(objOfTasks);
})(tasks);

// 1. На основе массива **map** и массива **users** собрать новый массив объектов где в каждом объекте будут
// только те свойства которые перечислены в массиве **map**
// 2. Написать функцию сортировки которая принимает массив объектов который хотим сортировать, поле по которому хотим сортировать,
// и в каком порядке сортировать по возрастанию asc или по убыванию desc.
// Условие со звездочкой. Иметь возможность сортировать по вложенному полю.
// 3. Написать функцию debounce, она принимает функцию которую нужно вызвать и время через которое
// эта функция должна быть вызвана и возвращает функцию которая сработает только один раз через N миллисекунд
// после последнего вызова.
// Условие со звездочкой, debounce должна возвращать метод cancel при вызове которого отложенная функция
// не будет выполнятся.

const map = ["_id", "name", "isActive", "balance"];
const users = [
  {
    _id: "5d220b10e8265cc978e2586b",
    isActive: true,
    balance: 2853.33,
    age: 20,
    name: "Buckner Osborne",
    gender: "male",
    company: "EMPIRICA",
    email: "bucknerosborne@empirica.com",
    phone: "+1 (850) 411-2997",
    registered: "2018-08-13T04:28:45 -03:00",
    nestedField: { total: 300 },
  },
  {
    _id: "5d220b10e8265cc978e2586b",
    isActive: true,
    balance: 5.32,
    age: 20,
    name: "Buckner Osborne",
    gender: "male",
    company: "EMPIRICA",
    email: "bucknerosborne@empirica.com",
    phone: "+1 (850) 411-2997",
    registered: "2018-08-13T04:28:45 -03:00",
    nestedField: { total: 300 },
  },
  {
    _id: "5d220b10e8265cc978e2586b",
    isActive: true,
    balance: 2853.33,
    age: 20,
    name: "Buckner Osborne",
    gender: "male",
    company: "EMPIRICA",
    email: "bucknerosborne@empirica.com",
    phone: "+1 (850) 411-2997",
    registered: "2018-08-13T04:28:45 -03:00",
    nestedField: { total: 300 },
  },
  {
    _id: "5d220b10144ef972f6c2b332",
    isActive: true,
    balance: 1464.63,
    age: 38,
    name: "Rosalie Smith",
    gender: "female",
    company: "KATAKANA",
    email: "rosaliesmith@katakana.com",
    phone: "+1 (943) 463-2496",
    registered: "2016-12-09T05:15:34 -02:00",
    nestedField: { total: 400 },
  },
  {
    _id: "5d220b1083a0494655cdecf6",
    isActive: false,
    balance: 2823.39,
    age: 40,
    name: "Estrada Davenport",
    gender: "male",
    company: "EBIDCO",
    email: "estradadavenport@ebidco.com",
    phone: "+1 (890) 461-2088",
    registered: "2016-03-04T03:36:38 -02:00",
    nestedField: { total: 200 },
  },
];

function filterUsers(arr = users, filter = map) {
  const filteredUsers = arr.map((element) =>
    filter.reduce((acc, value) => {
      acc[value] = element[value];
      return acc;
    }, {})
  );
  return filteredUsers;
}

function sortFieldOfArray(arr = users, field = "balance", order = "asc") {
  function sortField(a, b, order) {
    if (order === "desc") {
      return b;
    } else if (order === "asc") {
      return a;
    }
  }

  function sortFunc(a, b) {
    let compareA;
    let compareB;
    if (typeof a === "object" && typeof b === "object") {
      compareA = new Intl.Collator().compare(a.total, b.total);
      compareB = new Intl.Collator().compare(b.total, a.total);
      return sortField(compareA, compareB, order);
    } else {
      compareA = new Intl.Collator().compare(a, b);
      compareB = new Intl.Collator().compare(b, a);
      return sortField(compareA, compareB, order);
    }
  }

  const sortedArr = arr
    .map((obj) => {
      return obj[field];
    })
    .sort(sortFunc);
  console.table(sortedArr);
}

function debounce(f, timeout) {
  let time;

  return function () {
    let func = function () {
      time = null;
      f();
    };

    clearTimeout(time);
    time = setTimeout(func, timeout);
    return time;
  };
}

const debouncedFunc = debounce(filterUsers, 2000);

// 1)В конце таблицы обязательно последняя tr должна содержать total balance всех пользователей из таблицы при этом он должен быть всегда выровнен по правому краю.
// 2)Количество пользователей может быть любым.
// 3)Таблица и все ее содержимое должно создаваться через js, в разметке у вас может быть только контейнер.

let userFields = ["name", "email", "balance"];

(function CreateTableOfUsers(arr = users, filter = userFields) {
  const objOfUsers = filterUsers(arr, filter);
  CreateTableFragment();

  function createTableRow(arr) {
    const tempFragment = document.createDocumentFragment();
    const objValues = Object.values(arr);
    objValues.forEach((field, i) => {
      const tr = document.createElement("tr");
      const fieldValues = Object.values(field);

      fieldValues.unshift(i + 1);
      fieldValues.forEach((td) => {
        const newTd = document.createElement("td");
        newTd.textContent = td;
        tr.appendChild(newTd);
      });
      tempFragment.appendChild(tr);
    });

    return tempFragment;
  }

  function createTableHeader(fields) {
    const tableHeaderRow = document.createElement("tr");
    fields.unshift("#");
    fields.forEach((field) => {
      const tableHeader = document.createElement("th");
      tableHeader.setAttribute("scope", "row");
      tableHeader.textContent = field;
      tableHeaderRow.appendChild(tableHeader);
    });
    return tableHeaderRow;
  }

  function showTotalBalance(obj) {
    const total = Object.values(obj).reduce((acc, current) => {
      current = parseFloat(current["balance"]);

      return (acc += current);
    }, 0);
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.insertAdjacentHTML("beforeend", `Total balance: ${total}`);
    td.setAttribute("colspan", filter.length);
    td.setAttribute("align", "right");
    tr.appendChild(td);
    return tr;
  }

  function CreateTableFragment() {
    const fragment = document.createDocumentFragment();
    const container = document.querySelector(".container");
    const table = document.createElement("table");
    const tableHeader = createTableHeader(filter);
    const tableRow = createTableRow(objOfUsers);
    const totalBalance = showTotalBalance(objOfUsers);

    table.classList.add("table", "table-bordered");
    table.appendChild(tableHeader);
    table.appendChild(tableRow);
    table.appendChild(totalBalance);
    fragment.appendChild(table);
    container.appendChild(fragment);
  }
})(users);

// CreateTableOfUsers();

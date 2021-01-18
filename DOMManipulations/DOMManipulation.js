function setClassToOddLiElement() {
  const liOdd = document.querySelectorAll("li");
  for (i = 0; i < liOdd.length; i++) {
    if (i % 2 === 1) {
      continue;
    }
    liOdd[i].setAttribute("class", `item ${i + 1}`);
  }
}

function setLinkClass() {
  const links = document.links;
  for (i = 0; i < links.length; i++) {
    links[i].setAttribute("class", "custom-link");
  }
}

function addLi(quantity) {
  const ul = document.querySelector("ul");
  for (i = 0; i < quantity; i++) {
    ul.insertAdjacentHTML(
      "beforeend",
      `<li> <a href="#">Link${ul.children.length + 1}</a></li>`
    );
  }
  return `Было добавлено ${i} строк li!`;
}

function strongLiLinks() {
  const a = document.querySelector("ul").querySelectorAll("a");
  for (i = 0; i < a.length; i++) {
    a[i].innerHTML = `<strong> ${a[i].innerHTML} </strong>`;
  }
}

function addBabyYodaImage() {
  const img = document.createElement("img");
  img.setAttribute("src", "1_mk1-6aYaf_Bes1E3Imhc0A.jpeg");
  img.setAttribute("alt", "Baby Yoda");
  document.body.insertAdjacentElement("afterbegin", img);
  return `Атрибуты заданы!`;
}

function addClassToGreen() {
  const greenText = document.querySelector("mark");
  greenText.insertAdjacentText("beforeend", " green");
  greenText.setAttribute("class", "green");
  return `Добавлен текст в конце элемента mark, добавлен класс green!`;
}

function sortList() {
  const list = document.querySelector("ul");
  const liList = list.querySelectorAll("li");

  // for (const [key, value] of Object.entries(liList)) {
  //   console.log(`${value.innerHTML}`);
  // }

  const slicedLiList = Array.from(liList).slice();
  const sortedliList = slicedLiList.sort((li1, li2) => {
    const number1Str = li1.innerHTML.replace(/^\D+/g, "");
    const number1 = parseInt(number1Str);

    const number2Str = li2.innerHTML.replace(/^\D+/g, "");
    const number2 = parseInt(number2Str);

    return number1 - number2;
  });

  const reversedLiList = [];
  for (let i = sortedliList.length - 1; i >= 0; i--) {
    console.log(sortedliList[i].innerHTML);
    list.appendChild(sortedliList[i]);
  }

  // const reversedLiList = sortedliList.reverse();

  // console.log(reversedLiList);

  // for (i = 0; i < sortedliList.length; i++) {
  //   list.appendChild(sortedliList[i]);
  // }

  return `Список был перевернут!`;
}

const allUl = document.querySelectorAll(".dropdown-item");
const firstMenu = allUl;
const menuItem = document.querySelector(".menu").querySelectorAll("li")[3];

allUl.forEach((ul) => {
  ul.setAttribute("class", "d-none");
});

menuItem.addEventListener("mouseenter", (e) => {
  e.stopPropagation;
});

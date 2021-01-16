const arr = [1, 2, 3, 5, 8, 9, 10];
const arr1 = arr.map((element) => {
  const a = !Boolean(element % 2);

  return { number: element, odd: a };
});
console.log(arr1);

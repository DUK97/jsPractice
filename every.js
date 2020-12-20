function every(arr, callback) {
  if (Array.isArray(arr) && typeof callback === "function") {
    for (var i = 0; i < arr.length; i++) {
      if (!callback(arr[i])) {
        return false;
      }
    }
    return true;
  }
}

function isItBig(el) {
  return el >= 5;
}

const f = [10, 12, 10, 123, 42, 123];
console.log(every(f, isItBig));

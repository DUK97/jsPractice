const workWithString = function () {
  let newString = "";
  function setString(string) {
    newString = string;
    newString.toString;
    console.log("Строка успешно задана!");
    return this;
  }
  function getString() {
    console.log(newString);
    return this;
  }
  function stringLength() {
    console.log(newString.length);
    return this;
  }
  function reverseString() {
    console.log(newString.split("").reverse().join(""));
    return this;
  }
  return {
    setString,
    getString,
    stringLength,
    reverseString,
  };
};

const check = workWithString()
  .setString(123123)
  .getString()
  .stringLength()
  .reverseString();

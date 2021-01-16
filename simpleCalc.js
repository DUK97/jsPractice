const calc = function () {
  let res = 0;
  function setValue(num) {
    typeof num !== "number"
      ? console.log("Введите строку, а не число!")
      : (res = num);
  }
  function checkValue() {
    return Math.round(res);
  }
  function add(value) {
    res += value;
    return this;
  }
  function multiplyValue(mult) {
    res *= mult;
    return this;
  }
  function powerValue(pow) {
    res = Math.pow(res, pow);
    return this;
  }
  return {
    setValue: setValue,
    checkValue: checkValue,
    add: add,
    multiplyValue: multiplyValue,
    power: powerValue,
  };
};

const check = calc().add(2).multiplyValue(2).power(2).checkValue();

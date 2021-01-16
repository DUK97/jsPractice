const numerator = {
  value: 1,
  double: function () {
    this.value *= 2;
    return this;
  },
  plusOne: function () {
    this.value += 1;
    return this;
  },
  minusOne: function () {
    this.value -= 1;
    return this;
  },
};

// console.log(numerator.double().plusOne().minusOne().plusOne());

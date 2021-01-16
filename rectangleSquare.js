const rectangle = {
  width: 12,
  height: 10,
  getSquare: function () {
    const square = this.width * this.height;
    return square;
  },
};

console.log(rectangle.getSquare());

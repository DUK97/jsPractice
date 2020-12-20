const price = {
  price: 10,
  discount: '15%',
  getPrice: function () {
    const itemPrice = this.price;
    return itemPrice;
  },
  getPriceWithDiscount: function () {
    const percent = (100 - parseInt(this.discount))/100;
    const priceWithDiscont = percent * this.price; 
    return priceWithDiscont;
  }
};

console.log(price.getPrice());
console.log(price.getPriceWithDiscount());

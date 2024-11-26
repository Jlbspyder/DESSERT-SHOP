export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

export const calculatePrices = (orderItems) => {
      // item price
      const itemPrice = addDecimals(orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0))
            
      // shipping price (free shipping for order above $50)
      const shippingPrice = addDecimals(itemPrice > 50 ? 0 : 5)

      // tax price  (5% tax)
      const taxPrice = addDecimals(Number((0.05 * itemPrice).toFixed(2)))

      // total price 
      const totalPrice = (
          Number(itemPrice) +
          Number(shippingPrice) +
          Number(taxPrice)
      ).toFixed(2)
    
      return { itemPrice, shippingPrice, taxPrice, totalPrice }
}
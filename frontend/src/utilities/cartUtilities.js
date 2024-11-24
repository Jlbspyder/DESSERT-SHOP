export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = (state) => {
      // item price
      state.itemPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0))
            
      // shipping price (free shipping for order above $50)
      state.shippingPrice = addDecimals(state.itemPrice > 50 ? 0 : 5)

      // tax price  (5% tax)
      state.taxPrice = addDecimals(Number((0.05 * state.itemPrice).toFixed(2)))

      // total price 
      state.totalPrice = (
          Number(state.itemPrice) +
          Number(state.shippingPrice) +
          Number(state.taxPrice)
      ).toFixed(2)

      localStorage.setItem('cart', JSON.stringify(state))
    
      return state
}
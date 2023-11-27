// Cart.js
export function addToCart(cart, item, setCart) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  }
  
  export function removeFromCart(cart, itemId, setCart) {
    setCart(cart.filter(item => item.id !== itemId));
  }
  
  export function adjustQuantity(cart, itemId, quantity, setCart) {
    setCart(cart.map(item =>
      item.id === itemId ? { ...item, quantity: Math.max(quantity, 0) } : item
    ));
  }
  
  export function calculateTotal(cart) {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  

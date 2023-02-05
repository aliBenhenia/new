import React, { useState, useContext, createContext } from "react";

// Create a context object to share the cart data between components
const CartContext = createContext();

// Create a component that provides the cart data to its children
function CartProvider({ children }) {
  // Define the state for the cart items
  const [cartItems, setCartItems] = useState([]);

  // Add an item to the cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Remove an item from the cart
  const removeFromCart = (item) => {
    setCartItems(cartItems.filter((x) => x !== item));
  };

  // Return a provider with the cart data and functions
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Create a component that uses the cart data
function Product({ name, price }) {
  // Get the cart data and functions from the context
  const { addToCart } = useContext(CartContext);

  // Return a button to add the product to the cart
  return (
    <div>
      <h3>{name}</h3>
      <p>{price}</p>
      <button onClick={() => addToCart({ name, price })}>Add to Cart</button>
    </div>
  );
}
function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} ({item.price})
            <button onClick={() => removeFromCart(item)}>remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
// Use the CartProvider and Product components in your application
function App() {
  return (
    <CartProvider>
      <Product name="Product 1" price="$10" />
      <Product name="Product 2" price="$212" />
      <Product name="Product 3" price="$2330" />
      <Cart />
    </CartProvider>
  );
}

export default App;

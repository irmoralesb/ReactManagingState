import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
//import Detail from "./DetailRefs";
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      //USING A INNER FUNCTION AVOIDS RECURRENT EXECUTION, SINCE FUNCTION ARE LAZY
      return JSON.parse(localStorage.getItem("cart")) ?? [];
    } catch {
      console.error("The cart could not be parsed into JSON.");
      return [];
    }
  });

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  function addToCart(id, sku) {
    setCart((items) => {
      const itemInCart = items.find((i) => i.sku === sku);
      if (itemInCart) {
        return items.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...items, { id, sku, quantity: 1 }];
      }
    });
  }

  function updateQuantity(sku, quantity) {
    setCart((items) => {
      if (quantity === 0) {
        return items.filter((i) => i.sku !== sku);
      }
      return items.map((i) =>
        i.sku === sku ? { ...i, quantity: quantity } : i
      );
    });
  }

  function emptyCart() {
    setCart([]);
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Detail addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} updateQuantity={updateQuantity} />}
            />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} emptyCart={emptyCart} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}

//itemInCart.items++;  DONT DO THIS, FOR UPDATING YOU NEED TO USE THE SETTER
// Examples of creating new instances
// 1) Copy vie Object.assign
//    Object.assign({}, state, {role: "admin"})
// First parameter =>  {} is the new object
// Second parameter => a property with its current value (no change)
// Third parameter => property with a new value
//
// 2) Spread syntax (Shallow copies, beaware of inner levels)
//   const newState = {...state, role:"admin"};
//   for arrays
//   const newUsers = [...state.users];
//  for nested objects
//  const userCopy = { ...user, address:{...user.address}};
//
//  One possible approach is to avoid nested objects, for instance
//  const [user, setUser] = useState(user);
//  const [address, setAddress] = useState(user.address);

// For arrays
// avoid using : push, pop, revers
// prefer using: map, filter, reduce, concat, spread

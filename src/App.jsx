import React, { useEffect, useReducer } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
//import Detail from "./DetailRefs";
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import cartReducer from "./cartReducer";

let initialCart;
try {
  //USING A INNER FUNCTION AVOIDS RECURRENT EXECUTION, SINCE FUNCTION ARE LAZY
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  console.error("The cart could not be parsed into JSON.");
  initialCart = [];
}

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

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
              element={<Detail dispatch={dispatch} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} dispatch={dispatch} />}
            />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} dispatch={dispatch} />}
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

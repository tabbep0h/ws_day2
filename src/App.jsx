import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import "./bootstrap.min.css";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [products, setProducts] = useState([]);

  const [token, setToken] = useState("");

  useEffect(() => {
    const localToken = localStorage.getItem('token')
    if (localToken != "") {
      setIsAuth(true)
      setToken(localToken)
    }
  }, [])

  return (
    <div className="container py-3">
      <Routes>
        <Route
          path="/"
          element={
            <Index
              isAuth={isAuth}
              setIsAuth={setIsAuth}
              setToken={setToken}
              setProducts={setProducts}
              token={token}
              products={products}
            />
          }
        ></Route>
        <Route
          path="/login"
          element={
            <Login
              isAuth={isAuth}
              setIsAuth={setIsAuth}
              setToken={setToken}
              token={token}
            />
          }
        ></Route>
        <Route
          path="/register"
          element={
            <Register
              isAuth={isAuth}
              setIsAuth={setIsAuth}
              setToken={setToken}
              token={token}
            />
          }
        ></Route>

        {isAuth && (
          <>
            <Route
              path="/cart"
              element={
                <Cart
                  setIsAuth={setIsAuth}
                  setToken={setToken}
                  isAuth={isAuth}
                  token={token}
                />
              }
            ></Route>
            <Route
              path="/orders"
              element={
                <Orders
                  setIsAuth={setIsAuth}
                  setToken={setToken}
                  setProducts={setProducts}
                  isAuth={isAuth}
                  token={token}
                  productss={products}
                />
              }
            ></Route>
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;

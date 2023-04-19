import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Navigate, useNavigate } from "react-router-dom";

function Cart({ token, isAuth, setIsAuth, setToken }) {
  const [cart, setCart] = useState([]);

  const nav = useNavigate();

  const fetchCart = async () => {
    await fetch("http://127.0.0.1:8000/8/api-cart/cart", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json) {
          setCart(json.body[0].products);
        }
      });
  };
  useEffect(() => {
    fetchCart();
  }, []);

  const deleteCart = (item) => {
    fetch(`http://127.0.0.1:8000/8/api-cart/cart/${item.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(setCart(cart.filter((x) => x.id !== item.id)));
  };

  function createOrder() {
    fetch("http://127.0.0.1:8000/8/api-cart/order", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(setCart([]));
  }
   
  let error

  const handleClick = () => {
      createOrder()
      nav("/orders")
  }
  console.log(cart)

  const cartCard = cart.map((item, index) => {
    return (
      <div class="col" key={index}>
        <div class="card mb-4 rounded-3 shadow-sm">
          <div class="card-header py-3">
            <h4 class="my-0 fw-normal">{item.product}</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">
              {item.name}.
            </h1>
            <p>{item.description}</p>

            <button type="button" class="btn btn-lg btn-info mb-3">
              +
            </button>
            <button type="button" class="btn btn-lg btn-warning mb-3">
              &minus;
            </button>
            <button
              type="button"
              class="btn btn-lg btn-outline-danger mb-3"
              onClick={() => deleteCart(item)}
            >
              Удалить из корзины
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <header>
        <Header isAuth={isAuth} setIsAuth={setIsAuth} setToken={setToken}></Header>
        <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h1 class="display-4 fw-normal">Корзина</h1>
        </div>
      </header>
      <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
        {cart.length > 0 && cartCard}
      </div>
      <div class="row justify-content-center gap-1">
        <button
          class="col-6 btn btn-lg btn-outline-info mb-3"
          type="button"
          onClick={() => nav("/")}
        >
          Назад
        </button>
        <button
          type="button"
          class="col-6 btn btn-lg btn-primary mb-3"
          onClick={(() => handleClick())}
        >
          Оформить заказ
        </button>
        {error}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Cart;

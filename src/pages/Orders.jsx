import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Orders({setToken, setIsAuth, isAuth, token}) {
  const [order, setOrder] = useState([]);

  const fetchOrder = async () => {
    await fetch("http://127.0.0.1:8000/8/api-cart/order", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json) {
          setOrder(json);
        }
      });
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  console.log(order);


  const orderCard = order.map((item, index) => {
    return (
      <div class="row row-cols-1 row-cols-md-3 mb-3 text-center bg-light">
        <h2 class="w-100">Заказ №{index+1}</h2>

        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header py-3">
              <h4 class="my-0 fw-normal">{}</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">
                Итоговая стоимость:
                {item.order_price}
              </h1>
            </div>
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
          <h1 class="display-4 fw-normal">Ваши заказы</h1>
        </div>
      </header>

      <main>
        {orderCard}
      </main>

      <Footer></Footer>
    </div>
  );
}

export default Orders;

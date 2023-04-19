import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Index({ products, token, isAuth, setProducts, setIsAuth, setToken }) {
  
  useEffect(() => {
    const fetchProducts = async () => {
      await fetch("http://127.0.0.1:8000/8/api-cart/products")
        .then((res) => res.json())
        .then((json) => {
          setProducts(json.data);
        });
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    fetch(`http://127.0.0.1:8000/8/api-cart/cart/${product.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };
   
  console.log(products);

  const ProductCard = products.map((product, index) => {
    return (
      <div className="col" key={index}>
        <div className="card mb-4 rounded-3 shadow-sm">
          <div className="card-header py-3">
            <h4 className="my-0 fw-normal">{product.name}</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title">{product.price}</h1>
            <p>{product.description}</p>
            {isAuth && (
              <button
                type="button"
                className="w-100 btn btn-lg btn-outline-primary"
                onClick={(index) => addToCart(product, index)}
              >
                Добавить в корзину
              </button>
            )}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <header>
        <Header isAuth={isAuth} setIsAuth={setIsAuth} setToken={setToken} />
        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h1 className="display-4 fw-normal">Каталог товаров</h1>
        </div>
      </header>
      <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
        {ProductCard}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Index;

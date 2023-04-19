import React from "react";
import { Link } from "react-router-dom";

function Header({ isAuth, setIsAuth, setToken }) {
  console.log(isAuth);
  return (
    <header>
      <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center text-dark text-decoration-none"
        >
          <span className="fs-4">«Just buy»</span>
        </a>

        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          {isAuth === false ? (
            <>
              <Link to="/register">
                <p
                  className="me-3 py-2 text-dark text-decoration-none"
                  href="#"
                >
                  Регистрация
                </p>
              </Link>
              <Link to="/login">
                <p
                  className="me-3 py-2 text-dark text-decoration-none"
                  href="#"
                >
                  Авторизация
                </p>
              </Link>
            </>
          ) : (
            <>
              <Link to="/orders">
                <p
                  className="me-3 py-2 text-dark text-decoration-none"
                  href="#"
                >
                  Мои заказы
                </p>
              </Link>

              <Link to="/cart">
                <p
                  className="me-3 py-2 text-dark text-decoration-none"
                  href="#"
                >
                  Корзина
                </p>
              </Link>
              <Link to="/">
                <p
                  className="me-3 py-2 text-dark text-decoration-none"
                  href="#"
                  onClick={() => {
                    setIsAuth(false);
                    setToken("");
                    localStorage.setItem('token', "")
                  }}
                >
                  Выйти
                </p>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;

import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Login({ isAuth, setIsAuth, setToken }) {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSumbit = async (event) => {
    event.preventDefault();
    const data = {
      email: name,
      password: password,
    };
    console.log(name);
    let response = await fetch("http://127.0.0.1:8000/8/api-cart/login", {
      method: "POST",
      body: JSON.stringify({
        email: name,
        password: password,
      }),
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
    let answer = await response.json();
    if (response.ok) {
      setToken(answer.data.user_token);
      localStorage.setItem('token', answer.data.user_token)
      setIsAuth(true);
      nav("/");
    } else {
      console.log(answer.error.message);
      setError(answer.error.message);
    }
    console.log(data);
  };

  console.log(isAuth);
  return (
    <div>
      <header>
        <Header
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          setToken={setToken}
        ></Header>

        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h1 className="display-4 fw-normal">Авторизация</h1>
        </div>
      </header>

      <main>
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center justify-content-center">
          <div className="col">
            <div className="row">
              <form>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                  />
                  <label for="floatingInput">Email</label>
                  <div className="invalid-feedback">Email error</div>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <label for="floatingPassword">Password</label>
                  <div className="invalid-feedback">Password error</div>
                </div>

                <button
                  className="w-100 btn btn-lg btn-primary mb-3"
                  type="submit"
                  onClick={(event) => onSumbit(event)}
                >
                  Войти
                </button>
                <button
                  className="w-100 btn btn-lg btn-outline-info"
                  type="submit"
                  onClick={() => nav("/")}
                >
                  Назад
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default Login;

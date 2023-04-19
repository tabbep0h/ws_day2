import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Register({setToken, setIsAuth, isAuth}) {
  const nav = useNavigate()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const onSumbit = async (event) => {
    event.preventDefault();
    let response = await fetch("http://127.0.0.1:8000/8/api-cart/signup", {
      method: "POST",
      body: JSON.stringify({
        fio: name,
        email: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
    let answer = await response.json();
    if (response.ok) {     
      nav("/login");
    } else {
      console.log(answer.error.message);
      setError(answer.error.message);
    }
  };

  return (
    <div>
      <header>
        <Header isAuth={isAuth} setIsAuth={setIsAuth} setToken={setToken}></Header>
        <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 class="display-4 fw-normal">Регистрация</h1>
        </div>
    </header>

    <main>
        <div class="row row-cols-1 row-cols-md-3 mb-3 text-center justify-content-center">
            <div class="col">
                <div class="row">
                    <form>
                        <h1 class="h3 mb-3 fw-normal">Пожалуйста заполните все поля</h1>
                        <div class="form-floating mb-3">
                            <input type="text" className={`form-control ${error ? 'is-invalid' : ''}`} id="floatingFio" placeholder="ФИО"  value = {name} onChange={(e) => setName(e.target.value)}/>
                            <label for="floatingFio">ФИО</label>
                            <div className="invalid-feedback">Name error</div>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="email" className={`form-control ${error ? 'is-invalid' : ''}`} id="floatingInput" placeholder="name@example.com" value = {email} onChange={(e) => setEmail(e.target.value)}/>
                            <label for="floatingInput">Email</label>
                            <div className="invalid-feedback">Email error</div>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="password" className={`form-control ${error ? 'is-invalid' : ''}`} id="floatingPassword" placeholder="Password" value = {password} onChange={(e) => setPassword(e.target.value)}/>
                            <label for="floatingPassword">Password</label>
                            <div className="invalid-feedback">Password error</div>
                        </div>

                        <button class="w-100 btn btn-lg btn-primary mb-3" type="submit" onClick={(event) => onSumbit(event)}>Зарегистрироваться</button>
                        <button class="w-100 btn btn-lg btn-outline-info" type="submit">Назад</button>
                    </form>
                </div>

            </div>
        </div>
    </main>

    <Footer></Footer>
</div>
  )
}

export default Register
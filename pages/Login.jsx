import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import api from "../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const myApi = api();

  const handleLogin = () => {
    console.log("handleLogin", email, password);
    myApi.get("user").then((res) => {
      console.log("res", res.data);
      res.data.forEach((element) => {
        if (element.email === email && element.password === password) {
          localStorage.setItem("userLogin", [element.name, 1]);
          localStorage.setItem("userAdmin", ["", 0]);
          console.log("yes");
          window.location.replace("/");
        } else {
          console.log("noe");
        }
      });
    });
  };
  const handleAdminLogin = () => {
    console.log("handleAdminLogin");
    myApi.get("admin").then((res) => {
      console.log("res", res.data);
      if (res.data[0].email === email && res.data[0].password === password) {
        console.log("yes");
        localStorage.setItem("userLogin", ["", 0]);
        localStorage.setItem("userAdmin", [res.data[0].name, 1]);
        window.location.replace("/");
      } else {
        console.log("noe");
      }
    });
  };

  return (
    <>
      <Header />
      <div className="login">
        <h1>Giriş</h1>
        <form>
          <div>
            <label>E-posta</label>
            <input
              type="email"
              placeholder="E-posta"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </div>
          <div>
            <label>Şifre</label>
            <input
              type="password"
              placeholder="Şifre"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </div>
          <div>
            <button type="button" onClick={handleLogin}>
              Giriş
            </button>
            <button type="button" onClick={handleAdminLogin}>
              Admin Gİriş
            </button>
            <button type="button" onClick={handleAdminLogin}>
              <Link to={"/register"}>Kayıt Ol</Link>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

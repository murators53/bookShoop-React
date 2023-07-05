import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import api from "../api/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const myApi = api();
  const navigate = useNavigate();

  const handleRegister = () => {
    console.log("handleRegister");
    const newUser = {
      id: new Date().getTime(),
      email: email,
      password: password,
      name: name,
      surname: surname,
    };
    myApi.post("/user", newUser).then((res) => {
      console.log("res", res.data);
      // window.location.replace('/login')
      navigate('/login')
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
            <label>Adı</label>
            <input
              type="text"
              placeholder="Adınız"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </div>
          <div>
            <label>Soyadı</label>
            <input
              type="text"
              placeholder="Soyadı"
              onChange={(event) => setSurname(event.target.value)}
              value={surname}
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
            <button
              type="button"
              onClick={handleRegister}
              disabled={!email || !name || !surname || !password}
            >
              {/* <Link to={"/login"}>Kayıt Ol</Link> */}
              Kayıt Ol
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;

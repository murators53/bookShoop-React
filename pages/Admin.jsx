import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const [users, setUsers] = useState([]); //Kitap listesi durumunu yönetmek için

  const myApi = api();
  const navigate = useNavigate();


  useEffect(()=>{
    myApi.get("user").then((res) => {
        console.log(res.data)
        setUsers(res.data)
      });
  },[])


  function handleDelete(itemId) {
    console.log('SILINECEK OLAN',itemId)
    myApi
      .delete(`user/${itemId}`)
      .then((res) => {
        // Başarıyla silme işlemi gerçekleştiğinde yapılacak işlemler
        console.log("Silme işlemi başarılı");
        // Silinen öğeyi bookList'ten filtreleyerek kaldırın
        setUsers((prevList) =>
          prevList.filter((item) => item.id !== itemId)
        );
      })
      .catch((err) => {
        // Silme işlemi sırasında hata durumunda yapılacak işlemler
        console.log("Silme işlemi sırasında bir hata oluştu", err);
      });
  }

  const handleLogout = () => {
    console.log('CIKILACAK')
    localStorage.setItem("userAdmin", ['', 0]);
    navigate("/"); // Rotala yönlendir

  }

  return (
    <>
      <Header />
      <div className="list">
        <h1>Kullanıcılar</h1>
        <div className="list-process">
          
          {/* </div> */}
          <button onClick={handleLogout} className="list-process-right logout" >
             Çıkış Yap
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>İd</th>
              <th>Ad</th>
              <th>Kullanıcı Adı</th>
              <th>Şifre</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
          {users.map((item, index) => (
              //return ilede kullanablirim
              //return ile kullaninca deger dondurmeden once mudahalelelr yapabilirim
              <tr key={item.id}>
                <th></th>
                <th>{item.id}</th>
                <th>{item.name}</th>
                <th>{item.email}</th>
                <th>{item.password}</th>
                <th>
                  <img
                    onClick={() => handleDelete(item.id)} //silinecek kitabin idsinide gonderiyoruz fonk.na
                    src="https://img.icons8.com/?size=1x&id=102550&format=png"
                    alt=""
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Admin;

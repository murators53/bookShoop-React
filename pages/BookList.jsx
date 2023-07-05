import React, { useEffect, useState } from "react";
import api from "./../api/api";
import { Link } from "react-router-dom";
import { fetchBooks } from "../utils/Utils";
import Header from "../components/Header";
import Loading from "../components/Loading";

const BookList = () => {
  const myApi = api(); //useApi()de kullanabilirdik promise bir fonksiyondur
  // console.log(myApi()); //Promise Kontrol
  const [bookList, setBookList] = useState([]); //Kitap listesi durumunu yönetmek için
  // İlk öğe, durum değerini tutan değişkenin kendisidir
  //ikinci öğe ise durum değerini güncellemek için kullanılan bir fonksiyondur.
  //ikinci öğe durum değişkeninin yeni değerini alır ve bileşenin yeniden render edilmesini sağlar.

  const [search, setSearch] = useState(""); //aranan deger
  const [sortBy, setSortBy] = useState(""); //

  useEffect(() => {
    myApi
      .get("product")
      .then((res) => {
        //Başarıyla gerçekleşecek sonuç değerinde yapılacak işlemeler
        // console.log(res.data)
        /* const [bir, iki, uc, dort, bes, ...geriyeKalan]=res.data
      console.log('bir',bir)
      console.log('geriyeKalan',geriyeKalan) */

        //kitap listesi güncelleme
        setTimeout(() => {
          //içindeki kodu 0.7sn sonra çalıştırır
          console.log(res.data);
          setBookList(res.data);
        }, 700);
      })
      .catch((err) => {
        //Hatayla durumunda yapılacak işlemeler
        console.log(err);
      });
  }, []);

  function handleDelete(itemId) {
    myApi
      .delete(`product/${itemId}`)
      .then((res) => {
        // Başarıyla silme işlemi gerçekleştiğinde yapılacak işlemler
        console.log("Silme işlemi başarılı");
        // Silinen öğeyi bookList'ten filtreleyerek kaldırın
        setBookList((prevList) =>
          prevList.filter((item) => item.id !== itemId)
        );
      })
      .catch((err) => {
        // Silme işlemi sırasında hata durumunda yapılacak işlemler
        console.log("Silme işlemi sırasında bir hata oluştu", err);
      });
  }

  /* ARAMA ISLEMI */
  useEffect(() => {
    fetchBooks(search, sortBy, setBookList);
  }, [search, sortBy]);

  //APIDEN veriler alınmadıysa loading ekranı döndürmek için
  if (bookList.length === 0) {
    return <Loading />
  }

  return (
    <>
      <Header />

      <div className="list">
        <h1>Kitap Listesi</h1>
        <div className="list-process">
          {/* <div className="list-process-left"> */}
          <Link to={"/addbook"} className="list-process-left">
            <img
              src="https://img.icons8.com/?size=512&id=SuPFstyooiwU&format=png"
              width={30}
              alt=""
            />
            Ürün Ekle
          </Link>
          {/* </div> */}
          <div className="list-process-right">
            <div className="input">
              <button type="submit">
                <img
                  src="https://img.icons8.com/?size=512&id=7695&format=png"
                  width={30}
                  alt="search"
                />
              </button>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Listede Bul"
              />
            </div>
            <select onChange={(e) => setSortBy(e.target.value)}>
              <option value="Default">Varsayılan</option>
              <option value="Author">Yazara Göre</option>
              <option value="Book">Kitaba Göre</option>
              <option value="Publisher">Yayıncıya Göre</option>
              <option value="Genre">Türe göre</option>
              <option value="Stock +">Stoka Göre Artan</option>
              <option value="Stock -">Stoka Göre Azalan</option>
              <option value="Price +">Fiyata Göre Artan</option>
              <option value="Price -">Fiyata Göre Azalan</option>
              <option value="Page Count +">Sayfaya Göre Artan</option>
              <option value="Page Count -">Sayfaya Göre Azalan</option>
            </select>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>ISBN</th>
              <th>Yazar</th>
              <th>Kitap Adı</th>
              <th>Yayıncı</th>
              <th>Tür</th>
              <th>Stok</th>
              <th>Fiyat</th>
              <th>Sayfa</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {bookList.map((item, index) => (
              //return ilede kullanablirim
              //return ile kullaninca deger dondurmeden once mudahalelelr yapabilirim
              <tr key={item.id}>
                <th></th>
                <th>{item.isbn}</th>
                <th>{item.author}</th>
                <th>{item.bookName}</th>
                <th>{item.publisher}</th>
                <th>{item.genre}</th>
                <th>{item.count}</th>
                <th>{item.price} TL</th>
                <th>{item.pageCount}</th>
                <th>
                  {/* path='/editbook/:urun-id' burda urun-idsi yazdirdim isbn de olurdu */}
                  <Link to={`/editbook/${item.id}`}>
                    <img
                      src="https://img.icons8.com/?size=512&id=12082&format=png"
                      alt=""
                    />
                  </Link>
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

export default BookList;

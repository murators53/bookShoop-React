import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";

const AddBook = () => {
  const [author, setAuthor] = useState(""); //başlangıç değerleri "" dir
  const [bookName, setBookName] = useState("");
  const [publisher, setPublisher] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [isbn, setIsbn] = useState("");
  const [pageCount, setPageCount] = useState("");
  //   const isbnRef=useRef(null)/*  başlangıç değeri olarak null veya undefined */

  const [isBookAdded, setIsBookAdded] = useState(false); //! urun eklendı mı

  const myApi = api();
  const navigate = useNavigate(""); //rotalara yönlendirme yapmayı sağlar.

  const handleAdd = (e) => {
    e.preventDefault();

    console.log(api);
    //eklenecek urun objesi
    const newProduct = {
      id: new Date().getTime(), //Epoch zamanı, 1 Ocak 1970 00:00:00 UTC'den itibaren geçen milisaniye sayısını
      bookName: bookName,
      author: author,
      publisher: publisher,
      genre: genre,
      description: description,
      isbn: isbn,
      image: image,
      price: price,
      pageCount: pageCount,
    };
    console.log("NEW PRODUCT", newProduct);
    myApi
      .post("/product", newProduct)
      .then((res) => {
        // console.log(res);
        //urun ekleme basariyla tamamlandi
        toast.success("Ürün başarıyla eklendi! Yönlendiriliyorsunuz"); // Toast bildirimi
        setIsBookAdded(true); //! urun ekleme kontrolu navigateden sonra tamamla
      })
      .catch((error) => {
        console.error(error);
      });
    //useNavigate ile , tarayıcının URL'si güncellenir ve belirtilen rota render edilir.
    //Ancak, sayfa yenilenmediği için bileşen yeniden render edilmez ve değişiklikler görüntülenmez.
    //   navigate('/booklist') //burda dene asagiya al //!start
    //! burda hata oluscak sonra asagida ornek gosterilecek navigate asagida yapilacak
  }; //function handleAdd(){ }

  // Yeni eklenen ürün isBookAdded ile kitap eklenimi basaritla tamamlandiginda
  // yeniden render etmek için useEffect kullanabilirsiniz
  /* useEffect(() => { //!
    if (isBookAdded) {
      navigate("/booklist"); // Rotala yönlendir
    }
  }, [isBookAdded]); */

  //2.yontem //!
  if (isBookAdded) {
    setTimeout(() => {
      //2sn sonra yonlendirir
      navigate("/booklist"); // Rotala yönlendir
    }, 2000);
  }

  return (
    <>
      <Header />

      <div className="addbook">
        <h1>Kitap Ekle</h1>
        <form onSubmit={handleAdd} className="addbook-form">
          <div className="">
            <span>ISBN:</span>
            {/* value özelliği, input alanının başlangıç değerini */}
            <input
              type="text"
              onChange={(e) => {
                /* onChange olay işleyicisi, herhangi bir değişiklik yapıldığında tetiklenen bir fonksiyondur. 
            Kullanıcı herhangi bir şey yazdığında veya metni silerek input alanını değiştirdiğinde bu olay tetiklenir. */
                // console.log('e NEDIR=>',e.target.value)inputa yazilan değerdir.
                setIsbn(e.target.value);
              }}
            />
          </div>
          <div className="">
            <span>Yazar adı:</span>
            <input type="text" onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <div className="">
            <span>Kitap adı:</span>
            <input type="text" onChange={(e) => setBookName(e.target.value)} />
          </div>
          <div className="">
            <span>Yayınevi:</span>
            <input type="text" onChange={(e) => setPublisher(e.target.value)} />
          </div>
          <div className="">
            <span>Fiyat:</span>
            <input type="text" onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="">
            <span>Kitap Türü:</span>
            <input type="text" onChange={(e) => setGenre(e.target.value)} />
          </div>
          <div className="">
            <span>Sayfa Sayısı:</span>
            <input type="text" onChange={(e) => setPageCount(e.target.value)} />
          </div>

          <div className="">
            <span>
              Kitap Görseli:{" "}
              <small style={{ color: "gray" }}>(url olarak ekleyin!)</small>
            </span>
            <input type="text" onChange={(e) => setImage(e.target.value)} />
          </div>
          <div className="">
            <span>Açıklama:</span>
            <textarea
              cols="3"
              rows="5"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          {/* HTML gezinme bağlantıları için kullanır sayfa yenilenerek çalışır */}
          {/* <a href="/booklist">Ekle</a> */}
          {/* tek sayfa uygulama (SPA) tarzı gezinme sağlar.React uygulamalarında sayfa yönlendirmesi  */}
          <button
            type="submit"
            disabled={
              !isbn ||
              !author ||
              !bookName ||
              !publisher ||
              !genre ||
              !image ||
              !pageCount ||
              !description ||
              !price
            }
          >
            TAMAMLA
          </button>
        </form>
        <ToastContainer autoClose={1000} />
      </div>
    </>
  );
};

export default AddBook;

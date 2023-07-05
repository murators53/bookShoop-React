import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify"; //bildirim gosterme
import "react-toastify/dist/ReactToastify.css";
import api from "../api/api";
import Header from "../components/Header";

const EditPage = () => {
  const [author, setAuthor] = useState(""); //başlangıç değerleri "" dir
  const [bookName, setBookName] = useState("");
  const [publisher, setPublisher] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [isbn, setIsbn] = useState("");
  const [pageCount, setPageCount] = useState("");
  //!2.yontem
  const [formData, setFormData] = useState({
    author: "",
    bookName: "",
    publisher: "",
    genre: "",
    description: "",
    price: "",
    image: "",
    isbn: "",
    pageCount: "",
  });

  const [isBookEdited, setIsBookEdited] = useState(false); //! urun guncellendi mı

  const [currentProduct, setCurrentProduct] = useState(""); //!

  const myApi = api(); //db.json fake apisinden veri almak icin
  const navigate = useNavigate(""); //rotalara yönlendirme yapmayı sağlar.

  //<Route path='/editbook/:urun-id' element={<AddBook />} />
  const { urunId } = useParams(); //burda urun-id ile belirtilen degerdir
  //   console.log(urunId); params ile id almak

  useEffect(() => {
    myApi
      .get("product")
      .then((res) => {
        console.log(res.data);

        // const bul = res.data.find((item) => item.id == urunId); //type na bakmadan esitler ==
        const findProduct = res.data.find(
          (item) => item.id === parseInt(urunId)
        ); //type'da bakarak esitler
        setCurrentProduct(findProduct);//! duzenlenecek urun
        
        //ilk çalıştığında proje value değerlerini günceller
        //ve buldUğumuz ID ye ait değerleri yine useState ile güncelledik
        setAuthor(findProduct.author); //başlangıç değerleri için
        setBookName(findProduct.bookName); //useEffect ile sayfa ilk yüklenince yapar
        setPublisher(findProduct.publisher);
        setGenre(findProduct.genre);
        setDescription(findProduct.description);
        setPrice(findProduct.price);
        setImage(findProduct.image);
        setIsbn(findProduct.isbn);
        setPageCount(findProduct.pageCount);
        //!2.yontem ile 
        setFormData(findProduct);
      })
      .catch((err) => {
        //Hatayla durumunda yapılacak işlemeler
        console.log(err);
      });
  }, []);

  

  //Değişiklikleri yine apiye gönderip ordaki değerleri güncelliyoruz
  const handleEdit = (e) => {
    e.preventDefault();
    console.log("submit olacak urun", currentProduct);
    //güncellemenin bitmiş hali
    const updatedProduct = {
      ...currentProduct, //varsayilan urunu ekler ve icindeki degerler varsa guncellenir
      bookName: bookName, //bunun gibi
      author: author,
      publisher: publisher,
      genre: genre,
      description: description,
      isbn: isbn,
      image: image,
      price: price,
      pageCount: pageCount,
    };
    console.log("editFinished", updatedProduct);

    myApi.put(`product/${updatedProduct.id}`,updatedProduct)
    .then(res=>{
      console.log(res);
      toast.success("Ürün başarıyla güncellendi! Yönlendiriliyorsunuz"); // Toast bildirimi 
      setIsBookEdited(true); //! urun ekleme kontrolu navigateden sonra tamamla
      })
    .catch(err=>{
      console.log(err);
    })
  };
  console.log("SONHALI", formData);

  // Yeni eklenen ürün isBookAdded ile kitap eklenimi basaritla tamamlandiginda
  // yeniden render etmek için useEffect kullanabilirsiniz
  /* useEffect(() => { //!
    if (isBookAdded) {
      navigate("/booklist"); // Rotala yönlendir
    }
  }, [isBookAdded]); */

  //2.yontem //!
  if (isBookEdited) {
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
      <form onSubmit={handleEdit} className="addbook-form">
        <div className="">
          <span>ISBN:</span>
          {/* value özelliği, input alanının başlangıç değerini */}
          <input
            type="text"
            value={isbn} //isbn varsayilan başlangıç değerini belirtir
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
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="">
          <span>Kitap adı:</span>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
        </div>
        <div className="">
          <span>Yayınevi:</span>
          <input
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
        </div>
        <div className="">
          <span>Fiyat:</span>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="">
          <span>Kitap Türü:</span>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div className="">
          <span>Sayfa Sayısı:</span>
          <input
            type="text"
            value={pageCount}
            onChange={(e) => setPageCount(e.target.value)}
          />
        </div>

        <div className="">
          <span>Kitap Görseli: <small style={{color:'gray'}}>(url olarak ekleyin!)</small></span>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="">
          <span>Açıklama:</span>
          <textarea
            cols="3"
            rows="5"
            value={description}
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

export default EditPage;

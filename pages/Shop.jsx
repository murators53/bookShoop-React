import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import slider1 from "./../assets/swiper1.jpg";
import slider2 from "./../assets/swiper2.jpg";
import slider3 from "./../assets/swiper3.jpg";

/* TOASTFY */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Swiper styles
import "swiper/css";
import api from "../api/api";
import Cart from "../components/Cart";
import Header from "../components/Header";
import Loading from "../components/Loading";

const Shop = () => {
  const [bookList, setBookList] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const myApi = api();
  useEffect(() => {
    myApi.get("product").then((res) => {
      setBookList(res.data);
    });

    // Sepeti localStorage'dan al
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    // Local storage'dan toplam miktarı al
    const storedTotalQuantity = localStorage.getItem("cartTotal");
    if (storedTotalQuantity) {
      setTotalQuantity(JSON.parse(storedTotalQuantity));
    }
  }, []);

  const handleCart = (product) => {
    console.log("BASTIN", product);

    const findProduct = cart.find((item) => item.id === product.id);
    console.log("findProduct", findProduct);
    if (!findProduct) {
      const newItem = {
        ...product,
        quantity: 1,
      };
      const updatedTotalQuantity = totalQuantity + 1;
      console.log("totalQuantity:", updatedTotalQuantity);
      setTotalQuantity(updatedTotalQuantity);
      setCart([...cart, newItem]);
      localStorage.setItem("cart", JSON.stringify([...cart, newItem]));
      localStorage.setItem("cartTotal", JSON.stringify(updatedTotalQuantity));
    } else {
      findProduct.quantity += 1;
      const updatedTotalQuantity = totalQuantity + 1;
      console.log("totalQuantity:", updatedTotalQuantity);
      setTotalQuantity(updatedTotalQuantity);
      localStorage.setItem("cart", JSON.stringify([...cart]));
      localStorage.setItem("cartTotal", JSON.stringify(updatedTotalQuantity));
    }
    toast("Ürün sepete eklendi!");
  };
  if (!bookList.length) {
    return <Loading />;
  }

  return (
    <>
      <Header totalQuantity={totalQuantity} />
      <div className="shop">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          style={{ height: "500px" }}
        >
          <SwiperSlide>
            <img src={slider1} alt="" />
            <h3>Öğreciler için indirim kampanyası detayl için inceleyiniz</h3>
            <button className="incele">İncele {">"}</button>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider2} alt="" />
            <h3>Öğreciler için indirim kampanyası detayl için inceleyiniz</h3>
            <button className="incele">İncele {">"}</button>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider3} alt="" />
            <h3>Her Türde Kitaplar</h3>
            <button className="incele">İncele {">"}</button>
          </SwiperSlide>
        </Swiper>
        <div className="shop-left">
          <h1>Ürünler</h1>
          <div className="products">
            {bookList.map((item) => {
              return (
                <div className="card" key={item.id}>
                  <img src={item.image} alt="book" />
                  <div className="card-details">
                    <div className="card-details-title">
                      <h5>{item.bookName}</h5>
                      <p>${item.price}</p>
                    </div>
                    <button onClick={() => handleCart(item)}>
                      <i className="fa-solid fa-basket-shopping"></i>
                      <Cart />
                    </button>
                  </div>
                </div>
              );
            })}
            <ToastContainer autoClose={1000} />
          </div>
        </div>
        <div className="shop-right"></div>
      </div>
    </>
  );
};

export default Shop;

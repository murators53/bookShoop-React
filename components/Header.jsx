import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [cart, setCart] = useState([]);

  const [userAdmin, setUserAdmin] = useState(false);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    // Local storage'dan toplam miktarı al
    const storedTotalQuantity = localStorage.getItem("cartTotal");
    if (storedTotalQuantity) {
      setTotalQuantity(JSON.parse(storedTotalQuantity));
    }

    // Sepeti localStorage'dan al
    const storedCart = localStorage.getItem("cart");
    // console.log('storedCart,',storedCart)
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    setUserAdmin(
      // Boolean(Number(localStorage.getItem("userAdmin").split(",")[1]))
    );
    setUserLogin(
      // Boolean(Number(localStorage.getItem("userLogin").split(",")[1]))
    );
  }, [localStorage.getItem("cartTotal"), totalQuantity]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleIncrement = (artacakUrun) => {
    console.log("ARTITLIYOR");

    const filteredCart = cart.find((item) => item.id === artacakUrun.id);
    console.log("filteredCart,", filteredCart);
    filteredCart.quantity += 1;
    console.log("filteredCart,", filteredCart);

    const updatedTotalQuantity = totalQuantity + 1;
    console.log("totalQuantity:", updatedTotalQuantity);
    setTotalQuantity(updatedTotalQuantity);
    localStorage.setItem("cartTotal", JSON.stringify(updatedTotalQuantity));

    localStorage.setItem("cart", JSON.stringify([...cart]));
  };

  const handleDecrement = (azalacakUrun) => {
    const filteredCart = cart.find((item) => item.id === azalacakUrun.id);

    if (filteredCart.quantity === 1) {
      const updatedCart = cart.filter((item) => item.id !== azalacakUrun.id);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      filteredCart.quantity -= 1;
      localStorage.setItem("cart", JSON.stringify([...cart]));
    }

    const updatedTotalQuantity = totalQuantity - 1;
    setTotalQuantity(updatedTotalQuantity);
    localStorage.setItem("cartTotal", JSON.stringify(updatedTotalQuantity));
  };

  const handleDelete = (deletedProduct) => {
    console.log("silinecek urun", deletedProduct);
    // Silinecek ürünü sepetten filtrele
    const filteredCart = cart.filter((item) => item.id !== deletedProduct.id);

    // Toplam miktarı güncelle
    const updatedTotalQuantity = filteredCart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    setTotalQuantity(updatedTotalQuantity);
    localStorage.setItem("cartTotal", JSON.stringify(updatedTotalQuantity));

    // Sepeti güncelle
    setCart(filteredCart);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
  };
  /* console.log(
    "test",userAdmin,
    userAdmin ? (
        localStorage.getItem("userAdmin").split(",")[0]
    ) : userLogin ? (
        localStorage.getItem("userLogin").split(",")[0]
    ) : (
      'Giris'
    )
  ); */
  return (
    <div className="header">
      {/* Header logosu */}
      <div className="header-logo">
        <a href="/">
          Book<b>List</b>
        </a>
      </div>

      {/* Header menüsü */}
      <div className="header-menu">
        <ul>
          <li>
            <Link to="/">Shop</Link>
          </li>
          <li>
            <Link to="/booklist">Booklist</Link>
          </li>
        </ul>
      </div>

      {/* Kullanıcı işlemleri */}
      <div className="header-process">
        {userAdmin ? (
          <Link to="/admin" className="admin">
            {localStorage.getItem("userAdmin").split(",")[0]}
          </Link>
        ) : userLogin ? (
          <Link to="/user" className="user">
            {localStorage.getItem("userLogin").split(",")[0]}
          </Link>
        ) : (
          <Link to="/login" className="login">
            Giriş
          </Link>
        )}

        <button className="count" onClick={handleModalOpen}>
          <img
            src="https://img.icons8.com/?size=1x&id=QVQY51sDgy1I&format=png"
            alt=""
          />
          <span>{totalQuantity}</span>
        </button>
      </div>

      {modalOpen && (
        <div className="modal">
          <i className="fa-solid fa-xmark" onClick={handleModalClose}></i>
          <div className="modals">
            {cart.map((item) => (
              <div className="basket" key={item.id}>
                <img src={item.image} alt="" />
                <div className="basket-details">
                  <h2>{item.bookName}</h2>
                  <span>
                    {item.price}$ X {item.quantity}
                  </span>
                </div>
                <div className="basket-process">
                  <button onClick={() => handleIncrement(item)}>+</button>
                  <button onClick={() => handleDecrement(item)}>-</button>
                </div>
                <p>{(item.price * item.quantity).toFixed(2)}$</p>
                <i
                  className="fa-solid fa-trash"
                  onClick={() => handleDelete(item)}
                ></i>
              </div>
            ))}
            <hr />
            <div className="total">
              <p>Toplam</p>
              <p>
                {cart
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
                $
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("CIKILACAK");
    localStorage.setItem("userLogin", ["", 0]);
    navigate("/"); // Rotala yönlendir
  };

  return (
    <>
      <Header />
      <div className="list">
        <div className="list-process">
          {/* </div> */}
          <button onClick={handleLogout} 
            style={{margin:'auto'}}
          className="list-process-right logout">
            Çıkış Yap
          </button>
        </div>
        
      </div>
    </>
  );
};

export default User;

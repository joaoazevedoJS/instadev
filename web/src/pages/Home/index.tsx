import React from "react";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

import Login from "../Login";

import { getToken } from "../../auth/token";

import Instadev from "../../assets/img/instadev.svg";
import UserPhotoDefault from "../../assets/img/user_photo_default.jpg";

import "./styles.css";

function Home() {
  if (!getToken()) {
    return <Login />;
  }

  return (
    <div className="home-page">
      <header>
        <div className="content">
          <Link to="/">
            <img src={Instadev} alt="instadev" className="logo" />
          </Link>

          <p>instadev</p>

          <div className="user_operations">
            <svg
              aria-label="Direct"
              fill="#262626"
              height="22"
              viewBox="0 0 48 48"
              width="22"
            >
              <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
            </svg>

            <svg
              aria-label="Find People"
              fill="#262626"
              height="22"
              viewBox="0 0 48 48"
              width="22"
            >
              <path
                clip-rule="evenodd"
                d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z"
                fill-rule="evenodd"
              ></path>
            </svg>

            <FiHeart />

            <img src={UserPhotoDefault} alt="user_photo" />
          </div>
        </div>
      </header>

      <main>a</main>
    </div>
  );
}

export default Home;

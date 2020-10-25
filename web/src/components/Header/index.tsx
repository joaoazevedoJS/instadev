import React, { FC } from 'react';
import { FiGlobe, FiHeart, FiHome, FiNavigation, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

import Instadev from "../../assets/img/instadev.svg";
import UserPhotoDefault from "../../assets/img/user_photo_default.jpg";

import './styles.css'

interface HeaderProps {
  selectIcon: string;
}

const Header: FC<HeaderProps> = ({ selectIcon }) => {
  function handleSetClassSelected(icon: string) { 
    if(selectIcon.toLocaleLowerCase() === icon) {
      return 'selected'
    }

    return ''
  }

  return (
    <header className="HeaderComponent">
        <div className="content">
          <Link to="/">
            <img src={Instadev} alt="instadev" className="logo" />
          </Link>

          <div className="search">
            <input type="text" name="search" id="search" />
            <div className="placeholder">
              <FiSearch />
              Search
            </div>
          </div>

          <div className="user_actions">
            <Link to="/">
              <FiHome className={handleSetClassSelected('home')} />
            </Link>
            
            <Link to="/direct">
              <FiNavigation className={handleSetClassSelected('direct')} />
            </Link>

            <Link to="/explore">
              <FiGlobe className={handleSetClassSelected('explore')} />
            </Link>

            
            <FiHeart className={handleSetClassSelected('heart')} />

            <img src={UserPhotoDefault} alt="user_photo" />
          </div>
        </div>
      </header>
  )
}

export default Header
import React from "react";

import Login from "../Login";

import { getToken } from "../../auth/token";

import Header from "../../components/Header";

import "./styles.css";

function Home() {
  if (!getToken()) {
    return <Login />;
  }

  return (
    <div className="home-page">
      <Header selectIcon='explore' />

      <main>a</main>
    </div>
  );
}

export default Home;

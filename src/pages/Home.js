import React, { Fragment, useContext } from "react";
import Header from "../common/Header";
import { GlobalContext } from "../context/GlobalState";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { credentials } = useContext(GlobalContext);
  let history = useHistory();

  const reais = 100;
  const isLogged = localStorage.getItem("login") === credentials;

  if (!isLogged) {
    history.push("/401");
  }

  return (
    <Fragment>
      <Header />
      <div id="home">
        <div>Olá, você tem: R$ {reais},00 para comprar Britas e Bitcoins.</div>
      </div>
    </Fragment>
  );
};

export default Home;

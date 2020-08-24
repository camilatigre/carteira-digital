import React, { Fragment, useContext } from "react";
import Header from "../common/Header";
import { GlobalContext } from "../context/GlobalState";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { credentials } = useContext(GlobalContext);
  let history = useHistory();

  console.log(credentials);

  const isLogged = localStorage.getItem("login") && credentials.login;

  if (!isLogged) {
    history.push("/401");
    return;
  }

  return (
    <Fragment>
      <Header />
      <div id="home">"pagina inicial"</div>
    </Fragment>
  );
};

export default Home;

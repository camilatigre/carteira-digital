import React from "react";
import Header from "../common/Header";
import { Link } from "react-router-dom";
import "../styles/pages/Unauthorized.css";
import Button from "@material-ui/core/Button";

const Unauthorized = () => {
  return (
    <div className="outsideBody">
      <Header whiteLogo={true} />
      <div id="unauthorized">
        <h1>401</h1>
        <p>
          Desculpe não foi possível encontrar seu usuário. Faça o Login
          novamente para continuar suas transações
        </p>

        <Link to="/">
          <Button variant="outlined" className="secondaryButton">
            Fazer login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;

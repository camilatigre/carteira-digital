import React, { Fragment } from "react";
import "../styles/pages/Login.css";
import Header from "../common/Header";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Login = () => {
  return (
    <Fragment>
      <Header whiteLogo={true} />
      <div id="login">
        <div className="container">
          <p>Faça aqui seu login para aproveitar o app!</p>
          <TextField
            className="textField"
            fullWidth
            label="Digite seu E-MAIL"
            type="email"
            required
            variant="outlined"
          />
          <TextField
            className="textField"
            fullWidth
            label="Digite sua SENHA"
            type="password"
            required
            variant="outlined"
          />
          <Button variant="outlined">Quero me cadastrar</Button>
          <Button variant="contained">Entrar</Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;

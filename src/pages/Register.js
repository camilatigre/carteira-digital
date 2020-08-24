import React, { Fragment, useState, useContext } from "react";
import "../styles/common/Forms.css";
import Header from "../common/Header";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { fieldsValidation } from "../utils/validation";
import { GlobalContext } from "../context/GlobalState";

const Register = () => {
  const { saveCredentials } = useContext(GlobalContext);

  const [email, setEmail] = useState({ name: "email", value: "", helper: "" });
  const [password, setPassword] = useState({
    name: "password",
    value: "",
    helper: "",
  });
  const [completeName, setCompleteName] = useState({
    name: "completeName",
    value: "",
    helper: "",
  });

  const [confirmPassword, setConfirmPassword] = useState({
    name: "completeName",
    value: "",
    helper: "",
  });

  const onChange = (evt) => {
    const { name, value } = evt.target;

    console.log(evt.target.value);

    switch (name) {
      case "email":
        setEmail({ name, value, helper: "" });
        break;
      case "password":
        setPassword({ name, value, helper: "" });
        break;
      case "completeName":
        setPassword({ name, value, helper: "" });
        break;
      default:
        return;
    }
  };

  const enterOnApp = () => {
    const notValidFields = fieldsValidation([email, password]);

    if (notValidFields.length > 0) {
      notValidFields.forEach((field) => {
        if (field.name === "email") {
          setEmail(field);
        }

        if (field.name === "password") {
          setPassword(field);
        }

        if (field.name === "completeName") {
          setCompleteName(field);
        }

        if (field.name === "confirmPassword") {
          setConfirmPassword(field);
        }
      });
      return;
    }

    const hasSomeoneLoggedIn = localStorage.getItem("login");

    if (hasSomeoneLoggedIn) {
      localStorage.clear();
      localStorage.setItem("login", email.value);
      saveCredentials({ login: email.value });
      console.log(this.props);
      return;
    }
  };

  return (
    <Fragment>
      <Header whiteLogo={true} />
      <div id="form">
        <div className="container">
          <p className="paragraphGreen" align="center">
            Faça seu cadastro e ganhe: <span>R$ 100.000,00</span> para gastar
            com Britas e Bitcoins!
          </p>
          <TextField
            className="textField"
            fullWidth
            label="Digite seu NOME"
            type="completeName"
            name="completeName"
            required
            variant="outlined"
            onChange={onChange}
            helperText={completeName["helper"]}
            value={completeName["value"]}
          />
          <TextField
            className="textField"
            fullWidth
            label="Digite seu E-MAIL"
            type="email"
            name="email"
            required
            variant="outlined"
            onChange={onChange}
            helperText={email["helper"] || ""}
            value={email["value"]}
          />
          <TextField
            className="textField"
            fullWidth
            label="Digite sua SENHA"
            type="password"
            name="password"
            required
            variant="outlined"
            onChange={onChange}
            helperText={password["helper"]}
            value={password["value"]}
          />
          <TextField
            className="textField"
            fullWidth
            label="Digite a confirmação de SENHA"
            type="password"
            name="confirmPassword"
            required
            variant="outlined"
            onChange={onChange}
            helperText={confirmPassword["helper"]}
            value={confirmPassword["value"]}
          />
          <div className="buttonContainer">
            <Link to="/">
              <Button variant="outlined" className="secondaryButton">
                Voltar para login
              </Button>
            </Link>
            <Button
              onClick={enterOnApp}
              variant="contained"
              className="primaryButton"
            >
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;

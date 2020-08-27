import React, { useState } from 'react';
import '../styles/common/Forms.css';
import Header from '../common/Header';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import { fieldsValidation } from '../utils/validation';

const Login = () => {
  let history = useHistory();

  const [email, setEmail] = useState({ name: 'email', value: '', helper: '' });
  const [password, setPassword] = useState({
    name: 'password',
    value: '',
    helper: '',
  });

  const onChange = (evt) => {
    const { name, value } = evt.target;

    switch (name) {
      case 'email':
        setEmail({ name, value, helper: '' });
        break;
      case 'password':
        setPassword({ name, value, helper: '' });
        break;
      default:
        return;
    }
  };

  const enterOnApp = () => {
    const notValidFields = fieldsValidation([email, password]);

    if (notValidFields.length > 0) {
      notValidFields.forEach((field) => {
        if (field.name === 'email') {
          setEmail(field);
        }

        if (field.name === 'password') {
          setPassword(field);
        }
      });
      return;
    }

    const hasSomeoneLoggedIn = localStorage.getItem('login') !== '';

    if (hasSomeoneLoggedIn) {
      localStorage.clear();
    }

    localStorage.setItem('login', email.value);
    history.push('/home');
  };

  return (
    <div className="outsideBody">
      <Header whiteLogo={true} />
      <div id="form">
        <div className="container">
          <p className="paragraphGreen" align="center">
            Faça aqui seu login para começar suas transações!
          </p>
          <TextField
            className="textField"
            fullWidth
            label="Digite seu E-MAIL"
            type="email"
            name="email"
            required
            variant="outlined"
            onChange={onChange}
            helperText={email['helper']}
            value={email['value']}
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
            helperText={password['helper']}
            value={password['value']}
          />
          <div className="buttonContainer">
            <Link to="/register">
              <Button variant="outlined" className="secondaryButton">
                Quero me cadastrar
              </Button>
            </Link>
            <Button onClick={enterOnApp} variant="contained" className="primaryButton">
              Entrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useContext, useEffect, useState } from "react";
import Header from "../common/Header";
// import { GlobalContext } from "../common/context/GlobalState";
import { useHistory } from "react-router-dom";
import "../styles/common/InternalPages.css";
import { getToday } from "../utils/dates";
import TradeIcon from "@material-ui/icons/SyncAlt";
import BuyIcon from "@material-ui/icons/CallMade";
import SellIcon from "@material-ui/icons/CallReceived";
import Button from "@material-ui/core/Button";

const Home = () => {
  let { today, priceDate } = getToday();
  const uriBitcoins = "https://www.mercadobitcoin.net/api/BTC/ticker/";
  const uriBrita = decodeURI(
    `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?%40dataInicial=%27${priceDate}%27&%40dataFinalCotacao=%27${priceDate}%27&%24format=json`
  );
  // const { credentials } = useContext(GlobalContext);
  const [bitcoin, setBitcoin] = useState({ buy: 0, sell: 0, amount: 0 });
  const [brita, setBrita] = useState({ buy: 0, sell: 0, amount: 0 });
  const [reais, setReais] = useState({ amount: 100000 });

  let history = useHistory();

  // const isLogged = localStorage.getItem("login") === credentials;

  // if (!isLogged) {
  //   history.push("/401");
  // }

  useEffect(() => {
    fetch(uriBitcoins, {
      method: "GET",
      headers: [["Content-Type", "application/json"]],
    }).then((res) =>
      res
        .json()
        .then(({ ticker }) =>
          setBitcoin({
            buy: parseFloat(ticker.buy).toFixed(2),
            sell: parseFloat(ticker.sell).toFixed(2),
            amount: bitcoin.amount,
          })
        )
    );

    fetch(uriBrita, {
      method: "GET",
      headers: [["Content-Type", "application/json"]],
    }).then((res) =>
      res.json().then(({ value }) => {
        const buyCost = parseFloat(value[0].cotacaoCompra).toFixed(2);
        const sellCost = parseFloat(value[0].cotacaoVenda).toFixed(2);
        setBrita({ buy: buyCost, sell: sellCost, amount: brita.amount });
      })
    );
  }, []);

  return (
    <div className="internalBody">
      <Header />
      <div id="internalPages" className="home">
        <div className="info">
          <div className="container">
            <h3>Olá, {"email@exemplo.com"},</h3>
            <div className="balance">
              <p>seu saldo disponível é:</p>
              <h2>{`R$ ${reais.amount},00`}</h2>

              <h4>Bitcoins: $ {bitcoin.amount}</h4>
              <h4>Britas: $ {brita.amount}</h4>
            </div>
            <div className="actions">
              <Button
                variant="outlined"
                className="secondaryButton"
                startIcon={<BuyIcon />}
              >
                Comprar Moedas
              </Button>

              <Button
                variant="outlined"
                className="secondaryButton"
                startIcon={<TradeIcon />}
              >
                Trocar Moedas
              </Button>

              <Button
                variant="outlined"
                className="secondaryButton"
                startIcon={<SellIcon />}
              >
                Vender Moedas
              </Button>
            </div>
          </div>
          <div className="container prices">
            <h3>Cotações para: {today}</h3>
            <ul>
              <li>
                <h4>Bitcoin</h4>
                <p>
                  Venda: <b>$ {bitcoin.sell}</b>
                  <br />
                  Compra: <b>$ {bitcoin.buy}</b>
                </p>
              </li>
              <li>
                <h4>Brita</h4>
                <p>
                  Venda: <b>$ {brita.sell}</b>
                  <br />
                  Compra: <b>$ {brita.buy}</b>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="container statement">
          <h3>Extrato de Transações</h3>
          {[
            {
              type: "trade",
              from: "bitcoin",
              to: "brita",
              bitCoins: 0,
              britaCoins: 10,
            },
          ].map((transaction) => {})}
        </div>
      </div>
    </div>
  );
};

export default Home;

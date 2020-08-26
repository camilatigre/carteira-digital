import React, { useContext, useEffect, useState } from "react";
import Header from "../../common/Header";
import { GlobalContext } from "../../common/context/GlobalState";
import { useHistory } from "react-router-dom";
import "../../styles/common/InternalPages.css";
import { getToday } from "../../utils/dates";
import Transactions from "./Transactions";
import Actions from "./Actions";
import Prices from "./Prices";

const Home = () => {
  let { today, priceDate } = getToday();
  const uriBitcoins = "https://www.mercadobitcoin.net/api/BTC/ticker/";
  const uriBrita = decodeURI(
    `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?%40dataInicial=%27${priceDate}%27&%40dataFinalCotacao=%27${priceDate}%27&%24format=json`
  );
  const { credentials } = useContext(GlobalContext);
  const [bitcoin, setBitcoin] = useState({ buy: 0, sell: 0, amount: 0 });
  const [brita, setBrita] = useState({ buy: 0, sell: 0, amount: 0 });
  const [reais, setReais] = useState({ amount: 100000 });
  const [transactions, setTransactions] = useState([
    {
      type: "buy",
      exchangedFrom: "reais",
      exchangedTo: "bitcoin",
      bitcoin: 10,
      brita: 0,
    },
    {
      type: "trade",
      exchangedFrom: "bitcoin",
      exchangedTo: "brita",
      bitcoin: 10,
      brita: 5,
    },
  ]);

  let history = useHistory();

  const isLogged = localStorage.getItem("login") === credentials;

  // if (!isLogged) {
  //   history.push("/401");
  //   return
  // }

  useEffect(() => {
    fetch(uriBitcoins, {
      method: "GET",
      headers: [["Content-Type", "application/json"]],
    }).then((res) =>
      res.json().then(({ ticker }) =>
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
        const buyCost = value[0]
          ? parseFloat(value[0].cotacaoCompra).toFixed(2)
          : 0;
        const sellCost = value[0]
          ? parseFloat(value[0].cotacaoVenda).toFixed(2)
          : 0;
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
            <Actions />
          </div>
          <Prices coins={{ bitcoin, brita }} today={today} />
        </div>
        <div className="container statement">
          <h3>Extrato de Transações</h3>
          {transactions.length > 0
            ? transactions.map((transaction, key) => (
                <div key={key}>
                  <Transactions line={transaction} />
                </div>
              ))
            : "Você ainda não realizou transações"}
        </div>
      </div>
    </div>
  );
};

export default Home;

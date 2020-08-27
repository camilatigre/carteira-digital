import React, { useEffect } from 'react';
import Header from '../../common/Header';
import { useGlobalState, useDispatch } from '../../common/context/GlobalState';
import { useHistory } from 'react-router-dom';
import '../../styles/common/InternalPages.css';
import { getToday } from '../../utils/dates';
import Transactions from './Transactions';
import Actions from './Actions';
import Prices from './Prices';
import { setCoins } from '../../common/context/AppActions';

const Home = () => {
  let { today, priceDate } = getToday();

  const { coins } = useGlobalState();
  const dispatch = useDispatch();

  useEffect(() => {
    const uriBitcoins = 'https://www.mercadobitcoin.net/api/BTC/ticker/';
    const uriBrita = decodeURI(
      `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?%40dataInicial=%27${priceDate}%27&%40dataFinalCotacao=%27${priceDate}%27&%24format=json`,
    );

    fetch(uriBitcoins, {
      method: 'GET',
      headers: [['Content-Type', 'application/json']],
    }).then((res) =>
      res.json().then(({ ticker }) =>
        setCoins(dispatch, {
          type: 'bitcoins',
          buy: parseFloat(ticker.buy).toFixed(2),
          sell: parseFloat(ticker.sell).toFixed(2),
          amount: coins.bitcoins.amount,
        }),
      ),
    );

    fetch(uriBrita, {
      method: 'GET',
      headers: [['Content-Type', 'application/json']],
    }).then((res) =>
      res.json().then(({ value }) => {
        const buyCost = value[0] ? parseFloat(value[0].cotacaoCompra).toFixed(2) : 5.57;
        const sellCost = value[0] ? parseFloat(value[0].cotacaoVenda).toFixed(2) : 5.57;
        setCoins(dispatch, {
          type: 'brita',
          buy: buyCost,
          sell: sellCost,
          amount: coins.brita.amount,
        });
      }),
    );
  }, []);

  let history = useHistory();

  const isLogged = localStorage.getItem('login') !== '';

  if (!isLogged) {
    history.push('/401');
    return;
  }

  return (
    <div className="internalBody">
      <Header />
      <div id="internalPages" className="home">
        <div className="info">
          <div className="container">
            <h3>Olá, {'email@exemplo.com'},</h3>
            <div className="balance">
              <p>seu saldo disponível é:</p>
              <h2>{`R$ ${coins.reais.amount},00`}</h2>
              <h4>Bitcoins: $ {coins.bitcoins.amount}</h4>
              <h4>Britas: $ {coins.brita.amount}</h4>
            </div>
            <Actions />
          </div>
          <Prices today={today} />
        </div>
        <div className="container statement">
          <h3>Extrato de Transações</h3>
          <Transactions />
        </div>
      </div>
    </div>
  );
};

export default Home;

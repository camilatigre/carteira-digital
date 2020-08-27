import React from 'react';
import PropTypes from 'prop-types';
import { useGlobalState } from '../../common/context/GlobalState';
const Prices = ({ today }) => {
  const { coins } = useGlobalState();

  const { bitcoins, brita } = coins;

  return (
    <div className="container prices">
      <h3>Cotações para: {today}</h3>
      <ul>
        <li>
          <h4>Bitcoins</h4>
          <p>
            Venda: <b>$ {bitcoins.sell}</b>
            <br />
            Compra: <b>$ {bitcoins.buy}</b>
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
  );
};

Prices.propTypes = {
  today: PropTypes.string.isRequired,
};

export default Prices;

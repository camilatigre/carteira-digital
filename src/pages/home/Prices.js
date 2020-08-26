import React from "react";

const Prices = ({ coins, today }) => {
  const { bitcoin, brita } = coins;
  return (
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
  );
};

export default Prices;

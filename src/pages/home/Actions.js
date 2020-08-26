import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getOptionsByActionSelected } from "../../utils/filters";
import "../../styles/pages/Home.css";
import TextField from "@material-ui/core/TextField";
import TradeIcon from "@material-ui/icons/SyncAlt";
import BuyIcon from "@material-ui/icons/CallMade";
import SellIcon from "@material-ui/icons/CallReceived";

const Actions = () => {
  const termByAction = {
    buy: "Comprar",
    trade: "Trocar",
    sell: "Vender",
  };

  const [exchangeFrom, setExchangeFrom] = useState("R$: Reais");
  const [exchangeTo, setExchangeTo] = useState("฿: BitCoin");
  const [actionSelected, setActionSelected] = useState("buy");

  const { optionsExchangeFrom, optionsExchangeTo } = getOptionsByActionSelected(
    actionSelected,
    exchangeFrom,
    exchangeTo
  );

  const onChange = (evt) => {
    const { name, value } = evt.target;

    switch (name) {
      case "exchangeFrom":
        setExchangeFrom(value);
        break;
      case "exchangeTo":
        setExchangeTo(value);
        break;
      default:
        return;
    }
  };

  const onSelectAction = (type) => {
    setActionSelected(type);
  };

  return (
    <div className="actionBox">
      <div className="actions">
        <Button
          variant="outlined"
          className={
            actionSelected === "buy" ? "actionSelected" : "secondaryButton"
          }
          startIcon={<BuyIcon />}
          onClick={() => onSelectAction("buy")}
        >
          Comprar Moedas
        </Button>

        <Button
          variant="outlined"
          className={
            actionSelected === "trade" ? "actionSelected" : "secondaryButton"
          }
          startIcon={<TradeIcon />}
          onClick={() => onSelectAction("trade")}
        >
          Trocar Moedas
        </Button>

        <Button
          variant="outlined"
          className={
            actionSelected === "sell" ? "actionSelected" : "secondaryButton"
          }
          startIcon={<SellIcon />}
          onClick={() => onSelectAction("sell")}
        >
          Vender Moedas
        </Button>
      </div>
      <div className="coinGroup">
        <FormControl className="select" variant="outlined">
          <InputLabel htmlFor="exchangeFrom">Escolha moeda a enviar</InputLabel>
          <Select
            native
            name="exchangeFrom"
            value={exchangeFrom}
            onChange={onChange}
            label="Age"
            inputProps={{
              name: "exchangeFrom",
              id: "exchangeFrom",
            }}
          >
            <option arial-label="vazio" value=""></option>
            {optionsExchangeFrom.map((option, key) => (
              <option key={key} aria-label={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormControl>
        <TextField
          className="textField"
          fullWidth
          label={`Digite a quantidade desejada de: ${exchangeFrom}.`}
          type="text"
          name="valueToExchange"
          required
          variant="outlined"
          onChange={onChange}
          value={10}
        />
      </div>
      <div className="coinGroup">
        <FormControl className="select" variant="outlined">
          <InputLabel htmlFor="exchangeTo">Escolha moeda a receber</InputLabel>
          <Select
            native
            name="exchangeTo"
            value={exchangeTo}
            onChange={onChange}
            label="Escolha segunda moeda"
            inputProps={{
              name: "exchangeTo",
              id: "exchangeTo",
            }}
          >
            <option arial-label="vazio" value=""></option>
            {optionsExchangeTo.map((option, key) => (
              <option key={key} aria-label={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormControl>

        <TextField
          className="textField"
          fullWidth
          label={`Digite a quantidade desejada de: ${exchangeTo}.`}
          type="text"
          name="valueToExchange"
          required
          variant="outlined"
          onChange={onChange}
          value={10}
        />
      </div>

      <Button variant="outlined" className="secondaryButton lastActionButton">
        {termByAction[actionSelected]}
      </Button>
    </div>
  );
};

export default Actions;

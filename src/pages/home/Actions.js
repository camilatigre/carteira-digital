import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getOptionsByActionSelected } from '../../utils/filters';
import '../../styles/pages/Home.css';
import TextField from '@material-ui/core/TextField';
import TradeIcon from '@material-ui/icons/SyncAlt';
import BuyIcon from '@material-ui/icons/CallMade';
import SellIcon from '@material-ui/icons/CallReceived';
import { makeTransaction, updateCoinsAmount } from '../../common/context/AppActions';
import { useDispatch, useGlobalState } from '../../common/context/GlobalState';

const termByAction = {
  buy: 'Comprar',
  trade: 'Trocar',
  sell: 'Vender',
};

const mapCoins = {
  'R$: Reais': 'reais',
  '฿: BitCoin': 'bitcoins',
  '$: Brita': 'brita',
};

const Actions = () => {
  const { coins } = useGlobalState();
  const dispatch = useDispatch();

  const [exchangeFrom, setExchangeFrom] = useState('R$: Reais');
  const [exchangeTo, setExchangeTo] = useState('฿: BitCoin');
  const [exchangeFromValue, setExchangeFromValue] = useState(0);
  const [exchangeToValue, setExchangeToValue] = useState(0);
  const [actionSelected, setActionSelected] = useState('buy');
  const [currentField, setCurrentField] = useState('');

  const { optionsExchangeFrom, optionsExchangeTo } = getOptionsByActionSelected(
    actionSelected,
    exchangeFrom,
    exchangeTo,
  );

  const from = mapCoins[exchangeFrom];
  const to = mapCoins[exchangeTo];

  const onChange = (evt) => {
    const { name, value } = evt.target;

    switch (name) {
      case 'exchangeFrom':
        setExchangeFrom(value);
        break;
      case 'exchangeFromValue':
        setExchangeFromValue(value);
        break;
      case 'exchangeTo':
        setExchangeTo(value);
        break;
      case 'exchangeToValue':
        setExchangeToValue(value);
        break;
      default:
        return;
    }
  };

  const onKeyUp = (name) => () => {
    setCurrentField(name);
  };

  useEffect(() => {
    if (currentField === 'exchangeToValue' && actionSelected === 'buy') {
      setExchangeFromValue(exchangeToValue * coins[to]['buy']);
    }

    if (currentField === 'exchangeToValue' && actionSelected === 'sell') {
      setExchangeFromValue(exchangeToValue * coins[to]['sell']);
    }

    if (currentField === 'exchangeToValue' && actionSelected === 'trade') {
      setExchangeFromValue((exchangeToValue * coins[to]['sell']) / coins[from]['buy']);
    }

    // eslint-disable-next-line
  }, [exchangeToValue]);

  useEffect(() => {
    if (currentField === 'exchangeFromValue' && actionSelected === 'buy') {
      setExchangeToValue(exchangeFromValue / coins[to]['buy']);
    }

    if (currentField === 'exchangeFromValue' && actionSelected === 'sell') {
      setExchangeToValue(exchangeFromValue * coins[from]['sell']);
    }

    if (currentField === 'exchangeFromValue' && actionSelected === 'trade') {
      setExchangeToValue((exchangeFromValue * coins[from]['sell']) / coins[to]['buy']);
    }
    // eslint-disable-next-line
  }, [exchangeFromValue]);

  const updateTransactionAndCoins = (newTransactionValue, amountFrom, amountTo) => {
    updateCoinsAmount(
      dispatch,
      {
        typeFrom: from,
        amountFrom,
      },
      {
        typeTo: to,
        amountTo,
      },
    );

    makeTransaction(dispatch, newTransactionValue);
  };

  const handleMakeTransaction = () => {
    let amountFrom = coins[from]['amount'];
    let amountTo = coins[to]['amount'];
    let fromValueFloat = parseFloat(exchangeFromValue);
    let toValueFloat = parseFloat(exchangeToValue);

    let transaction = {
      type: actionSelected,
      from,
      to,
      amountFrom,
      amountTo,
    };

    switch (actionSelected) {
      case 'buy':
      case 'sell':
      case 'trade': {
        transaction.amountFrom = coins[from]['amount'] - fromValueFloat;
        transaction.amountTo = coins[to]['amount'] + toValueFloat;
        updateTransactionAndCoins(transaction, transaction.amountFrom, transaction.amountTo);

        return;
      }
      default:
        return '';
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
          className={actionSelected === 'buy' ? 'actionSelected' : 'secondaryButton'}
          startIcon={<BuyIcon />}
          onClick={() => onSelectAction('buy')}
        >
          Comprar Moedas
        </Button>

        <Button
          variant="outlined"
          className={actionSelected === 'trade' ? 'actionSelected' : 'secondaryButton'}
          startIcon={<TradeIcon />}
          onClick={() => onSelectAction('trade')}
        >
          Trocar Moedas
        </Button>

        <Button
          variant="outlined"
          className={actionSelected === 'sell' ? 'actionSelected' : 'secondaryButton'}
          startIcon={<SellIcon />}
          onClick={() => onSelectAction('sell')}
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
              name: 'exchangeFrom',
              id: 'exchangeFrom',
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
          onKeyUp={onKeyUp('exchangeFromValue')}
          fullWidth
          label={`Digite a quantidade desejada de: ${exchangeFrom}.`}
          type="number"
          name="exchangeFromValue"
          required
          variant="outlined"
          onChange={onChange}
          value={exchangeFromValue}
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
              name: 'exchangeTo',
              id: 'exchangeTo',
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
          onKeyUp={onKeyUp('exchangeToValue')}
          fullWidth
          label={`Digite a quantidade desejada de: ${exchangeTo}.`}
          type="number"
          name="exchangeToValue"
          required
          variant="outlined"
          onChange={onChange}
          value={exchangeToValue}
        />
      </div>

      <Button
        disabled={coins.reais.amount === 0 && actionSelected === 'buy'}
        onClick={handleMakeTransaction}
        variant="outlined"
        className="secondaryButton lastActionButton"
      >
        {termByAction[actionSelected]}
      </Button>
    </div>
  );
};

export default Actions;

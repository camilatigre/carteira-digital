import React from 'react';
import '../../styles/pages/Home.css';
import TradeIcon from '@material-ui/icons/SyncAlt';
import BuyIcon from '@material-ui/icons/CallMade';
import SellIcon from '@material-ui/icons/CallReceived';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useGlobalState } from '../../common/context/GlobalState';

const Transactions = () => {
  const { transactions } = useGlobalState();

  const listItemTextByActionType = (transaction) => {
    const { type, from, to, amountFrom, amountTo } = transaction;

    switch (type) {
      case 'buy':
        return `Você comprou ${to}. Seu saldo de ${to} agora é: ${to === 'bitcoin' ? amountFrom : amountTo}`;
      case 'sell':
        return `Você vendeu ${to}.Seu saldo de ${to} agora é: ${to === 'bitcoin' ? amountFrom : amountTo}`;
      case 'trade':
        return `Você trocou ${from} por ${to}. Seu saldo de ${to} agora é: ${to === 'bitcoin' ? amountFrom : amountTo}`;

      default:
        return '';
    }
  };

  const iconByActionType = {
    buy: <BuyIcon />,
    sell: <SellIcon />,
    trade: <TradeIcon />,
  };

  return (
    <div className="transactions">
      {transactions.map((transaction, key) => {
        return (
          <div key={key} className="line">
            <ListItem>
              <ListItemIcon>{iconByActionType[transaction.type]}</ListItemIcon>
              <ListItemText primary={listItemTextByActionType(transaction)} />
            </ListItem>
          </div>
        );
      })}
    </div>
  );
};

export default Transactions;

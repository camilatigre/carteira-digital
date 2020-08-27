import React, { useEffect } from "react";
import "../../styles/pages/Home.css";
import TradeIcon from "@material-ui/icons/SyncAlt";
import BuyIcon from "@material-ui/icons/CallMade";
import SellIcon from "@material-ui/icons/CallReceived";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useGlobalState } from "../../common/context/GlobalState";
import transitions from "@material-ui/core/styles/transitions";

const Transactions = () => {
  const { transactions } = useGlobalState();

  const listItemTextByActionType = (transaction) => {
    const { type, exchangedFrom, exchangedTo, bitcoin, brita } = transaction;

    switch (type) {
      case "buy":
        return `Você comprou ${exchangedTo}. Seu saldo de ${exchangedTo} agora é: ${
          exchangedTo === "bitcoin" ? bitcoin : brita
        }`;
      case "sell":
        return `Você vendeu ${exchangedTo}.Seu saldo de ${exchangedTo} agora é: ${
          exchangedTo === "bitcoin" ? bitcoin : brita
        }`;
      case "trade":
        return `Você trocou ${exchangedFrom} por ${exchangedTo}. Seu saldo de ${exchangedTo} agora é: ${
          exchangedTo === "bitcoin" ? bitcoin : brita
        }`;

      default:
        return "";
    }
  };

  const iconByActionType = {
    buy: <BuyIcon />,
    sell: <SellIcon />,
    trade: <TradeIcon />,
  };

  console.log(transactions);

  return (
    <div className="transactions">
      {transactions.map((transaction, key) => {
        return (
          <div className="line">
            <ListItem key={key}>
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

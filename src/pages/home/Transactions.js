import React from "react";
import "../../styles/pages/Home.css";
import TradeIcon from "@material-ui/icons/SyncAlt";
import BuyIcon from "@material-ui/icons/CallMade";
import SellIcon from "@material-ui/icons/CallReceived";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const Transactions = ({ key, line }) => {
  const { type, exchangedFrom, exchangedTo, bitcoin, brita } = line;

  const listItemTextByActionType = {
    buy: `Você comprou ${exchangedTo}. Seu saldo de ${exchangedTo} agora é: ${
      exchangedTo === "bitcoin" ? bitcoin : brita
    }`,
    sell: `Você vendeu ${exchangedTo}.Seu saldo de ${exchangedTo} agora é: ${
      exchangedTo === "bitcoin" ? bitcoin : brita
    }`,
    trade: `Você trocou ${exchangedFrom} por ${exchangedTo}. Seu saldo de ${exchangedTo} agora é: ${
      exchangedTo === "bitcoin" ? bitcoin : brita
    }`,
  };

  const iconByActionType = {
    buy: <BuyIcon />,
    sell: <SellIcon />,
    trade: <TradeIcon />,
  };

  return (
    <div className="transactions">
      <div className="line">
        <ListItem key={key}>
          <ListItemIcon>{iconByActionType[type]}</ListItemIcon>
          <ListItemText primary={listItemTextByActionType[type]} />
        </ListItem>
      </div>
    </div>
  );
};

export default Transactions;

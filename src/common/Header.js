import React from "react";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import "../styles/common/Header.css";

const Header = ({ showName = true, whiteLogo = false }) => {
  const iconClass = whiteLogo ? "logoIcon white" : "logoIcon";
  const nameClass = whiteLogo ? "logoName white" : "logoName";

  if (showName) {
    return (
      <div id="header">
        <div className="logoWithName">
          <AccountBalanceWalletIcon className={iconClass} />
          <span className={nameClass}>Carteira Digital</span>
        </div>
      </div>
    );
  }
  return <AccountBalanceWalletIcon className={iconClass} />;
};

export default Header;

import React from 'react';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import '../styles/common/Header.css';
import PropTypes from 'prop-types';

const Header = ({ whiteLogo = false }) => {
  const iconClass = whiteLogo ? 'logoIcon white' : 'logoIcon';
  const nameClass = whiteLogo ? 'logoName white' : 'logoName';

  return (
    <div id="header">
      <div className="logoWithName">
        <AccountBalanceWalletIcon className={iconClass} />
        <span className={nameClass}>Carteira Digital</span>
      </div>
    </div>
  );
};

Header.propTypes = {
  whiteLogo: PropTypes.bool,
};

export default Header;

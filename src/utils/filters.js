export const getOptionsByActionSelected = (action, exchangedFrom, exchangeTo) => {
  let optionsExchangeFrom = ['R$: Reais', '฿: BitCoin', '$: Brita'];
  let optionsExchangeTo = ['R$: Reais', '฿: BitCoin', '$: Brita'];
  let excludingReaisTo = getOptionsExcludingSome(optionsExchangeTo, optionsExchangeTo[0]);
  let excludingReaisFrom = getOptionsExcludingSome(optionsExchangeFrom, optionsExchangeTo[0]);
  let onlyReaisFrom = getEspecificOption(optionsExchangeTo, optionsExchangeTo[0]);

  if (action === 'trade') {
    optionsExchangeFrom = excludingReaisFrom;
    optionsExchangeTo = excludingReaisTo;
  }

  if (action === 'buy') {
    optionsExchangeFrom = onlyReaisFrom;
    optionsExchangeTo = excludingReaisTo;
  }

  if (action === 'sell') {
    optionsExchangeFrom = excludingReaisFrom;
    optionsExchangeTo = ['R$: Reais'];
  }

  return { optionsExchangeFrom, optionsExchangeTo };
};

const getOptionsExcludingSome = (options, optionToExclude) => {
  return options.filter((option) => option !== optionToExclude);
};

const getEspecificOption = (options, onlyOption) => {
  return options.filter((option) => option === onlyOption);
};

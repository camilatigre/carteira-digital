export const fieldsValidation = (fields) => {
  let validFields = [];

  for (let field in fields) {
    let currentField = fields[field];
    let helper = fieldsRulesByName(currentField);

    currentField = {
      name: currentField.name,
      value: currentField.value,
      helper,
    };

    if (currentField.helper !== "") {
      validFields.push(currentField);
    }
  }

  return validFields;
};

const fieldsRulesByName = (field) => {
  if (field.name === "email") {
    return emailRulesToValidation(field.value);
  }

  if (field.name === "password") {
    return passwordRulesToValidation(field.value);
  }

  if (field.name === "completeName") {
    return completeNameRulesToValidation(field.value);
  }
};

const emailRulesToValidation = (value) => {
  if (value === "") {
    return "Favor digitar um e-mail.";
  }

  let regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!regex.test(String(value).toLocaleLowerCase())) {
    return "Favor digitar um e-mail válido.";
  }

  return "";
};

const passwordRulesToValidation = (value) => {
  if (value === "") {
    return "Favor digitar uma senha.";
  }

  if (value.length === 3) {
    return "Sua senha precisa ter pelo menos 4 caracteres";
  }

  return "";
};

const completeNameRulesToValidation = (value) => {
  if (value === "") {
    return "Favor digitar uma nome.";
  }

  return "";
};

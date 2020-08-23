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

  console.log(validFields);

  return validFields;
};

const fieldsRulesByName = (field) => {
  if (field.name === "email") {
    return emailRulesToValidation(field.value);
  }

  if (field.name === "password") {
    return passwordRulesToValidation(field.value);
  }
};

const emailRulesToValidation = (value) => {
  if (value === "") {
    return "Favor digitar um e-mail.";
  }

  // let regex = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i);

  // if (!regex.test(value)) {
  //   return "Favor digitar um e-mail válido.";
  // }

  return "";
};

const passwordRulesToValidation = (value) => {
  if (value === "") {
    return "Favor digitar uma senha.";
  }

  return "";
};

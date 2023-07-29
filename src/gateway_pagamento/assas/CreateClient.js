const dotenv = require("dotenv");

dotenv.config();
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const createUser = async (user) => {
  const url = "https://www.asaas.com/api/v3/customers";
  const accessToken = process.env.TEST;
  console.log("acesstoken chegando =>> precisa mudar", accessToken);

  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("access_token", accessToken);

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          const response = JSON.parse(this.responseText);
          resolve(response);
        } else {
          const error = new Error(
            `Error creating user: [${this.status}] ${this.responseText}`,
          );
          reject(error);
        }
      }
    };

    request.send(JSON.stringify(user));
  });
};

// Exemplo de uso
const user = {
  name: "Marcelo Almeida",
  email: "marcelo.almeida@gmail.com",
  phone: "4738010919",
  mobilePhone: "4799376637",
  cpfCnpj: "24971563792",
  postalCode: "01310-000",
  address: "Av. Paulista",
  addressNumber: "150",
  complement: "Sala 201",
  province: "Centro",
  externalReference: "12987382",
  notificationDisabled: false,
  additionalEmails: "marcelo.almeida2@gmail.com,marcelo.almeida3@gmail.com",
  municipalInscription: "46683695908",
  stateInscription: "646681195275",
  observations: "ótimo pagador, nenhum problema até o momento",
};

createUser(user)
  .then((response) => {
    console.log("User created successfully:", response);
  })
  .catch((error) => {
    console.error("Error creating user:", error);
  });

const dotenv = require("dotenv");
const request = require("request");
const fetch = require("node-fetch");

// Configuração inicial e basica para funcionar a API do ASSAS
dotenv.config();
const ACESS_TOKEN = process.env.SUA_CHAVE_API;
/* const URL_BASE = (process.env.URL_SANDBOX += "/api/v3/payments"); */
const CONTENT_TYPE_DO_HEADER = `Content-Type": "application/json`;

// Controller da aplicação
class A_InvoicesController {
  async create(req, res) {
    try {
      const {
        customer,
        billingType,
        dueDate,
        value,
        description,
        externalReference,
        discount,
        fine,
        interest,
        postalService,
      } = req.body;

      const responseAsaasInvoices = await fetch(
        (process.env.URL_SANDBOX += "/api/v3/payments"),
        {
          method: "POST",
          followOriginalHttpMethod: true,
          followRedirect: true,
          followAllRedirects: true,
          headers: {
            CONTENT_TYPE_DO_HEADER,
            access_token: ACESS_TOKEN,
          },
          body: JSON.stringify({
            customer,
            billingType,
            dueDate,
            value,
            description,
            externalReference,
            discount,
            fine,
            interest,
            postalService,
          }),
        },
      );

      console.log("ASAS RETORNO =>>", responseAsaasInvoices);

      if (!responseAsaasInvoices.ok) {
        throw new Error(
          `Erro na requisição Asaas: ${responseAsaasInvoices.status}`,
        );
      }

      const responseDataInvoice = await responseAsaasInvoices.text();
      const data = responseDataInvoice ? JSON.parse(responseDataInvoice) : null;

      return res.json(data);
    } catch (error) {
      console.error("Erro na requisição Asaas:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async createCreditCard(req, res) {
    try {
      const {
        customer,
        billingType,
        dueDate,
        value,
        description,
        externalReference,
        creditCard,
        creditCardHolderInfo,
        creditCardToken,
        remoteIp,
      } = req.body;

      const requestBody = {
        customer,
        billingType,
        dueDate,
        value,
        description,
        externalReference,
        creditCard: {
          holderName: creditCard.holderName,
          number: creditCard.number,
          expiryMonth: creditCard.expiryMonth,
          expiryYear: creditCard.expiryYear,
          ccv: creditCard.ccv,
        },
        creditCardHolderInfo,
        creditCardToken,
        remoteIp,
      };

      const responseAsaasInvoices = await fetch(
        (process.env.URL_SANDBOX += "/api/v3/payments"),
        {
          method: "POST",
          followOriginalHttpMethod: true,
          followRedirect: true,
          followAllRedirects: true,
          headers: {
            CONTENT_TYPE_DO_HEADER,
            access_token: ACESS_TOKEN,
          },
          body: JSON.stringify(requestBody),
        },
      );

      console.log("ASAS RETORNO =>>", responseAsaasInvoices);

      if (!responseAsaasInvoices.ok) {
        throw new Error(
          `Erro na requisição Asaas: ${responseAsaasInvoices.status}`,
        );
      }

      const responseDataInvoice = await responseAsaasInvoices.text();
      const data = responseDataInvoice ? JSON.parse(responseDataInvoice) : null;

      return res.json(data);
    } catch (error) {
      console.error("Erro na requisição Asaas:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async show(req, res) {
    request(
      {
        method: "GET",
        url: (process.env.URL_SANDBOX += "/api/v3/payments"),
        headers: {
          access_token: ACESS_TOKEN,
        },
      },
      function (error, response, body) {
        console.log("Status:", response.statusCode);
        console.log("Headers:", JSON.stringify(response.headers));
        console.log("Response:", body);
        const payments = JSON.parse(body);
        res.status(response.statusCode).json(payments);
      },
    );
  }

  async showUniques(req, res) {
    const fetch = require("node-fetch");
    const { id } = req.params;

    const url = `https://sandbox.asaas.com/api/v3/payments/${id}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        access_token: ACESS_TOKEN,
      },
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      res.json(json);
    } catch (err) {
      console.error("error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      customer,
      billingType,
      dueDate,
      value,
      description,
      externalReference,
    } = req.body;

    const url = `https://sandbox.asaas.com/api/v3/payments/${id}`;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        access_token: ACESS_TOKEN,
      },
      body: JSON.stringify({
        customer,
        billingType,
        dueDate,
        value,
        description,
        externalReference,
      }),
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      console.log("responseeee", response);
      res.json(json);
    } catch (err) {
      console.error("error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = A_InvoicesController;

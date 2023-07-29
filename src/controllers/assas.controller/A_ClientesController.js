const dotenv = require("dotenv");
const request = require("request");

dotenv.config();
const ACESS_TOKEN = process.env.SUA_CHAVE_API;
// const URL_BASE = (process.env.URL_SANDBOX += "api/v3/customers");
const CONTENT_TYPE_DO_HEADER = `Content-Type": "application/json`;

class A_ClientesController {
  async create(req, res) {
    try {
      const {
        email,
        name,
        phone,
        mobilePhone,
        cpfCnpj,
        postalCode,
        address,
        addressNumber,
        complement,
        province,
        externalReference,
        notificationDisabled,
        additionalEmails,
        municipalInscription,
        stateInscription,
        observations,
      } = req.body;

      const responseAsaas = await fetch(
        (process.env.URL_SANDBOX += "api/v3/customers"),
        {
          method: "POST",
          headers: {
            CONTENT_TYPE_DO_HEADER,
            access_token: ACESS_TOKEN,
          },
          body: JSON.stringify({
            email,
            name,
            phone,
            mobilePhone,
            cpfCnpj,
            postalCode,
            address,
            addressNumber,
            complement,
            province,
            externalReference,
            notificationDisabled,
            additionalEmails,
            municipalInscription,
            stateInscription,
            observations,
          }),
        },
      );

      console.log("ASAS RETORNO =>>", responseAsaas);

      if (!responseAsaas.ok) {
        throw new Error(`Erro na requisição Asaas: ${responseAsaas.status}`);
      }

      const responseData = await responseAsaas.text();
      const data = responseData ? JSON.parse(responseData) : null;

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
        url: URL_BASE,
        headers: {
          access_token: ACESS_TOKEN,
        },
      },
      function (error, response, body) {
        console.log("Status:", response.statusCode);
        console.log("Headers:", JSON.stringify(response.headers));
        console.log("Response:", body);

        const customers = JSON.parse(body);
        res.status(response.statusCode).json(customers);
      },
    );
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      email,
      name,
      phone,
      mobilePhone,
      cpfCnpj,
      postalCode,
      address,
      addressNumber,
      complement,
      province,
      externalReference,
      notificationDisabled,
      additionalEmails,
      municipalInscription,
      stateInscription,
      observations,
    } = req.body;
    request(
      {
        method: "POST",
        followOriginalHttpMethod: true,
        followRedirect: true,
        followAllRedirects: true,
        url: `${URL_BASE}/${id}`,
        headers: {
          CONTENT_TYPE_DO_HEADER,
          access_token: ACESS_TOKEN,
        },
        body: JSON.stringify(req.body),
      },
      function (error, res, body) {
        console.log("Status:", res.statusCode);
        console.log("Headers:", JSON.stringify(res.headers));
        console.log("Response:", body);
      },
    );
    return res.json(req.body);
  }
}
module.exports = A_ClientesController;

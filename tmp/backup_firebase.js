/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions

  Create and deploy your first functions
  https://firebase.google.com/docs/functions/get-started

  exports.helloWorld = onRequest((request, response) => {
      logger.info("Hello logs!", {structuredData: true});
      response.send("Hello from Firebase!");
    });
*/

const functions = require("firebase-functions");
const express = require("express");
const routes = require("../src/routes");

const app = express();
const cors = require("cors");

// Rotas basicas para facilitar o front-end
app.use(cors());
app.use(express.json());

app.use("/docs/en", swaggerUi.serve, (req, res) => {
  const html = swaggerUi.generateHTML(swagerFile);
  res.send(html);
});

app.use("/docs/pt-br", swaggerUi.serve, (req, res) => {
  const html = swaggerUi.generateHTML(swagerFilePtBr);
  res.send(html);
});
app.use(routes);

// Exporte a função do Firebase
exports.app = functions.https.onRequest(app);

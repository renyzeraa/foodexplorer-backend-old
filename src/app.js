require("express-async-errors");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swagerFile = require("./swagger.json");
const swagerFilePtBr = require("./swagger_pt-br.json");

const AppError = require("./utils/AppError");
const migrationsRun = require("./database/mysql_planetScale/migrations");
const uploadConfig = require("./configs/upload");

const cors = require("cors");
const routes = require("./routes");

migrationsRun();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER));

app.use("/docs/en", swaggerUi.serve, (req, res) => {
  let html = swaggerUi.generateHTML(swagerFile);
  res.send(html);
});

app.use("/docs/pt-br", swaggerUi.serve, (req, res) => {
  let html = swaggerUi.generateHTML(swagerFilePtBr);
  res.send(html);
});

app.use(routes);

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {});
console.log(`Server is running on port => ${PORT}`);

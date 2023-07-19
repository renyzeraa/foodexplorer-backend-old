const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token não informado", 401);
  }

  const [, token] = authHeader.split(" ");
  console.log("TOKEN chegando no middleware => ", { token });
  try {
    const { sub: user_id, user } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
      isAdmin: Boolean(user.isAdmin),
    };
    return next();
  } catch {
    throw new AppError("JWT token inválido, Erro no middleware", 401);
  }
}

module.exports = ensureAuthenticated;

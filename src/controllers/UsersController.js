const { hash, compare } = require("bcryptjs");
const mySqlConnection = require("../database/mysql_planetScale");
const AppError = require("../utils/AppError");

class UsersController {
  async create(req, res) {
    const { name, email, password, isAdmin } = req.body;

    const database = await mySqlConnection();

    const result = await database.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    const [existingUser] = Array.isArray(result) ? result : [];

    if (existingUser) {
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8);
    const userIsAdmin = isAdmin === true;

    await database.query(
      `INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)`,
      [name, email, hashedPassword, userIsAdmin],
    );

    return res.status(201).json();
  }

  async show(req, res) {
    const { email } = req.params;

    const database = await mySqlConnection();

    const [user] = await database.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    return res.json(user);
  }

  async update(req, res) {
    try {
      const { name, email, password, old_password, isAdmin } = req.body;
      const user_id = req.user.id;

      const database = await mySqlConnection();

      const [user] = await database.query("SELECT * FROM users WHERE id = ?", [
        user_id,
      ]);

      if (!user) {
        throw new AppError("Usuário não encontrado.");
      }

      const [userWithUpdatedEmail] = await database.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
      );

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
        throw new AppError("Email já está em uso.");
      }

      if (password && !old_password) {
        throw new AppError("Você deve informar a senha antiga");
      }

      if (password && old_password) {
        const isOldPasswordValid = await compare(old_password, user.password);

        if (!isOldPasswordValid) {
          throw new AppError("Senha antiga está incorreta");
        }

        user.password = await hash(password, 4);
      }

      user.name = name ?? user.name;
      user.email = email ?? user.email;

      if (isAdmin !== undefined) {
        user.isAdmin = isAdmin;
      }

      await database.query(
        `
        UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        isAdmin = ?,
        updated_at = NOW()
        WHERE id = ?`,
        [user.name, user.email, user.password, user.isAdmin, user_id],
      );

      return res.json({});
    } catch (error) {
      console.log("update user error: " + error);
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = UsersController;

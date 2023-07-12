// controllers/authController.js

const User = require("../models/user");
const bcrypt = require("../utils/bcrypt");
const { KEY_TOKEN } = require("../utils/constant");
const jwt = require("../utils/jwt");

const root = {
  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      console.log(req.body);

      // Verificar si el nombre de usuario ya existe en la base de datos
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Correo ya existe" });
      }

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear un nuevo usuario
      const user = new User({ name, email, password: hashedPassword });
      const result = await user.save();

      return res
        .status(201)
        .json({ message: "Usuario registrado", user: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Buscar el usuario en la base de datos
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Credenciales invalidas" });
      }

      // Comparar la contraseña proporcionada con la almacenada en la base de datos
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Credenciales invalidas" });
      }

      // Generar un token de acceso
      const token = jwt.sign(
        { userId: user._id, name: user.name, email: user.email },
        KEY_TOKEN,
        { expiresIn: "1h" }
      );
      console.log({ username: user.name, token });

      return res.status(200).json({ username: user.name, token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = {
  root,
};

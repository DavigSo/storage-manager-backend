import bcrypt from "bcrypt";
import User from "../models/User.js";

export async function register(req, res) {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "nome, email e senha são obrigatórios" });
  }

  try {
    // Verifica se já existe usuário com este e‑mail
    const exists = await User.findOne({ email }).lean().exec();
    if (exists) {
      return res.status(409).json({ mensagem: "Email já cadastrado" });
    }

    // Hash da senha
    const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10;
    const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

    // Cria e salva o usuário
    const usuario = new User({
      nome,
      email,
      senha: senhaHash,
      role: "USER",
    });
    await usuario.save();

    return res
      .status(201)
      .json({ mensagem: "Usuário registrado com sucesso" });
  } catch (err) {
    console.error("🔥 Erro em register:", err);
    return res
      .status(500)
      .json({ error: "Erro interno ao registrar usuário" });
  }
}

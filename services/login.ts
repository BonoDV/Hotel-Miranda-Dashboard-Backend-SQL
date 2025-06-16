import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const loginUser = async (
  email: string,
  password: string
): Promise<{
  status: number;
  data?: { token: string };
  message?: string;
}> => {
  if (!email || !password) {
    return { status: 400, message: "Email y contraseña requeridos" };
  }

  try {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ email });

    if (!user || typeof user.password !== "string") {
      return { status: 401, message: "Credenciales inválidas" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { status: 401, message: "Credenciales inválidas" };
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "24h",
    });

    return { status: 200, data: { token } };
  } catch (error) {
    console.error("Error en loginUser:", error);
    return { status: 500, message: "Error interno del servidor" };
  }
};

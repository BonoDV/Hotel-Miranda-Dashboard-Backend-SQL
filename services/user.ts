import { User } from "../entities/User";
import { AppDataSource as dataSource } from "../data-source";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export const getAllUsers = async () => {
  const userRepository = dataSource.getRepository(User);
  const users = await userRepository.find();
  return users;
};

export const getUsersById = async (id: string) => {
  const userRepository = dataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id: id } });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const createUser = async (userData: any) => {
  // Normalizar fechas
  if (userData.start_date?.$date) {
    userData.start_date = new Date(userData.start_date.$date);
  }

  const newUser = new User();
  newUser.id = uuidv4();

  newUser.photo = userData.photo;
  newUser.first_name = userData.first_name;
  newUser.last_name = userData.last_name;
  newUser.email = userData.email;
  newUser.phone_number = userData.phone_number;
  newUser.job = userData.job;
  newUser.start_date = userData.start_date;
  newUser.schedule = userData.schedule;
  newUser.function_description = userData.function_description;

  // Validar que venga password y hacer hash
  if (!userData.password) {
    throw new Error("Password is required");
  }
  newUser.password = await bcrypt.hash(userData.password, 10);

  const userRepository = dataSource.getRepository(User);
  const existingUser = await userRepository.findOne({
    where: { id: newUser.id },
  });
  if (existingUser) {
    throw new Error("User with this ID already exists");
  }

  return await userRepository.save(newUser);
};

export const updateUser = async (id: string, userData: any) => {
  const userRepository = dataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id: id } });
  if (!user) {
    throw new Error("User not found");
  }
  // Normalizar fechas
  if (userData.start_date?.$date) {
    userData.start_date = new Date(userData.start_date.$date);
  }

  Object.assign(user, userData);
  return await userRepository.update(id, userData);
};

export const deleteUser = async (id: string) => {
  const userRepository = dataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id: id } });
  if (!user) {
    throw new Error("User not found");
  }
  await userRepository.delete(id);
  return { message: "User deleted successfully" };
};

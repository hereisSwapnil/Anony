import userModel from "@/model/user.model";
import bcrypt from "bcryptjs";

export function saltAndHashPassword(password: any) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export async function getUserFromDb(username: string, password: string) {
  const user = await userModel.findOne({ username });
  if (!user) {
    return null;
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return null;
  }
  return user;
}

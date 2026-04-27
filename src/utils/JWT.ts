import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/ENVconfig.js";
export const genrateJWT = (payload :object) => jwt.sign(payload, JWT_SECRET as string , {expiresIn : '1d'})
export const verifyJWT = (token :string) => jwt.verify(token , JWT_SECRET as string)
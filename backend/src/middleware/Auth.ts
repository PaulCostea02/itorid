import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUserModel } from "../models/User"

interface userRequest extends Request {
  user?: IUserModel;
}

const verifyToken = (req: userRequest, res: Response, next: NextFunction) => {
  const token = req.body.token || req.query.token || req.headers["x-acces-token"];
  if (!token) {
    res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, "my_secret_key");
    req.user = decoded as IUserModel;
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
  return next();
}
export default verifyToken;
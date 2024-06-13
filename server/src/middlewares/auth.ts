import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers?.authorization;
    if (token == null) return res.status(401).json({ data: false });
    jwt.verify(
      String(token),
      String(process.env.SECRET_JWT),
      (err, decoded) => {
        if (err) throw new Error();
        //@ts-ignore
        req.user = decoded?.id;
        return next();
      }
    );
  } catch (error) {
    res.status(401).json({ error });
  }
}

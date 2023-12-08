import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerToken = req.headers['authorization'];
  if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
    //tiene token
    try {
      const BearerToken = headerToken.slice(7);
      jwt.verify(BearerToken, process.env.SECRET_KEY || 'troleado');
      next();
    } catch (error: any) {
      if (error.name == 'TokenExpiredError') {
        return res.status(401).json({ msg: 'Sesión expirada', error });
      }
      res.status(401).json({ msg: 'Token no valido', error });
    }
  } else {
    res.status(401).json({ msg: 'Acceso denegado' });
  }
};

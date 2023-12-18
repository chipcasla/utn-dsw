import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

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
      const decoded = jwt.verify(
        BearerToken,
        process.env.SECRET_KEY || 'troleado'
      ) as JwtPayload;
      req.body.userId = decoded.id;
      req.body.userRole = decoded.rol;
      next();
    } catch (error: any) {
      if (error.name == 'TokenExpiredError') {
        return res.status(401).json({ message: 'Sesión expirada', error });
      }
      res.status(401).json({ message: 'Token no valido', error });
    }
  } else {
    res.status(401).json({ message: 'Acceso denegado' });
  }
};

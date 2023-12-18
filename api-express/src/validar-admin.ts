import { NextFunction, Request, Response } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers['authorization'];
  if (headerToken) {
    try {
      if (req.body.userRole && req.body.userRole !== 'admin') {
        return res.status(403).json({
          message: 'No autorizado',
        });
      }
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

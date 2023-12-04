import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const validateToken = (req: Request, res:Response, next:NextFunction) => {
    const headerToken= req.headers['authorization'];
    if(headerToken != undefined){ //puedo ponerle que tambien empiece con Bearer
        try{
            const BearerToken=headerToken.slice(7);
            jwt.verify(BearerToken, process.env.SECRET_KEY || 'troleado');
            next();
        } catch(error) {
            res.status(401).json({msg: 'token no valido'})
        }
    } else{
        res.status(401).json({msg: 'Acceso denegado'});
    }

}
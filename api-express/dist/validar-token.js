import jwt from 'jsonwebtoken';
export const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        //tiene token
        try {
            const BearerToken = headerToken.slice(7);
            jwt.verify(BearerToken, process.env.SECRET_KEY || 'troleado');
            next();
        }
        catch (error) {
            if (error.name == 'TokenExpiredError') {
                return res.status(401).json({ msg: 'Sesión expirada', error });
            }
            res.status(401).json({ msg: 'Token no valido', error });
        }
    }
    else {
        res.status(401).json({ msg: 'Acceso denegado' });
    }
};
//# sourceMappingURL=validar-token.js.map
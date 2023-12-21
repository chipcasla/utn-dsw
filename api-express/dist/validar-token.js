import jwt from 'jsonwebtoken';
export const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        //tiene token
        try {
            const BearerToken = headerToken.slice(7);
            const decoded = jwt.verify(BearerToken, process.env.SECRET_KEY || 'troleado');
            console.log(req.body);
            req.body.userId = decoded.id;
            req.body.userRole = decoded.rol;
            next();
        }
        catch (error) {
            if (error.name == 'TokenExpiredError') {
                return res.status(401).json({ message: 'Sesión expirada', error });
            }
            res.status(401).json({ message: 'Token no valido', error });
        }
    }
    else {
        res.status(401).json({ message: 'Acceso denegado' });
    }
};
//# sourceMappingURL=validar-token.js.map
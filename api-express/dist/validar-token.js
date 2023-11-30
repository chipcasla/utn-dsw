import jwt from 'jsonwebtoken';
const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined) { //puedo ponerle que tambien empiece con Bearer
        try {
            const BearerToken = headerToken.slice(7);
            jwt.verify(BearerToken, process.env.SECRET_KEY || 'troleado');
            next();
        }
        catch (error) {
            res.status(401).json({ msg: 'token no valido' });
        }
    }
    else {
        res.status(401).json({ msg: 'Acceso denegado' });
    }
};
//# sourceMappingURL=validar-token.js.map
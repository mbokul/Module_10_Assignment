const jsonWebToken = require('jsonwebtoken');

const authVerificationMiddleware = async (req, res, next) => {
   const token = req.headers['token'];

   jsonWebToken.verify(token, 'secretKey12345', (err, decoded) => {
      if (err) {
         res.status(401).json({ message: 'Unathorized error!' });
      } else {
         const email = decoded['data'];
         req.headers.email = email;
         next();
      }
   });
};

module.exports = authVerificationMiddleware;

import jwt from 'jsonwebtoken';

const expiresIn = '2d';
const issuer = 'http://localhost';

export function getToken(user) {
  const payload = {user: user.email};
  const options = {expiresIn: expiresIn, issuer: issuer};
  const secret = process.env.JWT_SECRET;

  return jwt.sign(payload, secret, options);
}

export function validateToken(req, res, next) {
  const authorizationHeaader = req.headers.authorization;
  let result;
  if (authorizationHeaader) {
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
    const options = {expiresIn: expiresIn, issuer: issuer};

    try {
      // Verify that the token hasn't expired and has been issued by us
      result = jwt.verify(token, process.env.JWT_SECRET, options);

      // Let's pass back the decoded token to the request object
      req.body = result;

      // We call next to pass execution to the subsequent middleware
      next();
    } catch (err) {
      // Throw an error just in case anything goes wrong with verification
      res.status(401).send({
        errorMessage: `Authentication error. ${err.message}`,
      });
    }
  } else {
    res.status(401).send({
      errorMessage: `Authentication error. Token required.`,
    });
  }
}

import jwt from "jsonwebtoken";
import { env } from "process";

/**
 * Generates a token for the given user.
 * @param user - The user object.
 * @returns The generated token.
 */
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const getUserFromToken = (authorizationHeader) => {
  if (
    authorizationHeader &&
    authorizationHeader.startsWith("Bearer ") &&
    authorizationHeader.length > 7
  ) {
    const token = authorizationHeader.slice(7);

    const decodedToken = jwt.verify(token, env.JWT_SECRET);
    if (decodedToken && decodedToken.id) {
      const user = {
        id: decodedToken.id,
        email: decodedToken.email,
        role: decodedToken.role,
      };
      return user;
    }
  }

  return { id: null, email: null, role: null };
};

export const isAuth = (req, res, next) => {
  // get the user from the token
  const user = getUserFromToken(req.headers.authorization);
  // if the user is not found, return an unauthorized error
  if (user.id === null) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  // set the user object on the request object
  req.user = user;
  // call next to proceed to the next middleware or route handler
  next();
};

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

export const getUserFromToken = (authorizationHeader) => {
  if (
    authorizationHeader &&
    authorizationHeader.startsWith("Bearer ") &&
    authorizationHeader.length > 15
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

/**
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {import("express").NextFunction} next - The next function.
 * @returns
 */
export const isAuth = (req, res, next) => {
  // get the user from the token

  const { cookies } = req;
  if (!cookies || !cookies.authToken) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  const user = jwt.verify(cookies.authToken, env.JWT_SECRET);

  // if the user is not found, return an unauthorized error
  if (user.id === null) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  // set the user object on the request object
  req.user = user;
  // call next to proceed to the next middleware or route handler
  next();
};

/**
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {import("express").NextFunction} next - The next function.
 * @returns - The next function or a redirect to the signup page.
 */
export default function handleProtectedRoutes(req, res, next) {
  const { cookies } = req;
  const unprotectedRoutes = ["/signup", "/login"];
  const baseUrl = req.originalUrl.split("?")[0];

  if (unprotectedRoutes.includes(baseUrl)) {
    return next();
  } else if (!cookies || !cookies.authToken) {
    return res
      .status(401)
      .redirect(`/signup?redirectFrom=${encodeURIComponent(req.originalUrl)}`);
  }
  next();
}

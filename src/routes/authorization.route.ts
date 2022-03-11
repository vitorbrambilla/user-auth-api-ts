import { Request, Response, NextFunction, Router } from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';
import userRepository from '../repositories/user.repository';
import JWT, { SignOptions } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import basicAuthenticationMiddleware from '../middlewares/basic-authentication.middleware';
import jwtAuthentication from '../middlewares/jwt-authentication.middleware';
import { SigningOptions } from 'crypto';

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ForbiddenError('Usuário não informado!')
    }

    const jwtPayLoad = { username: user.username };
    const jwtOptions: SignOptions = { subject: user?.uuid, expiresIn: '15m' };
    const secretKey = 'my_secret_key';

    const jwt = JWT.sign(jwtPayLoad, secretKey, jwtOptions);
    
    res.status(StatusCodes.OK).json({ token: jwt });
    
  } catch (error) {
    next(error);
  }
});

authorizationRoute.post('/token/validate', jwtAuthentication, (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(StatusCodes.OK);
});

export default authorizationRoute;

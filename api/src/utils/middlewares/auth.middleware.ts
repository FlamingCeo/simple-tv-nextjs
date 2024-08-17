import configs from '@lib/config/default.config';
import { User } from '@models/user.crm.model';
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const UserJwtAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1] || '';
  jwt.verify(token, configs.JWT_SECRET, async (err: any, usr: any) => {
    if (err) {
      return res.status(401).send('Unauthorized');
    }
    {
      const user: User | null = await User.findByPk(
          usr.user_id, 
          {
            attributes: {exclude: ['password']},

          }
      );
      
      if(!user) return res.status(401).send('Unauthorized');

      (req as any).user = JSON.parse(JSON.stringify(user));
    }
    next();
  });
};


export {UserJwtAuth};
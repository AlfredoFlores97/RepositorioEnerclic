import { Request, Response, NextFunction } from 'express'
import { jwt } from '../data/jwt';

export const middle = (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    const token : string = "stringsecretforjwt";
    if(token != jwt)
    {
        return res.status(404).json("Token no encontrado");
    }
    next();
};
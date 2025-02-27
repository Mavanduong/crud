import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import envCofig from '../config';
import { TokenPayload } from '../types/jwt.type';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService
    ){}

    signAccessToken(payload: { userId: number }) {

        return this.jwtService.sign(payload, {
            secret: envCofig.ACCESS_TOKEN_SECRET,
            expiresIn: envCofig.ACCESS_TOKEN_EXPIRES_IN,
            algorithm: 'HS256' 
        })
    }
    signRefreshToken(payload: {userId: number}){
        return this.jwtService.sign(payload, {
            secret: envCofig.REFRESH_TOKEN_SECRET,
            expiresIn: envCofig.REFRESH_TOKEN_EXPIRES_IN,
            algorithm: 'HS256' 
        })
    }
    verifyAccessToken(token: string){
        return this.jwtService.verifyAsync(token,{
            secret: envCofig.ACCESS_TOKEN_SECRET
        })
    }
    verifyRefreshToken(token: string): Promise<TokenPayload>{
        return this.jwtService.verifyAsync(token,{
            secret: envCofig.ACCESS_TOKEN_SECRET
        })
    }
}

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import { RefreshTokenMiddleware } from '../middlewares/refresh-token.middleware';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.API_KEY,
    });
  }

  async validate(payload: any) {
    console.log(
      'jwt',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // refreshToken
      payload.exp < Date.now() ? 'token is not exp' : 'token expired',
    );

    return { userId: payload.sub, username: payload.username };
  }
}

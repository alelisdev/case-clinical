import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ApiAuthDataAccessService } from '../api-auth-data-access.service'
import { JwtDto } from '../dto/jwt.dto'

function headerAndCookieExtractor(req: Request) {
  const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
  if (!token) {
    return cookieExtractor(req)
  }
  return token
}

function cookieExtractor(req: Request) {
  const name = process.env.API_COOKIE_NAME || '__session'
  const theCookie = req?.cookies?.[name] ? req.cookies[name] : undefined
  return theCookie
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly auth: ApiAuthDataAccessService) {
    super({
      jwtFromRequest: headerAndCookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: JwtDto) {
    const user = await this.auth.validateUser(payload.userId)
    if (!user) {
      throw new UnauthorizedException("No User Detected")
    }
    return user
  }
}

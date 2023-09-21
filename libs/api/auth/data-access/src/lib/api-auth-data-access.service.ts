import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ApiCoreDataAccessService, ApiCoreSharedService } from '@case-clinical/api/core/data-access'
import { ApiCoreUtilService, validatePassword } from '@case-clinical/api/core/util'
import { ApiNovuNotificationDataAccessService } from '@case-clinical/api/novu-notification/data-access'
import { AuthToken } from './models/auth-token.model'
import { LoginInput } from './dto/login.input'
import { RegisterInput } from './dto/register.input'
import { Response } from 'express'
import { User } from '@case-clinical/api/user/data-access'

@Injectable()
export class ApiAuthDataAccessService {
  constructor(
    private readonly data: ApiCoreDataAccessService,
    private readonly util: ApiCoreSharedService,
    private readonly core: ApiCoreUtilService,
    private readonly notification: ApiNovuNotificationDataAccessService,
    private readonly jwtService: JwtService,
  ) { }

  async register(payload: RegisterInput) {
    const user = await this.data.createUser(payload, { email: payload.email })
    this.notification.createSubscriber(user.id, payload.username, payload.username, payload.email)
    this.notification.sendNewUserSignupNotification(payload.email)
    return this.signUser(user, [], [])
  }

  async login(input: LoginInput, ipAddress: string) {
    const email = input.email.trim()
    try{
      const password = input.password.trim()
      const user = await this.data.findUserByEmail(email)
      const features = user.userFeatures
      const featurePermissions = user.userFeaturePermissions

      if (!user) {
        throw new NotFoundException(`No user found for email: ${email}`)
      }
      // request event
      this.util.loginLogEvent(email, `Admin request login`, input, ipAddress)

      if (!user?.password) {
        //error event
        this.util.loginLogEvent(email, `Admin request login when password isn't set`, input, ipAddress)
        throw new NotFoundException(`Can't log in with email: ${email}`)
      }

      const passwordValid = await validatePassword(password, user.password)

      if (!passwordValid) {
        // error event
        this.util.loginLogEvent(email, `Admin request login with invalid password`, input, ipAddress)
        throw new BadRequestException('Invalid password')
      }

       // success event
       this.util.logEvent(user, true, 'Admin login', '', input)
      return this.signUser(user, features, featurePermissions)
    } catch (error) {
      // error event
      this.util.loginLogEvent(email, `Admin getting error while login`, input, ipAddress)
      throw new Error('Error while Logging in.' + error.message)
    }
  }

  signUser(user: User, userFeatures, userFeaturePermissions): AuthToken {
    const token = this.jwtService.sign({ userId: user?.id })
    const features = this.jwtService.sign({ userFeaturePermissions })
    const verified = user.verified;
    const signupStatus = user.signupStatus;
    const subscriberId = user.id
    if(verified) return { token, features, verified, subscriberId }
    else return { token, features, verified, subscriberId, signupStatus }
  }

  async validateUser(userId: string) {
    const user = await this.data.findUserById(userId)
    return user
  }

  getUserFromToken(token: string) {
    const userId = this.jwtService.decode(token)['userId']

    return this.data.findUserById(userId)
  }

  setCookie(res: Response, token: string) {
    return res?.cookie(this.core.cookie.name, token, this.core.cookie.options)
  }

  clearCookie(res: Response) {
    return res.clearCookie(this.core.cookie.name, this.core.cookie.options)
  }

  async refreshToken(accessToken: string) {
    const user = await this.getUserFromToken(accessToken)

    return this.signUser(user, user?.userFeatures, user?.userFeaturePermissions)
  }
}

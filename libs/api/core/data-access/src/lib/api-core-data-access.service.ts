import { BadRequestException, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { getGravatarUrl, hashPassword } from '@case-clinical/api/core/util'
import { UserCreateUserInput } from '@case-clinical/api/user/data-access'
import { UserCreateEmailInput } from '@case-clinical/api/email/data-access'
import { UserRole } from '@case-clinical/api/user-role/data-access'

@Injectable()
export class ApiCoreDataAccessService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }

  async onModuleInit() {
    await this.$connect()
  }

  public async getPatientMRN(user, dateOfBirth: Date, dateOfLoss, accidentKind, legalCaseId: string) {
    try {

      const [patientMrnNumber] = await this.$transaction([
        this.$queryRaw `  DECLARE @MrnNumber VARCHAR(50);
                          EXEC [dbo].[generateMRN] '${dateOfBirth}','${dateOfLoss}', '${accidentKind}', '${legalCaseId}', '';
                          SELECT @MrnNumber;
                         `

      ]);
      return patientMrnNumber;
    } catch (error) {
      return error
    }

  }

  async createUser(input: UserCreateUserInput, emailInput: UserCreateEmailInput) {
    const email = emailInput?.email?.trim()
    const existing = await this.findUserByEmail(email)
    if (existing) {
      throw new BadRequestException(`Can't create user with email ${email}`)
    }
    const password = hashPassword(input.password)
    // The first user will get the Admin role
    const admin = await this.role.findFirst({ where: { name: 'Admin' } })
    const role = await this.userRole.findFirst({ where: { roleId: admin?.id } })
    return this.user.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        emails: { create: { email, primary: true } },
        username: email,
        avatarUrl: input.avatarUrl || getGravatarUrl(email),
        password,
        userRoles: {
          create: {
            roleId: admin.id,
            name: email,
          },
        },
      },
    })
  }

findUserByEmail(email: string) {
  return this.email
    .findFirst({ where: { email } })
    .owner({ include: { emails: true, userFeaturePermissions: true, userFeatures: true } })
}

findUserById(userId: string) {
  return this.user.findUnique({
    where: { id: userId },
    include: {
      emails: true,
      userRoles: true,
      userCalendars: { include: { calendar: { include: { appointments: true } } } },
      navigations: {
        include: { children: true },
      },
      notifications: true,
      userFeaturePermissions: true,
      userFeatures: true,
      vendor: true
    },
  })
}
  findUserByUsername(username: string) {
    return this.user.findFirst({
      where: { username },
      include: { emails: true },
    })
  }

  async findAdminRole(): Promise<UserRole> {
    const admin = await this.role.findFirst({ where: { name: 'Admin' } })
    const role = await this.userRole.findFirst({ where: { roleId: admin?.id } })
    return role
  }

  async ensureAdminUser(adminId: string): Promise<boolean> {
    const tenant = await this.findUserById(adminId)
    const admin = await this.findAdminRole()
​
    // if (tenant.userRoles.indexOf(admin) !== null) {
    //   throw new Error(`This operation needs Admin access`)
    // }
    return true
  }
​
  async usernameDenyList(username: string) {
    const denied = [
      // Add usernames you want to deny
      'admin',
      'administrator',
      'system',
      'owner',
      'info',
      'webmaster',
    ]
    return denied.includes(username)
  }
}


import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateUserInput } from './dto/admin-create-user.input'
import { AdminListUserInput } from './dto/admin-list-user.input'

import { AdminUpdateUserInput } from './dto/admin-update-user.input'

@Injectable()
export class ApiUserDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminUsers(adminId: string, input?: AdminListUserInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.user.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {patient: true, provider: true, attorney: true}
    })
  }

  async adminCountUsers(adminId: string, input?: AdminListUserInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.user.count(
    {
      where: { 
            name: { 
                contains: name
            }
          }
        }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  
  

  async adminUser(adminId: string, userId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.user.findUnique({ where: { id: userId } , include: {: true, include: {patient: true, provider: true, attorney: true, assignedDocuments: true, chats: true, documents: true, messages: true, navigations: true, notifications: true, priorAuthorizationRequests: true, settings: true, shortcuts: true, teamUsers: true, userFeatures: true, userFeaturePermissions: true, userRoles: true} })
  }

  async checkUserExist(userName: string) {
    try {
      return this.data.user.findMany({ where: { name: userName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateUser(adminId: string, input: AdminCreateUserInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const userData = await this.checkUserExist(input.name)

      if (userData.length > 0) {
          throw new ConflictException("Same User can't be added.")
      }
        return this.data.user.create({
          data: { 
      
                patient: 
                input.patientId != null
                ? {
                        connect:  { 
                            id: input.patientId
                        }
                    }: undefined,  
                provider: 
                input.providerId != null
                ? {
                        connect:  { 
                            id: input.providerId
                        }
                    }: undefined,  
                attorney: 
                input.attorneyId != null
                ? {
                        connect:  { 
                            id: input.attorneyId
                        }
                    }: undefined,name: input.name, 
developer: input.developer, 
username: input.username, 
password: input.password, 
firstName: input.firstName, 
lastName: input.lastName, 
avatarUrl: input.avatarUrl, 
line1: input.line1, 
line2: input.line2, 
city: input.city, 
state: input.state, 
postalCode: input.postalCode, 
phone: input.phone, 
bio: input.bio, 
slug: input.slug, 
status: input.status, 
signupStatus: input.signupStatus, 
verified: input.verified, 
dateOfBirth: input.dateOfBirth, 
cellPhone: input.cellPhone, 
education: input.education, 
emails: input.emails, 

    }
    , include: {: true, include: {patient: true, provider: true, attorney: true, assignedDocuments: true, chats: true, documents: true, messages: true, navigations: true, notifications: true, priorAuthorizationRequests: true, settings: true, shortcuts: true, teamUsers: true, userFeatures: true, userFeaturePermissions: true, userRoles: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateUser(adminId: string, userId, input: AdminUpdateUserInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.user.update({
      where: { id: userId },
      data: {
  
                patient: 
                input.patientId != null
                ? {
                        connect:  { 
                            id: input.patientId
                        }
                    }: undefined,  
                provider: 
                input.providerId != null
                ? {
                        connect:  { 
                            id: input.providerId
                        }
                    }: undefined,  
                attorney: 
                input.attorneyId != null
                ? {
                        connect:  { 
                            id: input.attorneyId
                        }
                    }: undefined,name: input.name, 
developer: input.developer, 
username: input.username, 
password: input.password, 
firstName: input.firstName, 
lastName: input.lastName, 
avatarUrl: input.avatarUrl, 
line1: input.line1, 
line2: input.line2, 
city: input.city, 
state: input.state, 
postalCode: input.postalCode, 
phone: input.phone, 
bio: input.bio, 
slug: input.slug, 
status: input.status, 
signupStatus: input.signupStatus, 
verified: input.verified, 
dateOfBirth: input.dateOfBirth, 
cellPhone: input.cellPhone, 
education: input.education, 
emails: input.emails, 

}
, include: {: true, include: {patient: true, provider: true, attorney: true, assignedDocuments: true, chats: true, documents: true, messages: true, navigations: true, notifications: true, priorAuthorizationRequests: true, settings: true, shortcuts: true, teamUsers: true, userFeatures: true, userFeaturePermissions: true, userRoles: true} 
    })
  }

  async adminDeleteUser(adminId: string, userId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.user.delete({ where: { id: userId } })
  }
}


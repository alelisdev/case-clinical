
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateUserInput } from './dto/user-create-user.input'
import { UserListUserInput } from './dto/user-list-user.input'
import { UserUpdateUserInput } from './dto/user-update-user.input'
import { UserUpdateUsersInput } from './dto/user-update-users.input'



@Injectable()
export class ApiUserDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userUsers(userId: string, input?: UserListUserIput) {
    let name = input?.name ? input.name : undefined

    return this.data.user.findMany({
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,
providerId: input.providerId,
attorneyId: input.attorneyId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {patient: true, provider: true, attorney: true}
    })
  }

  async userSelectUsers(userId: string, input?: UserListUserInput) {
    let name = input?.name ? input.name : undefined

    return this.data.user.findMany({
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,
providerId: input.providerId,
attorneyId: input.attorneyId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountUsers(userId: string, input?: UserListUserInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.user.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,
providerId: input.providerId,
attorneyId: input.attorneyId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userUser(userId: string, targetUserId) {

    return this.data.user.findUnique({ where: { id: targetUserId } , 
      include: {patient: true, provider: true, attorney: true, assignedDocuments: true, chats: true, documents: true, messages: true, navigations: true, notifications: true, settings: true, shortcuts: true, teamUsers: true, userFeatures: true, userFeaturePermissions: true, userRoles: true}  })
  }

  async checkUserExist(userName: string) {
    try {
      return this.data.user.findMany({ where: { name: userName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateUser(userId: string, input: UserCreateUserInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const userData = await this.checkUserExist(input.name)

        if (userData.length > 0) {
            throw new ConflictException("Same User can't be added.")
        }



    await this.data.logEvent(sendingUser, true, 'User', 'Create', input)

    let user = await this.data.user.create({
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
officeName:input.officeName,
customerId:input.customerId,
planId:input.planId
}
, include: {patient: true, provider: true, attorney: true, assignedDocuments: true, chats: true, documents: true, messages: true, navigations: true, notifications: true, settings: true, shortcuts: true, teamUsers: true, userFeatures: true, userFeaturePermissions: true, userRoles: true} 
    })

    await this.data.logEvent(sendingUser, false, 'User', 'Create', user)

    return user

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating User')
    }

  }


  
  

  async userUpdateUser(userId: string, targetUserId: string, input: UserUpdateUserInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!targetUserId) {
        throw new BadRequestException('Target User Id is required')
      } else {

      const userData = await this.checkUserExist(input.name)

      if (userData.length > 0) {
        if (userData[0].id != userId) {
          throw new ConflictException("Same User exists already.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'User', 'Update', input)

    let user = this.data.user.update({
      where: { id: targetUserId },
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
officeName:input.officeName,
customerId:input.customerId,
planId:input.planId
}
, include: {patient: true, provider: true, attorney: true, assignedDocuments: true, chats: true, documents: true, messages: true, navigations: true, notifications: true, settings: true, shortcuts: true, teamUsers: true, userFeatures: true, userFeaturePermissions: true, userRoles: true} 
    })

    await this.data.logEvent(sendingUser, false, 'User', 'Update', user)

    return user

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating User')
    }
  }

  async userUpdateUsers(userId: string, input: UserUpdateUsersInput): Promise<UpdateResult> {
    const total = input.users.length;
    let updated = [];
    let created = [];
    let failed = [];

    for(const key in input.users) {
        const inputData = input.users[key]

        const data =  {
            id: inputData.id, 
name: inputData.name, 
developer: inputData.developer, 
username: inputData.username, 
password: inputData.password, 
firstName: inputData.firstName, 
lastName: inputData.lastName, 
avatarUrl: inputData.avatarUrl, 
line1: inputData.line1, 
line2: inputData.line2, 
city: inputData.city, 
state: inputData.state, 
postalCode: inputData.postalCode, 
phone: inputData.phone, 
bio: inputData.bio, 
slug: inputData.slug, 
status: inputData.status, 
signupStatus: inputData.signupStatus, 
verified: inputData.verified, 
customerId: inputData.customerId, 
planId: inputData.planId, 
dateOfBirth: inputData.dateOfBirth, 
cellPhone: inputData.cellPhone, 
education: inputData.education, 
attorneyId: inputData.attorneyId, 
providerId: inputData.providerId, 
patientId: inputData.patientId, 
officeName:inputData.officeName
        }

        try {
            const result = await this.data.user.upsert({
            where: {id: inputData.id || ""},
              create: data,
              update: data
            })
              
            if(result.id === inputData.id)
              updated.push(result);
            else {
              created.push(result);
            }
          } catch (error) {
              failed.push(inputData);
          }
        }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed)
    }
  }


  async userDeleteUser(userId: string, targetUserId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!targetUserId) {
        throw new BadRequestException('Target User Id is required')
      } else {

        const assignedDocumentCount = await this.data.assignedDocument.count({ where: { userId: userId }})
        if(assignedDocumentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Assigned Document')
        }


        const chatCount = await this.data.chat.count({ where: { userId: userId }})
        if(chatCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Chat')
        }


        const documentCount = await this.data.document.count({ where: { userId: userId }})
        if(documentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Document')
        }


        const messageCount = await this.data.message.count({ where: { userId: userId }})
        if(messageCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Message')
        }


        const navigationCount = await this.data.navigation.count({ where: { userId: userId }})
        if(navigationCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Navigation')
        }


        const notificationCount = await this.data.notification.count({ where: { userId: userId }})
        if(notificationCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Notification')
        }


        const priorAuthorizationRequestCount = await this.data.priorAuthorizationRequest.count({ where: { userId: userId }})
        if(priorAuthorizationRequestCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Authorization Request')
        }


        const priorAuthorizationRequestCount = await this.data.priorAuthorizationRequest.count({ where: { userId: userId }})
        if(priorAuthorizationRequestCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Authorization Request')
        }


        const settingCount = await this.data.setting.count({ where: { userId: userId }})
        if(settingCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Setting')
        }


        const shortcutCount = await this.data.shortcut.count({ where: { userId: userId }})
        if(shortcutCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Shortcut')
        }


        const teamUserCount = await this.data.teamUser.count({ where: { userId: userId }})
        if(teamUserCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Team User')
        }


        const userFeatureCount = await this.data.userFeature.count({ where: { userId: userId }})
        if(userFeatureCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an User Feature')
        }


        const userFeaturePermissionCount = await this.data.userFeaturePermission.count({ where: { userId: userId }})
        if(userFeaturePermissionCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an User Feature Permission')
        }


        const userRoleCount = await this.data.userRole.count({ where: { userId: userId }})
        if(userRoleCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an User Role')
        }

        await this.data.logEvent(sendingUser, true, 'User', 'Delete', targetUserId)

        let user = this.data.user.delete({
          where: { id: targetUserId }
        })

        await this.data.logEvent(sendingUser, false, 'User', 'Delete', user)

        return user

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting User')
    }
  }
}


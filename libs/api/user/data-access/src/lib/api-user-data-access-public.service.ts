
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListUserInput } from './dto/user-list-user.input'

@Injectable()
export class ApiUserDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicUsers(input?: UserListUserInput) {
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

  async publicSelectUsers(input?: UserListUserInput) {
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

  async publicCountUsers(input?: UserListUserInput): Promise<CorePaging> {

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

  async publicUser(targetUserId) {

    return this.data.user.findUnique({ where: { id: targetUserId } , include: {: true, include: {patient: true, provider: true, attorney: true, assignedDocuments: true, chats: true, documents: true, messages: true, navigations: true, notifications: true, priorAuthorizationRequests: true, settings: true, shortcuts: true, teamUsers: true, userFeatures: true, userFeaturePermissions: true, userRoles: true}  })
  }
}


